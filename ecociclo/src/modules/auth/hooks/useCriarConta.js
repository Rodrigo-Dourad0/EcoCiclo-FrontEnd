import { useState } from "react";

export default function useCriarConta() {
  const [tipo, setTipo] = useState("doador");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erros, setErros] = useState({});

  function handleChange(e) {
  const { id, value } = e.target;

  if (id === "telefone") {
    let v = value.replace(/\D/g, "");
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    setForm((prev) => ({ ...prev, telefone: v }));
    const telLimpo = v.replace(/\D/g, "");
    setErros((prev) => ({ ...prev, telefone: telLimpo.length < 10 && v.length > 0 ? "Informe um telefone válido." : "" }));
    return;
  }

  setForm((prev) => ({ ...prev, [id]: value }));

  // Validação por campo
  setErros((prev) => {
    const novos = { ...prev };

    if (id === "nome") {
      novos.nome = value.trim() ? "" : "Por favor, informe seu nome completo.";
    }
    if (id === "email") {
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      novos.email = emailValido ? "" : "Informe um email válido.";
    }
    if (id === "senha") {
      novos.senha = value.length >= 6 ? "" : "A senha deve ter pelo menos 6 caracteres.";
      novos.confirmarSenha = form.confirmarSenha && value !== form.confirmarSenha ? "As senhas não coincidem." : "";
    }
    if (id === "confirmarSenha") {
      novos.confirmarSenha = value === form.senha ? "" : "As senhas não coincidem.";
    }

    return novos;
  });
}

  function validar() {
    const novosErros = {};
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const telLimpo = form.telefone.replace(/\D/g, "");

    if (!form.nome.trim()) novosErros.nome = "Por favor, informe seu nome completo.";
    if (!emailValido) novosErros.email = "Informe um email válido.";
    if (telLimpo.length < 10) novosErros.telefone = "Informe um telefone válido.";
    if (form.senha.length < 6) novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    if (form.senha !== form.confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit() {
    if (validar()) {
      alert(`Conta criada com sucesso!\nNome: ${form.nome}\nTipo: ${tipo}`);
    }
  }

  return {
    tipo,
    setTipo,
    form,
    erros,
    handleChange,
    handleSubmit,
  };
}