import { useState } from "react";

export function useRecuperarSenha() {
  const [email, setEmail] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valor) return "O e-mail é obrigatório.";
    if (!regex.test(valor)) return "Digite um e-mail válido (ex: nome@email.com).";
    return "";
  }

  function handleChange(e) {
    const valor = e.target.value;
    setEmail(valor);
    setEmailErro(validarEmail(valor));
  }

  function handleSubmit() {
    const erro = validarEmail(email);
    if (erro) {
      setEmailErro(erro);
      return;
    }
    setEnviado(true);
    // Aqui será feita a chamada à API quando o back-end estiver pronto
  }

  function handleReenviar() {
    setEnviado(false);
    setEmail("");
    setEmailErro("");
  }

  return {
    email,
    emailErro,
    enviado,
    handleChange,
    handleSubmit,
    handleReenviar,
  };
}
