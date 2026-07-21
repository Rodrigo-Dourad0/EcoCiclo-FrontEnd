import { useEffect, useMemo, useState } from "react";
import {
  atribuirColetorAssociacao,
  atualizarAssociacao,
  criarAssociacao,
  deletarAssociacao,
  listarAssociacoes,
  listarColetores,
  listarMembrosDaAssociacao,
} from "../services/associacaoService";

const FORM_VAZIO = {
  nome: "",
  cnpj: "",
  logradouro: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
};

const normalizarEndereco = (endereco = {}) => ({
  id: endereco.id || "",
  logradouro: endereco.logradouro || "",
  bairro: endereco.bairro || "",
  cidade: endereco.cidade || "",
  estado: endereco.estado || "",
  cep: endereco.cep || "",
});

const normalizarAssociacao = (associacao) => ({
  id: associacao.id,
  nome: associacao.nome || "",
  cnpj: associacao.cnpj || "",
  endereco: normalizarEndereco(associacao.endereco),
  totalColetores: Number(associacao.totalColetores ?? 0),
});

const normalizarColetor = (coletor) => ({
  id: coletor.id,
  nome: coletor.nome || "Coletor",
  cpf: coletor.cpf || "",
  telefone: coletor.telefone || "",
  email: coletor.email || "",
  perfil: coletor.perfil || "COLETOR",
  pontuacao: coletor.pontuacao ?? null,
  endereco: normalizarEndereco(coletor.endereco),
  associacao: coletor.associacao
    ? {
        id: coletor.associacao.id || "",
        nome: coletor.associacao.nome || "",
        cnpj: coletor.associacao.cnpj || "",
      }
    : null,
});

const normalizarMembro = (membro) => normalizarColetor(membro);

