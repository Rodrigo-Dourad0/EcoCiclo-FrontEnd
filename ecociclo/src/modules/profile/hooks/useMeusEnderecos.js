import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../context/AuthContext";

function formatarEndereco(endereco) {
  if (!endereco) return "Endereco nao informado";

  if (typeof endereco === "string") {
    return endereco.trim() || "Endereco nao informado";
  }

  if (endereco.completo) return endereco.completo;
  if (endereco.enderecoCompleto) return endereco.enderecoCompleto;
  if (endereco.endereco_completo) return endereco.endereco_completo;

  const partes = [
    endereco.logradouro || endereco.rua,
    endereco.numero,
    endereco.complemento,
    endereco.bairro,
    endereco.cidade || endereco.municipio,
    endereco.estado,
    endereco.cep,
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(" - ") : "Endereco nao informado";
}

function normalizarEndereco(endereco) {
  if (!endereco) return null;

  if (typeof endereco === "string") {
    const texto = endereco.trim();
    if (!texto) return null;
    return {
      id: "",
      rua: texto,
      logradouro: texto,
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      completo: texto,
    };
  }

  return {
    id: endereco.id || "",
    rua: endereco.rua || endereco.logradouro || "",
    logradouro: endereco.logradouro || endereco.rua || "",
    numero: endereco.numero || "",
    complemento: endereco.complemento || "",
    bairro: endereco.bairro || "",
    cidade: endereco.cidade || endereco.municipio || "",
    estado: endereco.estado || "",
    cep: endereco.cep || "",
    completo:
      endereco.completo ||
      endereco.enderecoCompleto ||
      endereco.endereco_completo ||
      endereco.descricao ||
      formatarEndereco(endereco),
  };
}

function extrairEnderecos(usuario) {
  if (!usuario) return [];

  const candidatos = [];

  if (Array.isArray(usuario.enderecos)) candidatos.push(...usuario.enderecos);
  if (Array.isArray(usuario.listaEnderecos)) candidatos.push(...usuario.listaEnderecos);
  if (Array.isArray(usuario.addresses)) candidatos.push(...usuario.addresses);

  if (usuario.enderecoPrincipal) candidatos.push(usuario.enderecoPrincipal);
  if (usuario.enderecoEntrega) candidatos.push(usuario.enderecoEntrega);
  if (usuario.endereco) candidatos.push(usuario.endereco);

  const unicos = new Map();

  candidatos.forEach((item, index) => {
    const normalizado = normalizarEndereco(item);
    if (!normalizado) return;

    const chave = normalizado.id || `${normalizado.logradouro}-${normalizado.numero}-${normalizado.cep}-${index}`;
    if (!unicos.has(chave)) {
      unicos.set(chave, normalizado);
    }
  });

  return Array.from(unicos.values());
}

async function buscarUsuarioLogado(userId) {
  if (!userId) return null;

  const rotas = ["/api/usuarios/me", `/api/usuarios/${userId}`];

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      if (response.data) return response.data;
    } catch {
      // tenta a proxima rota
    }
  }

  return null;
}

export function useMeusEnderecos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enderecos, setEnderecos] = useState([]);
  const [modalExcluir, setModalExcluir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregarEnderecos = useCallback(async () => {
    if (!user?.id) {
      setEnderecos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const usuarioAtual = (await buscarUsuarioLogado(user.id)) || user;
      setEnderecos(extrairEnderecos(usuarioAtual));
    } catch (error) {
      console.error("Erro ao carregar enderecos:", error);
      setErro("Nao foi possivel carregar seus enderecos.");
      setEnderecos([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    carregarEnderecos();
  }, [carregarEnderecos]);

  function handleNovoEndereco() {
    navigate("/novo-endereco");
  }

  function handleEditar(id) {
    navigate("/novo-endereco", { state: { enderecoId: id } });
  }

  function handleConfirmarExcluir(id) {
    if (enderecos.length <= 1) {
      setErro("Você precisa ter pelo menos um endereço cadastrado.");
      return;
    }
    setModalExcluir(id);
  }

  function handleCancelarExcluir() {
    setModalExcluir(null);
  }

  async function handleExcluir() {
    if (!modalExcluir) return;

    if (enderecos.length <= 1) {
      setErro("Você precisa ter pelo menos um endereço cadastrado.");
      setModalExcluir(null);
      return;
    }

    const enderecoAtual = enderecos.find((item) => String(item.id) === String(modalExcluir));

    if (!enderecoAtual?.id) {
      setModalExcluir(null);
      return;
    }

    try {
      const rotas = [`/api/enderecos/${modalExcluir}`, `/api/endereco/${modalExcluir}`];

      let sucesso = false;
      for (const rota of rotas) {
        try {
          await api.delete(rota);
          sucesso = true;
          break;
        } catch {
          // tenta a proxima rota
        }
      }

      if (!sucesso) {
        throw new Error("Nao foi possivel excluir o endereco.");
      }

      await carregarEnderecos();
      setModalExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir endereco:", error);
      setErro("Nao foi possivel excluir o endereco.");
      setModalExcluir(null);
    }
  }

  function handleVoltar() {
    navigate("/perfil");
  }

  return {
    enderecos,
    modalExcluir,
    loading,
    erro,
    handleNovoEndereco,
    handleEditar,
    handleConfirmarExcluir,
    handleCancelarExcluir,
    handleExcluir,
    handleVoltar,
  };
}