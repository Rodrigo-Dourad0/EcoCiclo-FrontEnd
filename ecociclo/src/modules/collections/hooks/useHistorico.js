import { useEffect, useMemo, useState } from "react";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../context/AuthContext";

export const STATUS = {
  AGENDADA: "Agendada",
  ACEITA: "Aceita",
  AGUARDANDO: "Aguardando confirmacao",
  COLETADA: "Coletada",
  CANCELADA: "Cancelada",
};

export const PERIODOS = {
  TODOS: "Todos os periodos",
  ULTIMO_MES: "Ultimo mes",
  ULTIMOS_3_MESES: "Ultimos 3 meses",
  ESTE_ANO: "Este ano",
};

function formatarData(valor) {
  if (!valor) return "Data nao informada";

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "Data nao informada";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

function formatarEndereco(endereco) {
  if (!endereco) return "Endereco nao informado";

  if (typeof endereco === "string") {
    return endereco.trim() || "Endereco nao informado";
  }

  if (endereco.completo) return endereco.completo;
  if (endereco.enderecoCompleto) return endereco.enderecoCompleto;
  if (endereco.endereco_completo) return endereco.endereco_completo;

  const partes = [
    endereco.logradouro,
    endereco.rua,
    endereco.numero,
    endereco.bairro,
    endereco.cidade,
    endereco.municipio,
    endereco.estado,
    endereco.cep,
    endereco.complemento,
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(" - ") : "Endereco nao informado";
}

function normalizarEndereco(endereco) {
  if (!endereco) {
    return {
      id: "",
      completo: "Endereco nao informado",
    };
  }

  if (typeof endereco === "string") {
    return {
      id: "",
      completo: endereco.trim() || "Endereco nao informado",
    };
  }

  return {
    id: endereco.id || "",
    logradouro: endereco.logradouro || "",
    rua: endereco.rua || "",
    numero: endereco.numero || "",
    bairro: endereco.bairro || "",
    cidade: endereco.cidade || endereco.municipio || "",
    estado: endereco.estado || "",
    cep: endereco.cep || "",
    complemento: endereco.complemento || "",
    completo:
      endereco.completo ||
      endereco.enderecoCompleto ||
      endereco.endereco_completo ||
      endereco.descricao ||
      formatarEndereco(endereco),
  };
}

function mapearUsuario(usuario, fallbackId) {
  if (!usuario) {
    return {
      id: fallbackId || "",
      nome: "Usuario nao informado",
      telefone: "Nao informado",
      endereco: normalizarEndereco(null),
    };
  }

  const endereco = usuario.endereco || usuario.enderecoPrincipal || usuario.enderecoEntrega || {};

  return {
    id: usuario.id || fallbackId || "",
    nome:
      usuario.nome ||
      usuario.nomeCompleto ||
      usuario.nomeSocial ||
      usuario.razaoSocial ||
      "Usuario nao informado",
    telefone:
      usuario.telefone ||
      usuario.celular ||
      usuario.whatsapp ||
      usuario.phone ||
      "Nao informado",
    endereco: normalizarEndereco(endereco),
  };
}

function mapearAgendamento(agendamento) {
  const doacao = agendamento.doacao || {};
  const dataColeta = agendamento.dataColeta || null;
  const status = agendamento.status || "PENDENTE";

  return {
    id: agendamento.id,
    status,
    statusLabel:
      status === "CONFIRMADO"
        ? STATUS.ACEITA
        : status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
          ? STATUS.AGUARDANDO
          : status === "CONCLUIDO"
            ? STATUS.COLETADA
            : status === "CANCELADO"
              ? STATUS.CANCELADA
              : STATUS.AGENDADA,
    statusClass:
      status === "CONCLUIDO"
        ? "badge-coletada"
        : status === "CANCELADO"
          ? "badge-cancelada"
          : status === "CONFIRMADO" || status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
            ? "badge-agendada"
            : "badge-agendada",
    dataColeta,
    data: formatarData(dataColeta),
    horario: dataColeta ? new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(dataColeta)) : "--:--",
    observacoes: agendamento.observacoes || "",
    pontosGerados: Number(agendamento.pontosGerados ?? 0),
    doadorId: agendamento.doadorId || "",
    coletorId: agendamento.coletorId || null,
    enderecoId: agendamento.enderecoId || "",
    doador: mapearUsuario(agendamento.doador, agendamento.doadorId),
    coletor: mapearUsuario(agendamento.coletor, agendamento.coletorId),
    endereco: normalizarEndereco(agendamento.endereco),
    doacao: {
      id: doacao.id || "",
      nome: doacao.nome || "Doacao",
      quantidade: doacao.quantidade ?? null,
      peso: doacao.peso ?? null,
      imagem: doacao.imagem || "",
    },
  };
}

function filtrarPorPeriodo(doacao, periodo) {
  if (periodo === PERIODOS.TODOS) return true;

  const dataBase = doacao.dataColeta ? new Date(doacao.dataColeta) : null;
  if (!dataBase || Number.isNaN(dataBase.getTime())) return true;

  const hoje = new Date();

  if (periodo === PERIODOS.ULTIMO_MES) {
    const ref = new Date(hoje);
    ref.setMonth(hoje.getMonth() - 1);
    return dataBase >= ref;
  }

  if (periodo === PERIODOS.ULTIMOS_3_MESES) {
    const ref = new Date(hoje);
    ref.setMonth(hoje.getMonth() - 3);
    return dataBase >= ref;
  }

  if (periodo === PERIODOS.ESTE_ANO) {
    return dataBase.getFullYear() === hoje.getFullYear();
  }

  return true;
}

async function buscarAgendamentosDoUsuario(userId) {
  const resposta = await api.get("/api/agendamentos");
  const dados = Array.isArray(resposta.data) ? resposta.data : [];
  return dados.filter((item) => String(item?.doadorId) === String(userId));
}

async function buscarEnderecoPorId(enderecoId, doadorId) {
  const rotas = [`/api/enderecos/${enderecoId}`, `/api/endereco/${enderecoId}`];

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      if (response.data) {
        return normalizarEndereco(response.data);
      }
    } catch {
      // tenta a proxima rota
    }
  }

  if (doadorId) {
    try {
      const response = await api.get(`/api/usuarios/${doadorId}`);
      const usuario = response.data || {};
      const enderecoUsuario = usuario.endereco || usuario.enderecoPrincipal || usuario.enderecoEntrega;

      if (!enderecoUsuario) return null;

      if (!enderecoId || !enderecoUsuario.id || String(enderecoUsuario.id) === String(enderecoId)) {
        return normalizarEndereco(enderecoUsuario);
      }
    } catch {
      return null;
    }
  }

  return null;
}