const formatarEndereco = (endereco) => {
  if (!endereco) return "Endereco nao informado";

  const partes = [
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep,
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(" - ") : "Endereco nao informado";
};

const normalizarErro = (error) => {
  const status = error?.response?.status;
  const mensagem =
    error?.response?.data?.message ||
    error?.response?.data?.mensagem ||
    error?.response?.data?.error;

  if (mensagem) return mensagem;
  if (status === 404) return "Associacao nao encontrada.";
  if (status === 401 || status === 403) return "Voce nao tem permissao para gerenciar associacoes.";
  return "Nao foi possivel concluir a operacao. Tente novamente.";
};

export function useGerenciarAssociacao() {
  const [associacoes, setAssociacoes] = useState([]);
  const [coletores, setColetores] = useState([]);
  const [membros, setMembros] = useState([]);
  const [associacaoAtiva, setAssociacaoAtiva] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [form, setForm] = useState(FORM_VAZIO);
  const [erros, setErros] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoDetalhes, setCarregandoDetalhes] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [removendoId, setRemovendoId] = useState(null);
  const [atribuindoId, setAtribuindoId] = useState("");
  const [coletorSelecionadoId, setColetorSelecionadoId] = useState("");
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  const carregarTudo = async () => {
    setCarregando(true);
    setErro("");

    try {
      const [listaAssociacoes, listaColetores] = await Promise.all([
        listarAssociacoes(),
        listarColetores(),
      ]);

      setAssociacoes(listaAssociacoes.map(normalizarAssociacao));
      setColetores(listaColetores.map(normalizarColetor));
    } catch (error) {
      setErro(normalizarErro(error));
      setAssociacoes([]);
      setColetores([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTudo();
  }, []);

  const validar = () => {
    const novosErros = {};

    if (!form.nome.trim()) novosErros.nome = "Nome e obrigatorio.";
    if (!form.cnpj.trim()) novosErros.cnpj = "CNPJ e obrigatorio.";
    if (!form.logradouro.trim()) novosErros.logradouro = "Logradouro e obrigatorio.";
    if (!form.bairro.trim()) novosErros.bairro = "Bairro e obrigatorio.";
    if (!form.cidade.trim()) novosErros.cidade = "Cidade e obrigatoria.";
    if (!form.estado.trim()) novosErros.estado = "Estado e obrigatorio.";
    if (!form.cep.trim()) novosErros.cep = "CEP e obrigatorio.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const montarPayload = () => ({
    nome: form.nome.trim(),
    cnpj: form.cnpj.trim(),
    endereco: {
      logradouro: form.logradouro.trim(),
      bairro: form.bairro.trim(),
      cidade: form.cidade.trim(),
      estado: form.estado.trim(),
      cep: form.cep.trim(),
    },
  });

  const abrirModal = (associacao = null) => {
    if (associacao) {
      setForm({
        nome: associacao.nome || "",
        cnpj: associacao.cnpj || "",
        logradouro: associacao.endereco?.logradouro || "",
        bairro: associacao.endereco?.bairro || "",
        cidade: associacao.endereco?.cidade || "",
        estado: associacao.endereco?.estado || "",
        cep: associacao.endereco?.cep || "",
      });
      setEditandoId(associacao.id);
    } else {
      setForm(FORM_VAZIO);
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
  };

  const fecharDrawer = () => {
    setDrawerAberto(false);
    setAssociacaoAtiva(null);
    setMembros([]);
    setColetorSelecionadoId("");
  };

  const carregarMembros = async (associacaoId) => {
    setCarregandoDetalhes(true);
    try {
      const lista = await listarMembrosDaAssociacao(associacaoId);
      setMembros(lista.map(normalizarMembro));
    } catch (error) {
      setErro(normalizarErro(error));
      setMembros([]);
    } finally {
      setCarregandoDetalhes(false);
    }
  };

  const abrirDetalhes = async (associacao) => {
    setAssociacaoAtiva(associacao);
    setDrawerAberto(true);
    setErro("");
    setMembros([]);
    setColetorSelecionadoId("");
    await carregarMembros(associacao.id);
  };

  const handleSalvar = async () => {
    if (!validar()) return;

    setSalvando(true);
    setErro("");

    try {
      const payload = montarPayload();
      if (editandoId) {
        await atualizarAssociacao(editandoId, payload);
      } else {
        await criarAssociacao(payload);
      }

      await carregarTudo();
      fecharModal();
    } catch (error) {
      setErro(normalizarErro(error));
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async (id) => {
    const confirmou = window.confirm("Tem certeza que deseja excluir esta associacao?");
    if (!confirmou) return;

    setRemovendoId(id);
    setErro("");

    try {
      await deletarAssociacao(id);
      setAssociacoes((prev) => prev.filter((item) => item.id !== id));
      if (associacaoAtiva?.id === id) {
        fecharDrawer();
      }
    } catch (error) {
      setErro(normalizarErro(error));
    } finally {
      setRemovendoId("");
    }
  };

  const handleAtribuirColetor = async () => {
    if (!associacaoAtiva?.id || !coletorSelecionadoId) return;

    setAtribuindoId(coletorSelecionadoId);
    setErro("");

    try {
      const retorno = await atribuirColetorAssociacao(associacaoAtiva.id, coletorSelecionadoId);
      setAssociacaoAtiva((prev) =>
        prev
          ? {
              ...prev,
              totalColetores: Number(prev.totalColetores ?? 0) + 1,
            }
          : prev
      );

      setColetores((prev) =>
        prev.map((coletor) =>
          coletor.id === coletorSelecionadoId
            ? {
                ...coletor,
                associacao: retorno?.associacao
                  ? {
                      id: retorno.associacao.id || associacaoAtiva.id,
                      nome: retorno.associacao.nome || associacaoAtiva.nome,
                      cnpj: retorno.associacao.cnpj || associacaoAtiva.cnpj,
                    }
                  : {
                      id: associacaoAtiva.id,
                      nome: associacaoAtiva.nome,
                      cnpj: associacaoAtiva.cnpj,
                    },
              }
            : coletor
        )
      );

      await carregarMembros(associacaoAtiva.id);
      setColetorSelecionadoId("");
      await carregarTudo();
    } catch (error) {
      setErro(normalizarErro(error));
    } finally {
      setAtribuindoId("");
    }
  };

  const associacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return associacoes;

    return associacoes.filter((item) => {
      const endereco = formatarEndereco(item.endereco).toLowerCase();
      return [
        item.nome,
        item.cnpj,
        endereco,
        String(item.totalColetores),
      ].some((valor) => String(valor || "").toLowerCase().includes(termo));
    });
  }, [associacoes, busca]);

  const stats = useMemo(
    () => ({
      totalAssociacoes: associacoes.length,
      totalColetores: coletores.length,
      associacoesComColetores: associacoes.filter((item) => item.totalColetores > 0).length,
      membrosCarregados: membros.length,
    }),
    [associacoes, coletores.length, membros.length]
  );

  return {
    associacoes,
    associacoesFiltradas,
    coletores,
    membros,
    associacaoAtiva,
    modalAberto,
    drawerAberto,
    form,
    setForm,
    erros,
    editandoId,
    abrirModal,
    fecharModal,
    abrirDetalhes,
    fecharDrawer,
    handleSalvar,
    handleDeletar,
    handleAtribuirColetor,
    carregando,
    carregandoDetalhes,
    salvando,
    removendoId,
    atribuindoId,
    coletorSelecionadoId,
    setColetorSelecionadoId,
    erro,
    setErro,
    busca,
    setBusca,
    stats,
    recarregar: carregarTudo,
  };
}
