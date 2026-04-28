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

  function handleChange(e) {
    const { id, value } = e.target;

    // normaliza o id removendo o "2" do final (versão desktop)
    const campo = id.replace(/2$/, "");

    if (campo === "data") {
      let v = value.replace(/\D/g, "");
      if (v.length <= 4) {
        v = v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
      } else {
        v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
      }
      setForm((prev) => ({ ...prev, data: v }));
      setErros((prev) => ({ ...prev, data: v.length === 10 ? "" : "Informe uma data válida." }));
      return;
    }

    if (campo === "horario") {
      let v = value.replace(/\D/g, "");
      v = v.replace(/(\d{2})(\d{0,2})/, "$1:$2");
      setForm((prev) => ({ ...prev, horario: v }));
      setErros((prev) => ({ ...prev, horario: v.length === 5 ? "" : "Informe um horário válido." }));
      return;
    }

    setForm((prev) => ({ ...prev, [campo]: value }));

    setErros((prev) => {
      const novos = { ...prev };

      if (campo === "tipoMaterial") {
        novos.tipoMaterial = value ? "" : "Selecione o tipo de material.";
      }
      if (campo === "pesoEstimado") {
        novos.pesoEstimado = value && Number(value) > 0 ? "" : "Informe um peso válido.";
      }
      if (campo === "endereco") {
        novos.endereco = value ? "" : "Selecione o endereço de coleta.";
      }
      if (campo === "observacoes") {
        novos.observacoes = "";
      }

      return novos;
    });
  }

  function validar() {
    const novosErros = {};

    if (!form.tipoMaterial) novosErros.tipoMaterial = "Selecione o tipo de material.";
    if (!form.pesoEstimado || Number(form.pesoEstimado) <= 0) novosErros.pesoEstimado = "Informe um peso válido.";
    if (!form.data) novosErros.data = "Informe a data da coleta.";
    if (!form.horario) novosErros.horario = "Informe o horário da coleta.";
    if (!form.endereco) novosErros.endereco = "Selecione o endereço de coleta.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit() {
    if (validar()) {
      alert(`Coleta agendada com sucesso!\nMaterial: ${form.tipoMaterial}\nData: ${form.data} às ${form.horario}`);
    }
  }

  return {
    form,
    erros,
    tiposMaterial,
    enderecos,
    handleChange,
    handleSubmit,
  };
}
