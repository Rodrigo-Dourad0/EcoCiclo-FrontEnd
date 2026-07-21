import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api";

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
  if (endereco.descricao) return endereco.descricao;

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

function normalizarAgendamento(agendamento) {
  const doacao = agendamento.doacao || {};

  return {
    id: agendamento.id,
    status: agendamento.status || "CONFIRMADO",
    statusLabel: agendamento.status || "CONFIRMADO",
    statusClass: agendamento.status === "CONCLUIDO" ? "mc-badge--concluida" : "mc-badge--ativa",
    dataColeta: agendamento.dataColeta || null,
    dataColetaFormatada: formatarData(agendamento.dataColeta),
    observacoes: agendamento.observacoes || "",
    pontosGerados: Number(agendamento.pontosGerados ?? 0),
    doadorId: agendamento.doadorId || "",
    coletorId: agendamento.coletorId || null,
    enderecoId: agendamento.enderecoId || "",
    doador: mapearUsuario(agendamento.doador, agendamento.doadorId),
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
  return status === "CONCLUIDO" ? "concluidas" : "aceitas";
}

function rotuloStatus(status) {
  if (status === "CONCLUIDO") return "Concluida";
  if (status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR") return "Aguardando confirmacao";
  if (status === "CONFIRMADO") return "Aceita";
  if (status === "PENDENTE") return "Pendente";
  if (status === "CANCELADO") return "Cancelada";
  return status || "Aceita";
}

async function listarDoColetor(coletorId) {
  const rotas = [
    `/api/agendamentos/coletor/${coletorId}`,
    `/api/agendamentos?coletorId=${coletorId}`,
  ];

  let ultimoErro = null;

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      return Array.isArray(response.data) ? response.data : [];
    } catch (erro) {
      ultimoErro = erro;
    }
  }

  throw ultimoErro || new Error("Nao foi possivel carregar as coletas.");
}

async function buscarEnderecoPorId(enderecoId, doadorId) {
  const rotas = [
    `/api/enderecos/${enderecoId}`,
    `/api/endereco/${enderecoId}`,
  ];

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      if (response.data) return normalizarEndereco(response.data);
    } catch {
      // continua
    }
  }

  if (doadorId) {
    try {
      const response = await api.get(`/api/usuarios/${doadorId}`);
      const usuario = response.data || {};
      const enderecoUsuario = usuario.endereco || usuario.enderecoPrincipal || usuario.enderecoEntrega;
      if (enderecoUsuario && (!enderecoId || !enderecoUsuario.id || String(enderecoUsuario.id) === String(enderecoId))) {
        return normalizarEndereco(enderecoUsuario);
      }
    } catch {
      // continua
    }
  }

  return null;
}

export function useMinhasColetas() {
  const { user } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("aceitas");
  const [coletas, setColetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!user?.id) {
        setColetas([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const dados = await listarDoColetor(user.id);
        const listaBase = dados
          .filter((item) => String(item?.coletorId) === String(user.id))
          .map(normalizarAgendamento);

        const idsDoadores = [...new Set(listaBase.map((item) => item.doadorId).filter(Boolean))];
        const idsEnderecos = [...new Set(listaBase.map((item) => item.enderecoId).filter(Boolean))];
        const doadores = new Map();
        const enderecos = new Map();

        await Promise.all(
          idsDoadores.map(async (doadorId) => {
            try {
              const response = await api.get(`/api/usuarios/${doadorId}`);
              doadores.set(doadorId, mapearUsuario(response.data, doadorId));
            } catch {
              doadores.set(doadorId, mapearUsuario(null, doadorId));
            }
          })
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

        const lista = listaBase.map((agendamento) => {
          const doador = doadores.get(agendamento.doadorId) || mapearUsuario(null, agendamento.doadorId);
          const endereco =
            enderecos.get(agendamento.enderecoId) ||
            normalizarEndereco(agendamento.endereco) ||
            doador.endereco;

          return {
            ...agendamento,
            doador,
            endereco,
            etapa:
              agendamento.status === "CONCLUIDO"
                ? "Coleta finalizada"
                : agendamento.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
                  ? "Aguardando confirmacao do doador"
                  : "Coleta aceita",
            destaque:
              agendamento.status === "CONCLUIDO"
                ? "Finalizada"
                : agendamento.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
                  ? "Retirada concluida"
                  : "Em andamento",
            statusLabel: rotuloStatus(agendamento.status),
            statusClass: agendamento.status === "CONCLUIDO" ? "mc-badge--concluida" : "mc-badge--ativa",
            aba: determinarAba(agendamento.status),
          };
        });

        if (ativo) {
          setColetas(lista);
        }
      } catch (erro) {
        if (!ativo) return;

        const mensagem =
          erro.response?.data?.message ||
          erro.response?.data?.error ||
          "Nao foi possivel carregar suas coletas.";
        setError(mensagem);
        setColetas([]);
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
  }, [reloadKey, user?.id]);

  const contagens = useMemo(() => {
    return {
      aceitas: coletas.filter((coleta) => coleta.aba === "aceitas").length,
      concluidas: coletas.filter((coleta) => coleta.aba === "concluidas").length,
    };
  }, [coletas]);

  const resumo = useMemo(() => {
    const aceitas = coletas.filter((coleta) => coleta.aba === "aceitas");
    const concluidas = coletas.filter((coleta) => coleta.aba === "concluidas");

    return {
      total: coletas.length,
      emAndamento: aceitas.length,
      finalizadas: concluidas.length,
    };
  }, [coletas]);

  const coletasFiltradas = useMemo(
    () => coletas.filter((coleta) => coleta.aba === abaAtiva),
    [coletas, abaAtiva]
  );

  return {
    abaAtiva,
    setAbaAtiva,
    coletasFiltradas,
    contagens,
    resumo,
    loading,
    error,
    recarregar: () => setReloadKey((valor) => valor + 1),
  };
}
