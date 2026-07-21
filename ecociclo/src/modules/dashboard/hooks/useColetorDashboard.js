import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../shared/services/api";
import { listarAvaliacoes } from "../../feedback/services/avaliacaoService";

function formatarData(valor) {
  if (!valor) return "Data não informada";
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return "Data não informada";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(data);
}

function normalizarEndereco(endereco) {
  if (!endereco) return "Endereço não informado";
  if (typeof endereco === "string") return endereco;
  if (endereco.completo) return endereco.completo;
  if (endereco.enderecoCompleto) return endereco.enderecoCompleto;
  
  const partes = [
    endereco.logradouro,
    endereco.rua,
    endereco.numero,
    endereco.bairro,
    endereco.cidade,
    endereco.municipio
  ].filter(Boolean);
  
  return partes.length > 0 ? partes.join(", ") : "Endereço não informado";
}

async function buscarEnderecoPorId(enderecoId, doadorId) {
  if (!enderecoId) return null;
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
  return null;
}

export function useColetorDashboard() {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [avaliacaoReal, setAvaliacaoReal] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!user?.id) {
        setAgendamentos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await api.get("/api/agendamentos");
        const dados = Array.isArray(response.data) ? response.data : [];
        const minhasColetas = dados.filter((item) => String(item?.coletorId) === String(user.id));
        
        const agendamentosMapeados = await Promise.all(minhasColetas.map(async (agendamento) => {
            const doacao = agendamento?.doacao || {};
            let enderecoCompleto = "Endereço não informado";
            let doadorNome = "Doador não informado";
            
            if (agendamento.doadorId) {
                try {
                    const doadorResp = await api.get(`/api/usuarios/${agendamento.doadorId}`);
                    doadorNome = doadorResp.data?.nome || doadorResp.data?.nomeCompleto || doadorResp.data?.razaoSocial || "Doador não informado";
                    
                    if (!agendamento.enderecoId && doadorResp.data?.endereco) {
                         enderecoCompleto = normalizarEndereco(doadorResp.data.endereco);
                    }
                } catch(e) {}
            }
            
            if (agendamento.enderecoId) {
                const end = await buscarEnderecoPorId(agendamento.enderecoId, agendamento.doadorId);
                if (end) enderecoCompleto = end;
            } else if (agendamento.endereco) {
                enderecoCompleto = normalizarEndereco(agendamento.endereco);
            }

            const status = agendamento?.status || "PENDENTE";
            
            return {
                id: agendamento.id,
                tipo: doacao.nome || "Doação",
                statusLabel: status === "CONCLUIDO" ? "Coletada" : status === "CANCELADO" ? "Cancelada" : "Agendada",
                statusClass: status === "CONCLUIDO" ? "status-coletada" : status === "CANCELADO" ? "status-cancelada" : "status-agendada",
                data: formatarData(agendamento.dataColeta),
                endereco: enderecoCompleto,
                peso: doacao.peso != null ? `${doacao.peso} kg` : "Não informado",
                pesoNumero: Number(doacao.peso) || 0,
                doador: doadorNome,
                statusOriginal: status,
                dataColetaObj: agendamento.dataColeta ? new Date(agendamento.dataColeta) : new Date(0)
            };
        }));
        
        try {
          const avaliacoes = await listarAvaliacoes();
          const filtradas = avaliacoes.filter((avaliacao) => String(avaliacao?.coletorId) === String(user.id));
          const totalAval = filtradas.length;
          const media = totalAval > 0
            ? filtradas.reduce((acc, item) => acc + Number(item.nota || 0), 0) / totalAval
            : 0;
          setAvaliacaoReal(Number(media.toFixed(1)));
        } catch (e) {
          // Fallback to user data if available
          setAvaliacaoReal(user?.avaliacao || 0);
        }
        
        if (!ativo) return;
        
        setAgendamentos(agendamentosMapeados.sort((a, b) => b.dataColetaObj - a.dataColetaObj));
      } catch (err) {
        if (!ativo) return;
        setError("Não foi possível carregar as coletas.");
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregar();
    return () => { ativo = false; };
  }, [reloadKey, user?.id]);

  const { totalColetas, pesoTotal } = useMemo(() => {
    const concluidas = agendamentos.filter((item) => item.statusOriginal === "CONCLUIDO");
    const total = concluidas.length;
    const peso = concluidas.reduce((acc, curr) => acc + curr.pesoNumero, 0);

    return {
      totalColetas: total,
      pesoTotal: peso
    };
  }, [agendamentos]);

  return {
    totalColetas,
    pesoTotal,
    avaliacao: avaliacaoReal,
    coletas: agendamentos,
    loading,
    error,
    saudacao: user?.nome || "Coletor",
    recarregar: () => setReloadKey(k => k + 1)
  };
}
