import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api";
import { listarResgates } from "../services/recompensaService";

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

function rotuloStatus(status) {
  if (status === "CONCLUIDO") return "Retirada confirmada";
  if (status === "CANCELADO") return "Cancelado";
  return "Esperando retirada";
}

function classeStatus(status) {
  if (status === "CONCLUIDO") return "mr-badge--concluido";
  if (status === "CANCELADO") return "mr-badge--cancelado";
  return "mr-badge--pendente";
}

function abaDeStatus(status) {
  if (status === "CONCLUIDO") return "concluidas";
  if (status === "CANCELADO") return "canceladas";
  return "pendentes";
}

function normalizarResgate(resgate) {
  return {
    id: resgate?.id,
    dataRaw: resgate?.data || "",
    data: formatarData(resgate?.data),
    pontosGastos: Number(resgate?.pontosGastos ?? 0),
    status: resgate?.status || "PENDENTE",
    statusLabel: rotuloStatus(resgate?.status),
    statusClass: classeStatus(resgate?.status),
    aba: abaDeStatus(resgate?.status),
    doadorId: resgate?.doadorId || "",
    doadorNome: resgate?.doadorNome || "Doador nao informado",
    recompensaId: resgate?.recompensaId || "",
    recompensaNome: resgate?.recompensaNome || "Recompensa",
  };
}

export default function useMinhasRecompensas() {
  const { user, refreshUser } = useAuth();
  const [resgates, setResgates] = useState([]);
  const [pontosAtuais, setPontosAtuais] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState("pendentes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!user?.id) {
        setResgates([]);
        setPontosAtuais(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [usuarioResponse, resgatesResponse] = await Promise.all([
          api.get("/api/usuarios/me").catch(() => null),
          listarResgates({ doadorId: user.id }).catch(() => []),
        ]);

        const usuarioAtual = usuarioResponse?.data || user || {};
        const pontos = extrairPontos(usuarioAtual);
        const lista = Array.isArray(resgatesResponse)
          ? resgatesResponse
              .map(normalizarResgate)
              .sort((a, b) => String(b.dataRaw || "").localeCompare(String(a.dataRaw || "")))
          : [];

        if (!ativo) return;

        setPontosAtuais(pontos);
        setResgates(lista);
      } catch (err) {
        if (!ativo) return;

        const mensagem =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar seus resgates.";
        setError(mensagem);
        setResgates([]);
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
  }, [reloadKey, user]);

  const contagens = useMemo(() => {
    return {
      pendentes: resgates.filter((item) => item.aba === "pendentes").length,
      concluidas: resgates.filter((item) => item.aba === "concluidas").length,
      canceladas: resgates.filter((item) => item.aba === "canceladas").length,
      total: resgates.length,
    };
  }, [resgates]);

  const totalPontosGastos = useMemo(
    () => resgates.reduce((soma, item) => soma + Number(item.pontosGastos || 0), 0),
    [resgates]
  );

  const resgatesFiltrados = useMemo(
    () => resgates.filter((item) => item.aba === abaAtiva),
    [abaAtiva, resgates]
  );

  return {
    resgates,
    resgatesFiltrados,
    contagens,
    totalPontosGastos,
    pontosAtuais,
    abaAtiva,
    setAbaAtiva,
    loading,
    error,
    recarregar: () => {
      refreshUser?.();
      setReloadKey((valor) => valor + 1);
    },
  };
}
