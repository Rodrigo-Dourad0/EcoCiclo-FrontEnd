import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api";

function formatarData(valor) {
  if (!valor) return "Data nao informada";

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "Data nao informada";

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

function formatarEndereco(endereco) {
  if (!endereco) return "Endereco nao informado";

  const partes = [
    endereco.rua,
    endereco.logradouro,
    endereco.numero,
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep,
    endereco.complemento,
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(" - ") : "Endereco nao informado";
}

function mapearAgendamento(agendamento) {
  const doacao = agendamento.doacao || {};

  return {
    id: agendamento.id,
    status: agendamento.status || "PENDENTE",
    statusLabel: rotuloStatus(agendamento.status),
    statusClass: agendamento.status === "CONFIRMADO" ? "cd-status--aceita" : "cd-status--pendente",
    dataColeta: agendamento.dataColeta || null,
    dataColetaFormatada: formatarData(agendamento.dataColeta),
    observacoes: agendamento.observacoes || "",
    doadorId: agendamento.doadorId || "",
    coletorId: agendamento.coletorId || null,
    doador: {
      id: "",
      nome: "Doador nao informado",
      telefone: "Nao informado",
    },
    enderecoId: agendamento.enderecoId || "",
    endereco: {
      id: "",
      rua: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      completo: "Endereco nao informado",
    },
    doacao: {
      id: doacao.id || "",
      nome: doacao.nome || "Doacao",
      quantidade: doacao.quantidade ?? null,
      peso: doacao.peso ?? null,
      imagem: doacao.imagem || "",
    },
  };
}

function rotuloStatus(status) {
  if (status === "CONFIRMADO") return "Aceita";
  if (status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR") return "Aguardando confirmacao";
  if (status === "CONCLUIDO") return "Concluida";
  if (status === "CANCELADO") return "Cancelada";
  return "Pendente";
}

function mapearUsuario(usuario, fallbackId) {
  if (!usuario) {
    return {
      id: fallbackId || "",
      nome: "Doador nao informado",
      telefone: "Nao informado",
      endereco: {
        id: "",
        rua: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        completo: "Endereco nao informado",
      },
    };
  }

  const endereco = usuario.endereco || {};

  return {
    id: usuario.id || fallbackId || "",
    nome:
      usuario.nome ||
      usuario.nomeCompleto ||
      usuario.nomeSocial ||
      usuario.razaoSocial ||
      "Doador nao informado",
    telefone:
      usuario.telefone ||
      usuario.celular ||
      usuario.whatsapp ||
      usuario.phone ||
      "Nao informado",
    endereco: {
      id: endereco.id || "",
      rua: endereco.rua || "",
      logradouro: endereco.logradouro || "",
      numero: endereco.numero || "",
      complemento: endereco.complemento || "",
      bairro: endereco.bairro || "",
      cidade: endereco.cidade || "",
      estado: endereco.estado || "",
      cep: endereco.cep || "",
      completo: formatarEndereco(endereco),
    },
  };
}

export default function useColetasDisponiveis() {
  const { user } = useAuth();
  const [busca, setBusca] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [acaoEmAndamentoId, setAcaoEmAndamentoId] = useState("");
  const [acaoMensagem, setAcaoMensagem] = useState("");
  const recarregar = () => setReloadKey((valor) => valor + 1);

  useEffect(() => {
    let ativo = true;

    async function carregarAgendamentos() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/api/agendamentos/pendentes");
        const listaBase = Array.isArray(response.data)
          ? response.data.map(mapearAgendamento)
          : [];

        const idsUnicos = [...new Set(listaBase.map((item) => item.doadorId).filter(Boolean))];
        const doadores = new Map();

        await Promise.all(
          idsUnicos.map(async (doadorId) => {
            try {
              const respostaUsuario = await api.get(`/api/usuarios/${doadorId}`);
              doadores.set(doadorId, mapearUsuario(respostaUsuario.data, doadorId));
            } catch {
              doadores.set(doadorId, mapearUsuario(null, doadorId));
            }
          })
        );

        const lista = listaBase.map((agendamento) => ({
          ...agendamento,
          doador: doadores.get(agendamento.doadorId) || mapearUsuario(null, agendamento.doadorId),
          endereco:
            (doadores.get(agendamento.doadorId) || mapearUsuario(null, agendamento.doadorId))
              .endereco,
        }));

        if (ativo) {
          setAgendamentos(lista);
        }
      } catch (err) {
        if (!ativo) return;

        const mensagem =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar os agendamentos pendentes.";
        setError(mensagem);
        setAgendamentos([]);
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarAgendamentos();

    return () => {
      ativo = false;
    };
  }, [reloadKey]);

  async function aceitarColeta(agendamentoId) {
    if (!user?.id) {
      setError("Nao foi possivel identificar o coletor logado.");
      return;
    }

    setAcaoEmAndamentoId(agendamentoId);
    setAcaoMensagem("");
    setError("");

    try {
      await api.put(`/api/agendamentos/${agendamentoId}/aceitar`, {
        coletorId: user.id,
      });
      setAcaoMensagem("Coleta aceita com sucesso.");
      recarregar();
    } catch (err) {
      const mensagem =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Nao foi possivel aceitar a coleta.";
      setError(mensagem);
    } finally {
      setAcaoEmAndamentoId("");
    }
  }

  const agendamentosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return agendamentos;

    return agendamentos.filter((agendamento) => {
      return [
        agendamento.doacao.nome,
        agendamento.doador.nome,
        agendamento.doador.telefone,
        agendamento.endereco.completo,
        agendamento.observacoes,
        agendamento.id,
      ]
        .filter(Boolean)
        .some((campo) => campo.toString().toLowerCase().includes(termo));
    });
  }, [agendamentos, busca]);

  return {
    busca,
    setBusca,
    agendamentos,
    agendamentosFiltrados,
    totalAgendamentos: agendamentos.length,
    totalFiltrados: agendamentosFiltrados.length,
    loading,
    error,
    acaoMensagem,
    acaoEmAndamentoId,
    aceitarColeta,
    recarregar,
  };
}
