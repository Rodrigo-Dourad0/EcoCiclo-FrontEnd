import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../shared/services/firebase";

export default function useCriarConta() {
  const [tipo, setTipo] = useState("doador");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
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

  async function handleSubmit() {
    if (validar()) {
      try {
        // Mapeamento: doador -> DOADOR, coletor -> ASSOCIACAO, admin -> ADMIN
        const tipoUsuario = tipo === 'doador' ? 'DOADOR' : tipo === 'admin' ? 'ADMIN' : 'ASSOCIACAO';
        
        // 1. Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.senha);
        const user = userCredential.user;
        const token = await user.getIdToken();

        // 2. Back-end API - Criar perfil
        const response = await fetch('http://localhost:8080/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: form.nome,
            email: form.email,
            telefone: form.telefone,
            tipo: tipoUsuario,
            associacaoId: null,
            firebaseUid: user.uid,
            pontuacao: 0
          })
        });

        if (!response.ok) {
           const errorData = await response.json().catch(() => ({}));
           throw new Error(errorData.erro || 'Erro ao criar usuário no back-end');
        }

        alert(`Conta criada com sucesso!\nNome: ${form.nome}\nTipo: ${tipoUsuario}`);
      } catch (error) {
        console.error("Erro ao criar conta:", error);
        alert(`Erro ao criar conta: ${error.message}`);
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