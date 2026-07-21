import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api"; // Ajuste o caminho se necessário

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
        // 1. Faz a requisição de login no Spring Boot
        const loginResponse = await api.post('/api/usuarios/login', { 
          email, 
          senha 
        });
        
        // 2. Extrai o token (ajuste o .token se o seu back-end retornar o JWT com outro nome, ex: .accessToken)
        const token = loginResponse.data.token;
        
        if (!token) {
            throw new Error("Token não retornado pelo servidor.");
        }

        // 3. Salva no localStorage usando a exata chave que o Axios interceptor procura
        localStorage.setItem('token', token);
        
        // 4. Busca os dados do perfil (o interceptor já injeta o Bearer token aqui!)
        const meResponse = await api.get('/api/usuarios/me');
        
        const userData = meResponse.data;
        
        // 5. Salva no contexto global
        login(userData);
        setLoading(false);
        return userData;
        
      } catch (error) {
        console.error("Erro no login:", error);
        // Captura a mensagem do Spring Boot (ex: "Credenciais inválidas") ou usa fallback
        const mensagemErro = error.response?.data?.message || 'E-mail ou senha incorretos.';
        alert(`Erro ao fazer login: ${mensagemErro}`);
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