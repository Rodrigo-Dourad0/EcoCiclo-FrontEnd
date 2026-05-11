import { useState } from "react";

export default function useFinalizarColeta() {
  const [form, setForm] = useState({
    pesoReal: "",
    observacoes: "",
    fotos: [],
  });
  const [erros, setErros] = useState({});

  // ID da coleta normalmente viria via props ou rota, aqui fixo pra exemplo
  const idColeta = "#003";

  function handleChange(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");

    setForm((prev) => ({ ...prev, [campo]: value }));

    setErros((prev) => {
      const novos = { ...prev };
      if (campo === "pesoReal") {
        novos.pesoReal = value && Number(value) > 0 ? "" : "Informe um peso válido.";
      }
      return novos;
    });
  }

  function handleFotos(e) {
    const arquivos = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, fotos: [...prev.fotos, ...arquivos] }));
  }

  function validar() {
    const novosErros = {};
    if (!form.pesoReal || Number(form.pesoReal) <= 0) {
      novosErros.pesoReal = "Informe o peso real coletado.";
    }
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
    handleFotos,
    handleSubmit,
  };
}
