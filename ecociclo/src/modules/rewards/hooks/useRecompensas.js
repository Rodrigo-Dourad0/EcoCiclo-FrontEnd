import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api";
import { listarRecompensas, resgatarRecompensa, listarResgates } from "../services/recompensaService";

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

function mapearCategoria(valor) {
  const texto = String(valor || "").toLowerCase();

  if (texto.includes("voucher") || texto.includes("cupom")) return "Voucher";
  if (texto.includes("produto") || texto.includes("item")) return "Produto";
  if (texto.includes("kit")) return "Kit";
  return valor || "Geral";
}

function emojiDaCategoria(categoria, nome) {
  const texto = `${categoria || ""} ${nome || ""}`.toLowerCase();
  if (texto.includes("voucher") || texto.includes("cupom")) return "🎟️";
  if (texto.includes("produto") || texto.includes("kit")) return "🎁";
  if (texto.includes("sacola")) return "🛍️";
  if (texto.includes("copo")) return "🥤";
  if (texto.includes("composteira") || texto.includes("plant")) return "🌱";
  return "♻️";
}

function corDaCategoria(categoria) {
  const texto = String(categoria || "").toLowerCase();
  if (texto.includes("voucher")) return "verde";
  if (texto.includes("produto")) return "azul";
  if (texto.includes("kit")) return "amarelo";
  return "roxo";
}

function normalizarRecompensa(recompensa, pontosAtuais) {
  const pontos = Number(
    recompensa?.custoPontos ??
      recompensa?.pontos ??
      recompensa?.custo ??
      recompensa?.valorPontos ??
      0
  );
  const quantidade = Number(
    recompensa?.quantidadeDisponivel ??
      recompensa?.quantidade ??
      recompensa?.estoque ??
      recompensa?.stock ??
      0
  );
  const ativa =
    recompensa?.disponivel ??
    recompensa?.ativa ??
    recompensa?.active ??
    (recompensa?.status === "ATIVA" || recompensa?.status === "ativa" || true);

  const disponivel =
    ativa &&
    Number.isFinite(pontos) &&
    pontosAtuais >= pontos &&
    (Number.isFinite(quantidade) ? quantidade > 0 : true);

  const categoria = mapearCategoria(recompensa?.categoria ?? recompensa?.tipo ?? recompensa?.grupo);

  return {
    id: recompensa?.id,
    nome: recompensa?.nome || recompensa?.titulo || "Recompensa",
    desc: recompensa?.descricao || recompensa?.descricaoCurta || "Sem descrição cadastrada.",
    categoria,
    emoji: recompensa?.emoji || emojiDaCategoria(categoria, recompensa?.nome || recompensa?.titulo),
    cor: recompensa?.cor || corDaCategoria(categoria),
    custo: pontos,
    quantidade,
    imagem: recompensa?.imagem || recompensa?.foto || recompensa?.urlImagem || "",
    status: disponivel ? "disponivel" : "bloqueado",
    ativa,
  };
}

function calcularProximoNivel(pontosAtuais) {
  const base = 500;
  return Math.max(base, Math.ceil((pontosAtuais + 1) / base) * base);
}

export function useRecompensas() {
  const { user, refreshUser } = useAuth();
  const [pontosAtuais, setPontosAtuais] = useState(0);
  const [recompensas, setRecompensas] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas as categorias");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [resgatandoId, setResgatandoId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const recarregar = () => setReloadKey((valor) => valor + 1);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setLoading(true);
      setError("");
      setMensagem("");

      try {
        const [recompensasResponse, usuarioResponse] = await Promise.all([
          listarRecompensas(),
          api.get("/api/usuarios/me").catch(() => null),
        ]);

        const usuarioAtual = usuarioResponse?.data || user || {};
        const pontos = extrairPontos(usuarioAtual);
        
        const resgatesResponse = usuarioAtual.id 
          ? await listarResgates({ doadorId: usuarioAtual.id }).catch(() => []) 
          : [];
        
        const resgatadosIds = new Set(
          Array.isArray(resgatesResponse) ? resgatesResponse.map(r => r.recompensaId || r.recompensa?.id).filter(Boolean) : []
        );

        const lista = Array.isArray(recompensasResponse)
          ? recompensasResponse.map((item) => {
              const norm = normalizarRecompensa(item, pontos);
              if (resgatadosIds.has(norm.id)) {
                norm.status = "resgatado";
              }
              return norm;
            })
          : [];

        if (!ativo) return;

        setPontosAtuais(pontos);
        setRecompensas(lista);
      } catch (err) {
        if (!ativo) return;

        const mensagem =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar as recompensas.";
        setError(mensagem);
        setRecompensas([]);
        setPontosAtuais(extrairPontos(user));
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [reloadKey, user]);

  async function resgatar(item) {
    if (!user?.id) {
      setError("Nao foi possivel identificar o doador logado.");
      return;
    }

    if (!item?.id) return;

    setResgatandoId(item.id);
    setError("");
    setMensagem("");

    try {
      await resgatarRecompensa(item.id, { doadorId: user.id });
      await refreshUser?.();
      setMensagem("Resgate realizado. A recompensa ficou aguardando retirada.");
      recarregar();
    } catch (err) {
      const mensagemErro =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Nao foi possivel resgatar a recompensa.";
      setError(mensagemErro);
    } finally {
      setResgatandoId("");
    }
  }

  const categoriasDisponiveis = useMemo(() => {
    const categoriasUnicas = [...new Set(recompensas.map((item) => item.categoria).filter(Boolean))];
    return ["Todas as categorias", ...categoriasUnicas];
  }, [recompensas]);

  const recompensasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return recompensas.filter((item) => {
      if (item.status === "resgatado") return false;

      const passaCategoria =
        categoria === "Todas as categorias" || item.categoria === categoria;

      const passaBusca =
        !termo ||
        [item.nome, item.desc, item.categoria]
          .filter(Boolean)
          .some((campo) => campo.toString().toLowerCase().includes(termo));

      return passaCategoria && passaBusca;
    });
  }, [busca, categoria, recompensas]);

  const disponiveis = useMemo(
    () => recompensas.filter((item) => item.status === "disponivel").length,
    [recompensas]
  );

  return {
    pontosAtuais,
    recompensas,
    recompensasFiltradas,
    categoriasDisponiveis,
    disponiveis,
    busca,
    setBusca,
    categoria,
    setCategoria,
    loading,
    error,
    mensagem,
    resgatandoId,
    resgatar,
    recarregar,
  };
}
