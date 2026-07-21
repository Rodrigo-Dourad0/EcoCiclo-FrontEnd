import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { confirmarRetiradaRecompensa, listarResgates } from "../services/recompensaService";

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

function normalizar(resgate) {
  return {
    id: resgate?.id,
    data: formatarData(resgate?.data),
    dataOriginal: resgate?.data || "",
    pontosGastos: Number(resgate?.pontosGastos ?? 0),
    status: resgate?.status || "PENDENTE",
    doadorNome: resgate?.doadorNome || "Doador nao informado",
    recompensaNome: resgate?.recompensaNome || "Recompensa",
    doadorId: resgate?.doadorId || "",
    recompensaId: resgate?.recompensaId || "",
  };
}

export function useRecompensasRetirada() {
  const { user } = useAuth();
  const [resgates, setResgates] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("pendentes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [confirmandoId, setConfirmandoId] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setLoading(true);
      setError("");
      setMensagem("");

      try {
        const lista = await listarResgates();
        const normalizados = Array.isArray(lista) ? lista.map(normalizar) : [];

        if (!ativo) return;

        setResgates(normalizados);
      } catch (err) {
        if (!ativo) return;

        const mensagemErro =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar as recompensas para retirada.";
        setError(mensagemErro);
        setResgates([]);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [reloadKey]);

  async function confirmarRetirada(resgateId) {
    if (!user?.id) {
      setError("Nao foi possivel identificar o administrador logado.");
      return;
    }

    setConfirmandoId(resgateId);
    setError("");
    setMensagem("");

    try {
      await confirmarRetiradaRecompensa(resgateId);
      setMensagem("Retirada confirmada com sucesso.");
      setReloadKey((valor) => valor + 1);
    } catch (err) {
      const mensagemErro =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Nao foi possivel confirmar a retirada.";
      setError(mensagemErro);
    } finally {
      setConfirmandoId("");
    }
  }

  const contagens = useMemo(() => {
    const pendentes = resgates.filter((item) => item.status === "PENDENTE");
    const retiradas = resgates.filter((item) => item.status === "CONCLUIDO");

    return {
      total: pendentes.length,
      pontos: pendentes.reduce((soma, item) => soma + Number(item.pontosGastos || 0), 0),
      retiradas: retiradas.length,
    };
  }, [resgates]);

  const pendentes = useMemo(
    () => resgates.filter((item) => item.status === "PENDENTE"),
    [resgates]
  );

  const retiradas = useMemo(
    () => resgates.filter((item) => item.status === "CONCLUIDO"),
    [resgates]
  );

  const listaAtiva = abaAtiva === "retiradas" ? retiradas : pendentes;

  return {
    resgates,
    pendentes,
    retiradas,
    listaAtiva,
    abaAtiva,
    setAbaAtiva,
    loading,
    error,
    mensagem,
    contagens,
    confirmandoId,
    confirmarRetirada,
    recarregar: () => setReloadKey((valor) => valor + 1),
  };
}
