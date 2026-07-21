import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api";

function extrairPontos(usuario) {
  const valores = [
    usuario?.pontos,
    usuario?.pontuacao,
    usuario?.saldoPontos,
    usuario?.pontosAcumulados,
    usuario?.totalPontos,
    usuario?.coletasPontos,
  ];

  const encontrado = valores.find((valor) => valor !== undefined && valor !== null && valor !== "");
  const numero = Number(encontrado);
  return Number.isFinite(numero) ? numero : 0;
}

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

function normalizarAgendamento(agendamento) {
  const doacao = agendamento?.doacao || {};
  const status = agendamento?.status || "PENDENTE";

  return {
    id: agendamento?.id,
    status,
    statusLabel:
      status === "CONCLUIDO"
        ? "Coletada"
        : status === "CONFIRMADO"
          ? "Aceita"
          : status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
            ? "Aguardando confirmacao"
            : status === "CANCELADO"
              ? "Cancelada"
              : "Agendada",
    statusClass:
      status === "CONCLUIDO"
        ? "status-coletada"
        : status === "CANCELADO"
          ? "status-cancelada"
          : "status-agendada",
    data: formatarData(agendamento?.dataColeta),
    endereco:
      agendamento?.endereco?.completo ||
      agendamento?.endereco?.descricao ||
      agendamento?.enderecoId ||
      "Endereco nao informado",
    peso: doacao?.peso != null ? `${doacao.peso} kg` : "Nao informado",
    pontos: agendamento?.pontosGerados != null ? `+${agendamento.pontosGerados} pontos` : null,
    coletor: agendamento?.coletor?.nome || (agendamento?.coletorId ? "Coletor vinculado" : null),
    nome: doacao?.nome || "Doacao",
  };
}

async function buscarAgendamentosDoUsuario(userId) {
  const response = await api.get("/api/agendamentos");
  const dados = Array.isArray(response.data) ? response.data : [];
  return dados.filter((item) => String(item?.doadorId) === String(userId));
}

export function useDashboard() {
  const { user, refreshUser } = useAuth();
  const [agendamentos, setAgendamentos] = useState([]);
  const [pontosAtuais, setPontosAtuais] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!user?.id) {
        setAgendamentos([]);
        setPontosAtuais(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [usuarioAtual, listaAgendamentos] = await Promise.all([
          api.get("/api/usuarios/me").catch(() => null),
          buscarAgendamentosDoUsuario(user.id),
        ]);

        const usuario = usuarioAtual?.data || user || {};
        const pontos = extrairPontos(usuario);
        const normalizados = listaAgendamentos
          .map(normalizarAgendamento)
          .sort((a, b) => String(b.data || "").localeCompare(String(a.data || "")));

        if (!ativo) return;

        setPontosAtuais(pontos);
        setAgendamentos(normalizados);
      } catch (err) {
        if (!ativo) return;

        const mensagem =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar seu dashboard.";
        setError(mensagem);
        setAgendamentos([]);
        setPontosAtuais(extrairPontos(user));
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [reloadKey, user?.id, user]);

  const stats = useMemo(() => {
    const total = agendamentos.length;
    const concluidas = agendamentos.filter((item) => item.status === "CONCLUIDO").length;
    const emAndamento = agendamentos.filter(
      (item) =>
        item.status === "PENDENTE" ||
        item.status === "CONFIRMADO" ||
        item.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
    ).length;

    return [
      {
        id: 1,
        label: "Pontos",
        value: String(pontosAtuais),
        colorClass: "green",
      },
      {
        id: 2,
        label: "Doações",
        value: String(total),
        colorClass: "blue",
      },
      {
        id: 3,
        label: "Concluídas",
        value: String(concluidas),
        colorClass: "yellow",
      },
      {
        id: 4,
        label: "Em andamento",
        value: String(emAndamento),
        colorClass: "purple",
      },
    ];
  }, [agendamentos, pontosAtuais]);

  const doacoesRecentes = useMemo(() => agendamentos.slice(0, 3), [agendamentos]);
  const proximasDoacoes = useMemo(
    () => agendamentos.filter((item) => item.status !== "CONCLUIDO").slice(0, 2),
    [agendamentos]
  );

  const saudacao = user?.nome || "Doador";

  return {
    showNotifications,
    setShowNotifications,
    stats,
    doacoesRecentes,
    proximasDoacoes,
    loading,
    error,
    saudacao,
    pontosAtuais,
    recarregar: () => {
      refreshUser?.();
      setReloadKey((valor) => valor + 1);
    },
  };
}
