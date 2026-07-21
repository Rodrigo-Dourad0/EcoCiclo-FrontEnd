import { useState } from "react";
import { api } from "../../../shared/services/api";

export default function useCriarConta() {
  const [tipo, setTipo] = useState("doador");
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erros, setErros] = useState({});

  function handleChange(e) {
    const { id: rawId, value } = e.target;
    const id = rawId.replace(/2$/, "");

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

    if (id === "cpf") {
      let v = value.replace(/\D/g, "");
      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }
      setForm((prev) => ({ ...prev, cpf: v }));
      const cpfLimpo = v.replace(/\D/g, "");
      setErros((prev) => ({ ...prev, cpf: cpfLimpo.length < 11 && v.length > 0 ? "Informe um CPF válido." : "" }));
      return;
    }

    if (id === "cep") {
      let v = value.replace(/\D/g, "");
      if (v.length <= 8) {
        v = v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
      }
      setForm((prev) => ({ ...prev, cep: v }));
      const cepLimpo = v.replace(/\D/g, "");
      setErros((prev) => ({ ...prev, cep: cepLimpo.length < 8 && v.length > 0 ? "Informe um CEP válido." : "" }));
      return;
    }

    if (id === "estado") {
      const v = value.toUpperCase().slice(0, 2);
      setForm((prev) => ({ ...prev, estado: v }));
      setErros((prev) => ({ ...prev, estado: v.trim() ? "" : "Informe o estado (UF)." }));
      return;
    }

    setForm((prev) => ({ ...prev, [id]: value }));

    setErros((prev) => {
      const novos = { ...prev };

      if (id === "nome") {
        novos.nome = value.trim() ? "" : "Por favor, informe seu nome completo.";
      }
      if (id === "email") {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        novos.email = emailValido ? "" : "Informe um email válido.";
      }
      if (id === "logradouro") {
        novos.logradouro = value.trim() ? "" : "Informe o logradouro.";
      }
      if (id === "bairro") {
        novos.bairro = value.trim() ? "" : "Informe o bairro.";
      }
      if (id === "cidade") {
        novos.cidade = value.trim() ? "" : "Informe a cidade.";
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
    const cpfLimpo = form.cpf.replace(/\D/g, "");
    const cepLimpo = form.cep.replace(/\D/g, "");

    if (!form.nome.trim()) novosErros.nome = "Por favor, informe seu nome completo.";
    if (cpfLimpo.length < 11) novosErros.cpf = "Informe um CPF válido.";
    if (!emailValido) novosErros.email = "Informe um email válido.";
    if (telLimpo.length < 10) novosErros.telefone = "Informe um telefone válido.";
    
    if (cepLimpo.length < 8) novosErros.cep = "Informe um CEP válido.";
    if (!form.logradouro.trim()) novosErros.logradouro = "Informe o logradouro.";
    if (!form.bairro.trim()) novosErros.bairro = "Informe o bairro.";
    if (!form.cidade.trim()) novosErros.cidade = "Informe a cidade.";
    if (!form.estado.trim()) novosErros.estado = "Informe o estado (UF).";

    if (form.senha.length < 6) novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    if (form.senha !== form.confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit() {
    if (validar()) {
      try {
        const perfilUsuario = tipo === 'doador' ? 'DOADOR' : tipo === 'admin' ? 'ADMINISTRADOR' : 'COLETOR';
        
        const dadosCadastro = {
          nome: form.nome,
          cpf: form.cpf.replace(/\D/g, ""), 
          telefone: form.telefone.replace(/\D/g, ""), 
          email: form.email,
          senha: form.senha,
          perfil: perfilUsuario,
          endereco: {
            logradouro: form.logradouro,
            bairro: form.bairro,
            cidade: form.cidade,
            estado: form.estado,
            cep: form.cep.replace(/\D/g, "")
          }
        };

        const response = await api.post('/api/usuarios', dadosCadastro);

        alert(`Conta criada com sucesso!\nNome: ${response.data.nome || form.nome}\nPerfil: ${perfilUsuario}`);
        
      } catch (error) {
        console.error("Erro ao criar conta:", error);
        const mensagemErro = error.response?.data?.message || 'Erro ao criar usuário no back-end';
        alert(`Erro ao criar conta: ${mensagemErro}`);
      }
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