export function useHistorico() {
  const { user } = useAuth();
  const [statusFiltro, setStatusFiltro] = useState("Todos os status");
  const [periodoFiltro, setPeriodoFiltro] = useState(PERIODOS.TODOS);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const recarregar = () => setReloadKey((valor) => valor + 1);

  useEffect(() => {
    let ativo = true;

    async function carregarHistorico() {
      if (!user?.id) {
        setHistorico([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const dados = await buscarAgendamentosDoUsuario(user.id);
        const listaBase = dados.map(mapearAgendamento);

        const idsEnderecos = [...new Set(listaBase.map((item) => item.enderecoId).filter(Boolean))];
        const enderecos = new Map();

        await Promise.all(
          idsEnderecos.map(async (enderecoId) => {
            const agendamentoBase = listaBase.find((item) => String(item.enderecoId) === String(enderecoId));
            const endereco = await buscarEnderecoPorId(enderecoId, agendamentoBase?.doadorId || user.id);

            if (endereco) {
              enderecos.set(enderecoId, endereco);
            }
          })
        );

        const lista = listaBase
          .map((agendamento) => ({
            ...agendamento,
            endereco:
              enderecos.get(agendamento.enderecoId) ||
              normalizarEndereco(agendamento.endereco) ||
              agendamento.doador.endereco,
          }))
          .sort((a, b) => {
            const dataA = a.dataColeta ? new Date(a.dataColeta).getTime() : 0;
            const dataB = b.dataColeta ? new Date(b.dataColeta).getTime() : 0;
            return dataB - dataA;
          });

        if (ativo) {
          setHistorico(lista);
        }
      } catch (err) {
        if (!ativo) return;

        const mensagem =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar o historico de doacoes.";
        setError(mensagem);
        setHistorico([]);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarHistorico();

    return () => {
      ativo = false;
    };
  }, [reloadKey, user?.id]);

  const statusOptions = useMemo(
    () => ["Todos os status", ...Object.values(STATUS)],
    []
  );

  const historicoFiltrado = useMemo(() => {
    return historico.filter((item) => {
      const passaStatus = statusFiltro === "Todos os status" || item.statusLabel === statusFiltro;
      const passaPeriodo = filtrarPorPeriodo(item, periodoFiltro);
      return passaStatus && passaPeriodo;
    });
  }, [historico, periodoFiltro, statusFiltro]);

  const contagens = useMemo(
    () => ({
      total: historico.length,
      coletadas: historico.filter((item) => item.status === "CONCLUIDO").length,
      emAndamento: historico.filter(
        (item) => item.status === "CONFIRMADO" || item.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
      ).length,
      canceladas: historico.filter((item) => item.status === "CANCELADO").length,
    }),
    [historico]
  );

  return {
    statusFiltro,
    setStatusFiltro,
    periodoFiltro,
    setPeriodoFiltro,
    statusOptions,
    historicoFiltrado,
    contagens,
    loading,
    error,
    recarregar,
  };
}
