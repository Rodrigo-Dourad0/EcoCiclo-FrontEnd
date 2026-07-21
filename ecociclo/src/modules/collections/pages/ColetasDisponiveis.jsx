import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Package,
  MapPin,
  Clock,
  Weight,
  User,
  CheckCircle,
  Info,
  X,
  Phone,
  FileText,
  Hash,
  Image,
  Calendar,
  RefreshCw,
  AlertCircle,
  Zap,
} from "lucide-react";

import { Navigation } from "../../../shared/components/Navigation/Navigation";
import { useAuth } from "../../../context/AuthContext";
import useColetasDisponiveis from "../hooks/useColetasDisponiveis";
import "../styles/ColetasDisponiveis.css";

function formatarEnderecoCurto(endereco) {
  if (!endereco) return "Endereco nao informado";

  const partes = [endereco.logradouro, endereco.bairro, endereco.cidade].filter(Boolean);
  if (partes.length === 0) return "Endereco nao informado";

  return partes.join(" - ");
}

function ColetaCard({ coleta, onAbrirDetalhes, onAceitar, aceitando, index }) {
  const podeAceitar = coleta.status === "PENDENTE";

  return (
    <article className="cd-card" style={{ animationDelay: `${index * 65}ms` }}>
      <div className="cd-stripe" />

      <div className="cd-card-inner">
        <div className="cd-card-header">
          <div className="cd-card-title">
            <div className="cd-material-icon">
              <Package size={18} />
            </div>
            <div>
              <h3>{coleta.doacao.nome}</h3>
              <span className="cd-card-desc">
                {coleta.observacoes || "Sem observacoes adicionais."}
              </span>
            </div>
          </div>
          <div className={`cd-status ${coleta.statusClass || ""}`}>
            <CheckCircle size={12} />
            {coleta.statusLabel || coleta.status}
          </div>
        </div>

        <div className="cd-divider" />

        <div className="cd-info">
          <div className="cd-info-item">
            <User size={15} className="cd-info-icon" />
            <div>
              <span className="cd-info-label">Doador</span>
              <span className="cd-info-value">{coleta.doador.nome}</span>
            </div>
          </div>
          <div className="cd-info-item">
            <Weight size={15} className="cd-info-icon" />
            <div>
              <span className="cd-info-label">Peso estimado</span>
              <span className="cd-info-value">
                {coleta.doacao.peso != null ? `${coleta.doacao.peso} kg` : "Nao informado"}
              </span>
            </div>
          </div>
          <div className="cd-info-item">
            <Clock size={15} className="cd-info-icon" />
            <div>
              <span className="cd-info-label">Data e horario</span>
              <span className="cd-info-value">{coleta.dataColetaFormatada}</span>
            </div>
          </div>
          <div className="cd-info-item">
            <MapPin size={15} className="cd-info-icon" />
            <div>
              <span className="cd-info-label">Endereco</span>
              <span className="cd-info-value">{formatarEnderecoCurto(coleta.endereco)}</span>
            </div>
          </div>
        </div>

        <div className="cd-footer">
          <button className="cd-btn-detalhes" onClick={() => onAbrirDetalhes(coleta)}>
            <Info size={14} />
            Detalhes
          </button>
          {podeAceitar && (
            <button
              className="cd-btn cd-btn--aceitar"
              onClick={() => onAceitar(coleta.id)}
              disabled={aceitando}
              type="button"
            >
              <CheckCircle size={14} />
              {aceitando ? "Aceitando..." : "Aceitar coleta"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function DetalhesModal({ coleta, onFechar, onAceitar, aceitando }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onFechar();
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onFechar]);

  if (!coleta) return null;

  return (
    <div className="cd-modal-overlay" onClick={onFechar}>
      <div className="cd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cd-modal-header">
          <div className="cd-modal-header-left">
            <div className="cd-modal-icon">
              <Package size={22} />
            </div>
            <div>
              <h2>{coleta.doacao.nome}</h2>
              <span className="cd-modal-id">
                <Hash size={11} />
                {coleta.id}
              </span>
            </div>
          </div>
          <button className="cd-modal-close" onClick={onFechar} aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <div className="cd-modal-scroll">
          <div className="cd-modal-status-row cd-modal-status-row--top">
            <span className={`cd-modal-status ${coleta.statusClass || ""}`}>
              <CheckCircle size={12} />
              {coleta.statusLabel || coleta.status}
            </span>
            <span className="cd-modal-categoria">Agendamento real do sistema</span>
          </div>

          <div className="cd-modal-divider" />

          <div className="cd-modal-body">
            <div className="cd-modal-row">
              <div className="cd-modal-item">
                <User size={15} className="cd-modal-item-icon" />
                <div>
                  <span className="cd-modal-item-label">Doador</span>
                  <span className="cd-modal-item-value">{coleta.doador.nome}</span>
                </div>
              </div>
              <div className="cd-modal-item">
                <Phone size={15} className="cd-modal-item-icon" />
                <div>
                  <span className="cd-modal-item-label">Telefone</span>
                  <span className="cd-modal-item-value">{coleta.doador.telefone}</span>
                </div>
              </div>
            </div>

            <div className="cd-modal-row">
              <div className="cd-modal-item">
                <Calendar size={15} className="cd-modal-item-icon" />
                <div>
                  <span className="cd-modal-item-label">Data e horario</span>
                  <span className="cd-modal-item-value">{coleta.dataColetaFormatada}</span>
                </div>
              </div>
              <div className="cd-modal-item">
                <Weight size={15} className="cd-modal-item-icon" />
                <div>
                  <span className="cd-modal-item-label">Peso estimado</span>
                  <span className="cd-modal-item-value">
                    {coleta.doacao.peso != null ? `${coleta.doacao.peso} kg` : "Nao informado"}
                  </span>
                </div>
              </div>
            </div>

            <div className="cd-modal-item cd-modal-item--full">
              <MapPin size={15} className="cd-modal-item-icon" />
              <div>
                <span className="cd-modal-item-label">Endereco completo</span>
                <span className="cd-modal-item-value">{coleta.endereco.completo}</span>
              </div>
            </div>

            <div className="cd-modal-item cd-modal-item--full">
              <FileText size={15} className="cd-modal-item-icon" />
              <div>
                <span className="cd-modal-item-label">Observacoes</span>
                <span className="cd-modal-item-value">
                  {coleta.observacoes || "Nenhuma observacao registrada."}
                </span>
              </div>
            </div>

            <div className="cd-modal-fotos">
              <span className="cd-modal-fotos-label">
                <Image size={12} />
                Imagem da doacao
              </span>
              {coleta.doacao.imagem ? (
                <div className="cd-modal-fotos-grid">
                  <img src={coleta.doacao.imagem} alt={`Doacao ${coleta.doacao.nome}`} />
                </div>
              ) : (
                <div className="cd-modal-fotos-empty">
                  <Image size={28} strokeWidth={1.2} />
                  <span>Sem imagem cadastrada</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {coleta.status === "PENDENTE" && (
          <div className="cd-modal-actions">
            <button
              className="cd-modal-btn cd-modal-btn--aceitar"
              onClick={() => onAceitar(coleta.id)}
              disabled={aceitando}
            >
              <CheckCircle size={14} />
              {aceitando ? "Aceitando..." : "Aceitar coleta"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ColetasDisponiveis() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const {
    busca,
    setBusca,
    agendamentosFiltrados,
    totalAgendamentos,
    totalFiltrados,
    loading,
    error,
    acaoMensagem,
    acaoEmAndamentoId,
    aceitarColeta,
    recarregar,
  } = useColetasDisponiveis();

  const [coletaDetalhes, setColetaDetalhes] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    const perfil = user?.perfil?.toUpperCase();
    const ehColetor = perfil === "COLETOR" || perfil === "ASSOCIACAO";

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (!ehColetor) {
      navigate(perfil === "ADMINISTRADOR" ? "/admin-dashboard" : "/dashboard", {
        replace: true,
      });
    }
  }, [authLoading, navigate, user]);

  if (authLoading) {
    return (
      <div className="cd-page">
        <main className="cd-main">
          <div className="cd-container">
            <header className="cd-header">
              <p className="cd-kicker">
                <Zap size={13} />
                Coletor
              </p>
              <h1>Coletas Disponiveis</h1>
              <p className="cd-header-sub">Carregando seu acesso...</p>
            </header>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cd-page">
      <Navigation />

      <main className="cd-main">
        <div className="cd-container">
          <header className="cd-header">
            <p className="cd-kicker">
              <Zap size={13} />
              Coletor
            </p>
            <h1>Coletas Disponiveis</h1>
            <p className="cd-header-sub">
              Agendamentos pendentes carregados diretamente do sistema.
            </p>
          </header>

          <section className="cd-resumo">
            <div className="cd-resumo-card">
              <div className="cd-resumo-icon">
                <Package size={22} />
              </div>
              <div>
                <strong>{totalAgendamentos}</strong>
                <span>Total de agendamentos</span>
              </div>
            </div>
            <div className="cd-resumo-card cd-resumo-card--destaque">
              <div className="cd-resumo-icon cd-resumo-icon--destaque">
                <CheckCircle size={22} />
              </div>
              <div>
                <strong>{totalFiltrados}</strong>
                <span>Exibidos na busca</span>
              </div>
            </div>
          </section>

          <div className="cd-search">
            <Search size={17} className="cd-search-icon" />
            <input
              type="text"
              placeholder="Pesquisar por doador, endereco, observacao ou ID..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {error && (
            <div className="cd-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="cd-btn-detalhes" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          {acaoMensagem && !error && (
            <div className="cd-alerta cd-alerta--sucesso">
              <CheckCircle size={16} />
              <span>{acaoMensagem}</span>
            </div>
          )}

          <section className="cd-lista">
            {loading ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">
                  <Package size={40} strokeWidth={1.2} />
                </div>
                <h3>Carregando agendamentos</h3>
                <span>Aguarde enquanto buscamos os dados do sistema.</span>
              </div>
            ) : agendamentosFiltrados.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">
                  <Package size={40} strokeWidth={1.2} />
                </div>
                <h3>Nenhum agendamento encontrado</h3>
                <span>Tente ajustar a busca ou aguarde novos agendamentos pendentes.</span>
              </div>
            ) : (
              agendamentosFiltrados.map((coleta, index) => (
                <ColetaCard
                  key={coleta.id}
                  coleta={coleta}
                  index={index}
                  onAbrirDetalhes={setColetaDetalhes}
                  onAceitar={aceitarColeta}
                  aceitando={acaoEmAndamentoId === coleta.id}
                />
              ))
            )}
          </section>
        </div>
      </main>

      <DetalhesModal
        coleta={coletaDetalhes}
        onFechar={() => setColetaDetalhes(null)}
        onAceitar={aceitarColeta}
        aceitando={acaoEmAndamentoId === coletaDetalhes?.id}
      />
    </div>
  );
}
