import { useEffect, useState } from "react";
import { supabase } from "../../../shared/services/supabase";
import {
  atualizarRecompensa,
  criarRecompensa,
  deletarRecompensa,
  listarRecompensas,
} from "../services/recompensaService";

const FORM_VAZIO = {
  nome: "",
  descricao: "",
  custoPontos: "",
  quantidade: "",
  imagem: "",
  imagemPreview: "",
};

const normalizarRecompensa = (recompensa) => ({
  id: recompensa.id,
  nome: recompensa.nome ?? "",
  descricao: recompensa.descricao ?? "",
  pontos: Number(recompensa.custoPontos ?? 0),
  estoque: Number(recompensa.quantidadeDisponivel ?? recompensa.quantidade ?? 0),
  quantidade: Number(recompensa.quantidade ?? 0),
  quantidadeDisponivel: Number(recompensa.quantidadeDisponivel ?? recompensa.quantidade ?? 0),
  foto: recompensa.imagem ?? "",
  ativa: recompensa.disponivel ?? true,
});

const truncarString = (valor, limite = 255) => {
  if (!valor) return "";
  return valor.length > limite ? valor.slice(0, limite) : valor;
};

const gerarNomeArquivo = (arquivo) => {
  const extensao = arquivo.name.split(".").pop() || "png";
  return `recompensa-${Date.now()}-${Math.random().toString(36).slice(2)}.${extensao}`;
};

const normalizarErro = (error) => {
  const status = error?.response?.status;
  const mensagemBackend =
    error?.response?.data?.message ||
    error?.response?.data?.mensagem ||
    error?.response?.data?.error;

  if (mensagemBackend) {
    return mensagemBackend;
  }

  if (status === 401 || status === 403) {
    return "Você não tem permissão para gerenciar recompensas.";
  }

  if (status === 404) {
    return "Recompensa não encontrada.";
  }

  return "Não foi possível concluir a operação. Tente novamente.";
};

export function useGerenciarRecompensa() {
  const [recompensas, setRecompensas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState(FORM_VAZIO);
  const [erros, setErros] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [removendoId, setRemovendoId] = useState(null);
  const [erro, setErro] = useState("");
  const [arquivoImagem, setArquivoImagem] = useState(null);

  const carregarRecompensas = async () => {
    setCarregando(true);
    setErro("");

    try {
      const dados = await listarRecompensas();
      setRecompensas(dados.map(normalizarRecompensa));
    } catch (error) {
      setErro(normalizarErro(error));
      setRecompensas([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarRecompensas();
  }, []);

  const validar = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório.";
    if (!form.descricao.trim()) e.descricao = "Descrição é obrigatória.";
    if (!form.custoPontos || Number(form.custoPontos) <= 0) {
      e.custoPontos = "Informe pontos válidos.";
    }
    if (form.quantidade === "" || Number(form.quantidade) < 0) {
      e.quantidade = "Informe estoque válido.";
    }

    setErros(e);
    return Object.keys(e).length === 0;
  };

  const abrirModal = (recompensa = null) => {
    if (recompensa) {
      setForm({
        nome: recompensa.nome,
        descricao: recompensa.descricao,
        custoPontos: String(recompensa.pontos),
        quantidade: String(recompensa.quantidade ?? recompensa.estoque ?? 0),
        imagem: recompensa.foto ?? "",
        imagemPreview: recompensa.foto ?? "",
      });
      setArquivoImagem(null);
      setEditandoId(recompensa.id);
    } else {
      setForm(FORM_VAZIO);
      setArquivoImagem(null);
      setEditandoId(null);
    }

    setErros({});
    setErro("");
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setForm(FORM_VAZIO);
    setErros({});
    setEditandoId(null);
    setArquivoImagem(null);
  };

  const enviarImagemAoBucket = async () => {
    if (!arquivoImagem) {
      return form.imagem ? truncarString(form.imagem.trim()) : "";
    }

    const nomeArquivo = gerarNomeArquivo(arquivoImagem);
    const { error: uploadError } = await supabase.storage
      .from("recompensa")
      .upload(nomeArquivo, arquivoImagem);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from("recompensa").getPublicUrl(nomeArquivo);
    return data?.publicUrl ? truncarString(data.publicUrl.trim()) : "";
  };

  const montarPayload = async () => {
    const imagem = await enviarImagemAoBucket();

    const payload = {
      nome: form.nome.trim(),
      quantidade: Number(form.quantidade),
      custoPontos: Number(form.custoPontos),
      imagem,
    };

    if (form.descricao.trim()) {
      payload.descricao = form.descricao.trim();
    }

    return payload;
  };

  const handleSalvar = async () => {
    if (!validar()) return;

    setSalvando(true);
    setErro("");

    try {
      const payload = await montarPayload();

      if (editandoId) {
        await atualizarRecompensa(editandoId, payload);
      } else {
        await criarRecompensa(payload);
      }

      await carregarRecompensas();
      fecharModal();
    } catch (error) {
      setErro(normalizarErro(error));
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async (id) => {
    const confirmou = window.confirm("Tem certeza que deseja excluir esta recompensa?");
    if (!confirmou) return;

    setRemovendoId(id);
    setErro("");

    try {
      await deletarRecompensa(id);
      setRecompensas((prev) => prev.filter((recompensa) => recompensa.id !== id));
    } catch (error) {
      setErro(normalizarErro(error));
    } finally {
      setRemovendoId(null);
    }
  };

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArquivoImagem(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = ev.target?.result;
      setForm((f) => ({
        ...f,
        imagemPreview: typeof preview === "string" ? preview : "",
      }));
    };
    reader.readAsDataURL(file);
  };

  return {
    recompensas,
    modalAberto,
    form,
    setForm,
    erros,
    editandoId,
    abrirModal,
    fecharModal,
    handleSalvar,
    handleDeletar,
    handleFoto,
    carregando,
    salvando,
    removendoId,
    erro,
    setArquivoImagem,
  };
}
