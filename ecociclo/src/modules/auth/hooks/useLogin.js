import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../shared/services/firebase";
import { useAuth } from "../../../context/AuthContext";

export function useLogin() {
  const { login } = useAuth();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (valor.length < 6) {
      setSenhaErro("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    setSenhaErro("");
    return true;
  };

  const handleLoginSubmit = async () => {
    if (validarEmail(email) && validarSenha(senha)) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const token = await userCredential.user.getIdToken();
        
        localStorage.setItem('ecoCicloToken', token);
        
        const response = await fetch('http://localhost:8080/api/usuarios/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error('Falha ao buscar perfil do usuário no servidor.');
        }
        
        const userData = await response.json();
        login(userData);
        setLoading(false);
        return userData;
      } catch (error) {
        console.error(error);
        alert(`Erro ao fazer login: ${error.message}`);
        setLoading(false);
        return false;
      }
    }
    return false;
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
    handleLoginSubmit,
    loading
  };
}