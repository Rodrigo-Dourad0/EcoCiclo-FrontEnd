import { useState } from "react";

export function useLogin() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const validarEmail = (valor) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!valor) {
      setEmailErro("O e-mail é obrigatório.");
      return false;
    }

    if (!regex.test(valor)) {
      setEmailErro("Digite um e-mail válido (ex: nome@email.com).");
      return false;
    }

    setEmailErro("");
    return true;
  };

  const validarSenha = (valor) => {
    if (!valor) {
      setSenhaErro("A senha é obrigatória.");
      return false;
    }

    if (valor.length < 8) {
      setSenhaErro("A senha deve ter no mínimo 8 caracteres.");
      return false;
    }

    setSenhaErro("");
    return true;
  };

  return {
    showPwd,
    setShowPwd,
    email,
    setEmail,
    senha,
    setSenha,
    emailErro,
    senhaErro,
    validarEmail,
    validarSenha,
  };
}