import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { criarAvaliacao } from "../services/avaliacaoService";

export function useAvaliarColetor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const agendamentoId = searchParams.get("agendamentoId") || "";
  const coletorId = searchParams.get("coletorId") || "";
  const coletorNome = searchParams.get("coletorNome") || "Coletor";

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeRating = hovered || rating;
  const podeEnviar = Boolean(agendamentoId) && rating >= 1 && rating <= 5 && !loading;

  const resumoAgendamento = useMemo(() => {
    if (!agendamentoId) return "Selecione uma doacao concluida para avaliar.";
    return `Agendamento #${String(agendamentoId).slice(0, 8)}`;
  }, [agendamentoId]);

  async function handleSubmit() {
    if (!agendamentoId) {
      setError("Nao foi possivel identificar o agendamento.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Selecione uma nota entre 1 e 5.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await criarAvaliacao({
        nota: rating,
        comentario: comment.trim(),
        agendamentoId,
      });
      setSubmitted(true);
    } catch (erro) {
      const mensagem =
        erro.response?.data?.message ||
        erro.response?.data?.error ||
        "Nao foi possivel enviar sua avaliacao.";
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    setSubmitted(false);
    navigate("/minhas-doacoes");
  }

  function handleGoToDoacoes() {
    navigate("/minhas-doacoes");
  }

  return {
    rating,
    setRating,
    hovered,
    setHovered,
    comment,
    setComment,
    submitted,
    activeRating,
    handleSubmit,
    handleBack,
    handleGoToDoacoes,
    loading,
    error,
    podeEnviar,
    coletorNome,
    coletorId,
    agendamentoId,
    resumoAgendamento,
  };
}
