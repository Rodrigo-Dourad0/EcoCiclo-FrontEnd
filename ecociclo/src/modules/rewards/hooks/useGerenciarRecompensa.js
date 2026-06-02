import { useState } from "react";

const recompensasIniciais = [
  {
    id: 1,
    nome: "Garrafa Térmica EcoCiclo",
    descricao: "Garrafa de 500ml em aço inoxidável com logo EcoCiclo.",
    pontos: 800,
    estoque: 32,
    foto: null,
    ativa: true,
  },
  {
    id: 2,
    nome: "Camiseta Reciclada",
    descricao: "Camiseta confeccionada com algodão orgânico reciclado.",
    pontos: 1200,
    estoque: 15,
    foto: null,
    ativa: true,
  },
  {
    id: 3,
    nome: "Vale-compras R$ 50",
    descricao: "Desconto de R$ 50 em lojas parceiras.",
    pontos: 500,
    estoque: 50,
    foto: null,
    ativa: false,
  },
  {
    id: 4,
    nome: "Kit Ecobag + Squeeze",
    descricao: "Ecobag reutilizável + squeeze de 600ml.",
    pontos: 950,
    estoque: 8,
    foto: null,
    ativa: true,
  },
];

const FORM_VAZIO = {
  nome: "",
  descricao: "",
  pontos: "",
  estoque: "",
  foto: null,
  fotoPreview: null,
};

export function useGerenciarRecompensa() {
  const [recompensas, setRecompensas] = useState(recompensasIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [form, setForm] = useState(FORM_VAZIO);
  const [erros, setErros] = useState({});
  const [editandoId, setEditandoId] = useState(null);

  // ── Validação
  const validar = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório.";
    if (!form.descricao.trim()) e.descricao = "Descrição é obrigatória.";
    if (!form.pontos || Number(form.pontos) <= 0) e.pontos = "Informe pontos válidos.";
    if (!form.estoque || Number(form.estoque) < 0) e.estoque = "Informe estoque válido.";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  // ── Abrir modal (novo ou editar)
  const abrirModal = (recompensa = null) => {
    if (recompensa) {
      setForm({
        nome: recompensa.nome,
        descricao: recompensa.descricao,
        pontos: String(recompensa.pontos),
        estoque: String(recompensa.estoque),
        foto: recompensa.foto,
        fotoPreview: recompensa.foto,
      });
      setEditandoId(recompensa.id);
    } else {
      setForm(FORM_VAZIO);
      setEditandoId(null);
    }
    setErros({});
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setForm(FORM_VAZIO);
    setErros({});
    setEditandoId(null);
  };

  // ── Salvar (novo ou editar)
  const handleSalvar = () => {
    if (!validar()) return;

    if (editandoId !== null) {
      setRecompensas((prev) =>
        prev.map((r) =>
          r.id === editandoId
            ? {
                ...r,
                nome: form.nome,
                descricao: form.descricao,
                pontos: Number(form.pontos),
                estoque: Number(form.estoque),
                foto: form.fotoPreview,
              }
            : r
        )
      );
    } else {
      const nova = {
        id: Date.now(),
        nome: form.nome,
        descricao: form.descricao,
        pontos: Number(form.pontos),
        estoque: Number(form.estoque),
        foto: form.fotoPreview,
        ativa: true,
      };
      setRecompensas((prev) => [nova, ...prev]);
    }
    fecharModal();
  };

  // ── Pausar / Reativar
  const toggleAtiva = (id) => {
    setRecompensas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ativa: !r.ativa } : r))
    );
  };

  // ── Upload de foto
  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, foto: file, fotoPreview: ev.target.result }));
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
    toggleAtiva,
    handleFoto,
  };
}