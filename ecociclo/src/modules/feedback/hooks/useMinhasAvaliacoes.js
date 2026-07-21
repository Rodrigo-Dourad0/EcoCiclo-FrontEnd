import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { listarAvaliacoes } from "../services/avaliacaoService";

function formatarData(valor) {
  if (!valor) return "Data nao informada";

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "Data nao informada";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

function normalizarAvaliacao(avaliacao) {
  const agendamentoId = String(avaliacao.agendamentoId || "");
  const titulo = agendamentoId ? `Agendamento #${agendamentoId.slice(0, 8)}` : "Avaliacao recebida";

  return {
    id: avaliacao.id,
    nota: Number(avaliacao.nota || 0),
    comentario: avaliacao.comentario || "",
    data: formatarData(avaliacao.data),
    dataOriginal: avaliacao.data || "",
    agendamentoId,
    doadorId: avaliacao.doadorId || "",
    coletorId: avaliacao.coletorId || "",
    tipo: "Avaliacao recebida",
    coletor: titulo,
    titulo,
    subtitulo: agendamentoId ? `Vinculada ao agendamento ${agendamentoId.slice(0, 8)}` : "",
  };
}

export function useMinhasAvaliacoes() {
  const { user } = useAuth();
  const [filtroAtivo, setFiltroAtivo] = useState("Todas");
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const recarregar = () => setReloadKey((valor) => valor + 1);

  useEffect(() => {
    let ativo = true;

    async function carregarAvaliacoes() {
      if (!user?.id) {
        setAvaliacoes([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const dados = await listarAvaliacoes();
        const filtradas = dados
          .filter((item) => String(item?.coletorId) === String(user.id))
          .map(normalizarAvaliacao)
          .sort((a, b) => {
            const dataA = a.dataOriginal ? new Date(a.dataOriginal).getTime() : 0;
            const dataB = b.dataOriginal ? new Date(b.dataOriginal).getTime() : 0;
            return dataB - dataA;
          });

        if (ativo) {
          setAvaliacoes(filtradas);
        }
      } catch (erro) {
        if (!ativo) return;
        const mensagem =
          erro.response?.data?.message ||
          erro.response?.data?.error ||
          "Nao foi possivel carregar as avaliacoes.";
        setError(mensagem);
        setAvaliacoes([]);
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarAvaliacoes();

    return () => {
      ativo = false;
    };
  }, [reloadKey, user?.id]);

  const avaliacoesFiltradas = useMemo(() => {
    return avaliacoes.filter((a) => {
      if (filtroAtivo === "Todas") return true;
      if (filtroAtivo === "Com comentario" || filtroAtivo === "Com comentário") return a.comentario.length > 0;

      const match = filtroAtivo.match(/^(\d)/);
      if (match) {
        return a.nota === Number(match[1]);
      }

      return true;
    });
  }, [avaliacoes, filtroAtivo]);

  const resumo = useMemo(() => {
    const total = avaliacoes.length;
    const media = total > 0 ? avaliacoes.reduce((acc, item) => acc + item.nota, 0) / total : 0;

    return {
      total,
      media,
      comentarios: avaliacoes.filter((item) => item.comentario.length > 0).length,
    };
  }, [avaliacoes]);

  return {
    filtroAtivo,
    setFiltroAtivo,
    avaliacoes,
    avaliacoesFiltradas,
    resumo,
    loading,
    error,
    recarregar,
  };
}
