import { useState } from "react";

export default function useFinalizarColeta() {
  const [form, setForm] = useState({
    pesoReal: "",
    observacoes: "",
    fotos: [],
  });
  const [erros, setErros] = useState({});

  const idColeta = "#003";

  // ── Validador individual ─────────────────────────────────────────────────
  const validarCampo = (campo, value) => {
    switch (campo) {
      case "pesoReal":
        if (!value) return "Informe o peso real coletado.";
        if (Number(value) <= 0) return "O peso deve ser maior que zero.";
        return "";
      default:
        return "";
    }
  };

  // ── onChange ─────────────────────────────────────────────────────────────
  function handleChange(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");

    setForm((prev) => ({ ...prev, [campo]: value }));

    // atualiza erro em tempo real só se o campo já tinha erro visível
    if (erros[campo] !== undefined) {
      setErros((prev) => ({ ...prev, [campo]: validarCampo(campo, value) }));
    }
  }

  // ── onBlur: dispara erro ao sair do campo ────────────────────────────────
  function handleBlur(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");
    if (campo === "observacoes") return;
    setErros((prev) => ({ ...prev, [campo]: validarCampo(campo, value) }));
  }

  function handleFotos(e) {
    const arquivos = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, fotos: [...prev.fotos, ...arquivos] }));
  }

  // ── Submit: valida tudo ───────────────────────────────────────────────────
  function validar() {
    const novosErros = {};
    const erro = validarCampo("pesoReal", form.pesoReal);
    if (erro) novosErros.pesoReal = erro;
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit() {
    if (validar()) {
      alert(`Coleta ${idColeta} finalizada com sucesso!\nPeso real: ${form.pesoReal} kg`);
    }
  }

  return {
    form,
    erros,
    idColeta,
    handleChange,
    handleBlur,
    handleFotos,
    handleSubmit,
  };
}