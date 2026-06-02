import { useState } from "react";

export default function useAgendarColeta() {
  const [form, setForm] = useState({
    tipoMaterial: "",
    pesoEstimado: "",
    data: "",
    horario: "",
    endereco: "",
    observacoes: "",
  });
  const [erros, setErros] = useState({});

  const tiposMaterial = [
    "Papel e Papelão",
    "Plástico",
    "Vidro",
    "Metal",
    "Eletrônicos",
    "Orgânico",
  ];

  const enderecos = [
    "Rua das Flores, 123 - Centro",
    "Av. Principal, 456 - Jardins",
    "Rua do Comércio, 789 - Vila Nova",
  ];

  // ── Validadores individuais ──────────────────────────────────────────────
  const validarCampo = (campo, value) => {
    switch (campo) {
      case "tipoMaterial":
        return value ? "" : "Selecione o tipo de material.";
      case "pesoEstimado":
        if (!value) return "Informe o peso estimado.";
        if (Number(value) <= 0) return "O peso deve ser maior que zero.";
        return "";
      case "data": {
        if (!value) return "Informe a data da coleta.";
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(value)) return "Digite uma data válida (dd/mm/aaaa).";
        return "";
      }
      case "horario": {
        if (!value) return "Informe o horário da coleta.";
        const regex = /^\d{2}:\d{2}$/;
        if (!regex.test(value)) return "Digite um horário válido (hh:mm).";
        return "";
      }
      case "endereco":
        return value ? "" : "Selecione o endereço de coleta.";
      default:
        return "";
    }
  };

  // ── onChange ─────────────────────────────────────────────────────────────
  function handleChange(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");

    if (campo === "data") {
      let v = value.replace(/\D/g, "");
      if (v.length <= 4) {
        v = v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
      } else {
        v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
      }
      setForm((prev) => ({ ...prev, data: v }));
      // só limpa o erro se já está completo; não dispara erro enquanto digita
      if (erros.data && v.length === 10) {
        setErros((prev) => ({ ...prev, data: "" }));
      }
      return;
    }

    if (campo === "horario") {
      let v = value.replace(/\D/g, "");
      v = v.replace(/(\d{2})(\d{0,2})/, "$1:$2");
      setForm((prev) => ({ ...prev, horario: v }));
      if (erros.horario && v.length === 5) {
        setErros((prev) => ({ ...prev, horario: "" }));
      }
      return;
    }

    setForm((prev) => ({ ...prev, [campo]: value }));

    // limpa erro ao corrigir o campo
    if (erros[campo]) {
      setErros((prev) => ({ ...prev, [campo]: validarCampo(campo, value) }));
    }
  }

  // ── onBlur: dispara erro ao sair do campo ─────────────────────────────────
  function handleBlur(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");
    if (campo === "observacoes") return;
    const erro = validarCampo(campo, value);
    setErros((prev) => ({ ...prev, [campo]: erro }));
  }

  // ── Submit: valida tudo ───────────────────────────────────────────────────
  function validar() {
    const campos = ["tipoMaterial", "pesoEstimado", "data", "horario", "endereco"];
    const novosErros = {};
    campos.forEach((campo) => {
      const erro = validarCampo(campo, form[campo]);
      if (erro) novosErros[campo] = erro;
    });
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit() {
    if (validar()) {
      alert(
        `Coleta agendada com sucesso!\nMaterial: ${form.tipoMaterial}\nData: ${form.data} às ${form.horario}`
      );
    }
  }

  return {
    form,
    erros,
    tiposMaterial,
    enderecos,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}