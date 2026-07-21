import { useEffect, useMemo, useState } from "react";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../context/AuthContext";
import { listarAvaliacoes } from "../../feedback/services/avaliacaoService";

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

  if (endereco.completo) {
    return endereco.completo;
  }

  if (endereco.enderecoCompleto) {
    return endereco.enderecoCompleto;
  }

  if (endereco.endereco_completo) {
    return endereco.endereco_completo;
  }

  if (endereco.descricao) {
    return endereco.descricao;
  }

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
  const dataColetaFormatada = formatarData(agendamento.dataColeta);

  return {
    id: agendamento.id,
    status: agendamento.status || "PENDENTE",
    statusLabel: agendamento.status || "PENDENTE",
    statusClass:
      agendamento.status === "CONCLUIDO"
        ? "mc-badge--coletadas"
        : agendamento.status === "CANCELADO"
          ? "mc-badge--canceladas"
          : agendamento.status === "CONFIRMADO" ||
              agendamento.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
            ? "mc-badge--aceitas"
            : "mc-badge--agendadas",
    dataColeta: agendamento.dataColeta || null,
    dataColetaFormatada,
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

function determinarAba(status) {
  if (status === "CONFIRMADO" || status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR") return "aceitas";
  if (status === "CONCLUIDO") return "coletadas";
  if (status === "CANCELADO") return "canceladas";
  return "agendadas";
}

function rotuloStatus(status) {
  if (status === "PENDENTE") return "Agendada";
  if (status === "CONFIRMADO") return "Aceita";
  if (status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR") return "Aguardando confirmacao";
  if (status === "CONCLUIDO") return "Coletada";
  if (status === "CANCELADO") return "Cancelada";
  return status || "Agendada";
}

async function buscarAgendamentosDoUsuario(userId) {
  const rotas = ["/api/agendamentos", "/api/agendamentos/pendentes"];
  let ultimoErro = null;

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      const dados = Array.isArray(response.data) ? response.data : [];
      return dados.filter((item) => String(item?.doadorId) === String(userId));
    } catch (erro) {
      ultimoErro = erro;
    }
  }

  throw ultimoErro || new Error("Nao foi possivel carregar suas doacoes.");
}

async function buscarEnderecoPorId(enderecoId, doadorId) {
  const rotas = [
    `/api/enderecos/${enderecoId}`,
    `/api/endereco/${enderecoId}`,
  ];

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      if (response.data) {
        return normalizarEndereco(response.data);
      }
    } catch {
      // Tenta a próxima rota
    }
  }

  if (doadorId) {
    try {
      const response = await api.get(`/api/usuarios/${doadorId}`);
      const usuario = response.data || {};
      const enderecoUsuario = usuario.endereco || usuario.enderecoPrincipal || usuario.enderecoEntrega;

      if (!enderecoUsuario) {
        return null;
      }

      if (!enderecoId || !enderecoUsuario.id || String(enderecoUsuario.id) === String(enderecoId)) {
        return normalizarEndereco(enderecoUsuario);
      }
    } catch {
      return null;
    }
  }

  return null;
}

export function useMinhasDoacoes() {
  const { user, refreshUser } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("agendadas");
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
      if (!user?.id) {
        setAgendamentos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const dados = await buscarAgendamentosDoUsuario(user.id);

        const listaBase = dados
          .filter((item) => String(item?.doadorId) === String(user.id))
          .map(mapearAgendamento);

        const idsColetores = [...new Set(listaBase.map((item) => item.coletorId).filter(Boolean))];
        const idsEnderecos = [...new Set(listaBase.map((item) => item.enderecoId).filter(Boolean))];
        const coletores = new Map();
        const enderecos = new Map();
        let avaliacoesDoUsuario = [];

        await Promise.all(
          idsColetores.map(async (coletorId) => {
            try {
              const respostaUsuario = await api.get(`/api/usuarios/${coletorId}`);
              coletores.set(coletorId, mapearUsuario(respostaUsuario.data, coletorId));
            } catch {
              coletores.set(coletorId, mapearUsuario(null, coletorId));
            }
          })
        );

        try {
          const avaliacoes = await listarAvaliacoes();
          avaliacoesDoUsuario = avaliacoes.filter(
            (item) => String(item?.doadorId) === String(user.id)
          );
        } catch {
          avaliacoesDoUsuario = [];
        }

        const avaliacoesPorAgendamento = new Map(
          avaliacoesDoUsuario.map((avaliacao) => [String(avaliacao.agendamentoId), avaliacao])
        );

        await Promise.all(
          idsEnderecos.map(async (enderecoId) => {
            const agendamentoBase = listaBase.find((item) => String(item.enderecoId) === String(enderecoId));
            const endereco = await buscarEnderecoPorId(enderecoId, agendamentoBase?.doadorId || user.id);

            if (endereco) {
              enderecos.set(enderecoId, endereco);
            }
          })
        );

        const lista = listaBase.map((agendamento) => ({
          ...agendamento,
          coletor: coletores.get(agendamento.coletorId) || mapearUsuario(null, agendamento.coletorId),
          endereco:
            enderecos.get(agendamento.enderecoId) ||
            normalizarEndereco(agendamento.endereco) ||
            agendamento.doador.endereco,
          statusLabel: rotuloStatus(agendamento.status),
          aba: determinarAba(agendamento.status),
          avaliacaoId: avaliacoesPorAgendamento.get(String(agendamento.id))?.id || null,
          jaAvaliado: avaliacoesPorAgendamento.has(String(agendamento.id)),
        }));

        if (ativo) {
          setAgendamentos(lista);
        }
      } catch (err) {
        if (!ativo) return;

        const mensagem =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Nao foi possivel carregar suas doacoes.";
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
  }, [reloadKey, user?.id]);

  async function confirmarColeta(agendamentoId) {
    if (!user?.id) {
      setError("Nao foi possivel identificar o doador logado.");
      return;
    }

    setAcaoEmAndamentoId(agendamentoId);
    setAcaoMensagem("");
    setError("");

    try {
      await api.put(`/api/agendamentos/${agendamentoId}/concluir`);
      await refreshUser?.();
      setAcaoMensagem("Coleta concluida e pontos computados com sucesso.");
      recarregar();
    } catch (erro) {
      const mensagem =
        erro.response?.data?.message ||
        erro.response?.data?.error ||
        "Nao foi possivel concluir a coleta.";
      setError(mensagem);
    } finally {
      setAcaoEmAndamentoId("");
    }
  }

  const contagens = useMemo(() => {
    return {
      agendadas: agendamentos.filter((agendamento) => agendamento.aba === "agendadas").length,
      aceitas: agendamentos.filter((agendamento) => agendamento.aba === "aceitas").length,
      coletadas: agendamentos.filter((agendamento) => agendamento.aba === "coletadas").length,
      canceladas: agendamentos.filter((agendamento) => agendamento.aba === "canceladas").length,
    };
  }, [agendamentos]);

  const doacoesFiltradas = useMemo(() => {
    return agendamentos.filter((agendamento) => agendamento.aba === abaAtiva);
  }, [agendamentos, abaAtiva]);

  return {
    abaAtiva,
    setAbaAtiva,
    doacoesFiltradas,
    contagens,
    loading,
    error,
    acaoMensagem,
    acaoEmAndamentoId,
    confirmarColeta,
    recarregar,
  };
}
