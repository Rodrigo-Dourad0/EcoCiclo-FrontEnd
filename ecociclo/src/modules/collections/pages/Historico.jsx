import { useMemo } from "react";
import { Calendar, MapPin, Package, RefreshCw, Weight, AlertCircle } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation";
import { useHistorico } from "../hooks/useHistorico";
import "../styles/MinhasDoacoes.css";
import "../styles/Historico.css";

const IconBox = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

function getBadgeClass(statusLabel) {
  if (statusLabel === "Coletada") return "badge badge-coletada";
  if (statusLabel === "Cancelada") return "badge badge-cancelada";
  return "badge badge-agendada";
}

function CardDoacao({ doacao, delay }) {
  const temRodape = doacao.pontosGerados > 0 || doacao.coletorId;

  return (
    <article className="coleta-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="coleta-card-header">
        <div className="coleta-tipo-row">
          <div className="icone-material">
            <IconBox />
          </div>
          <span className="coleta-tipo">{doacao.doacao?.nome || "Doacao"}</span>
        </div>

        <span className={getBadgeClass(doacao.statusLabel)}>{doacao.statusLabel}</span>
      </div>

      <div className="coleta-detalhes">
        <div className="detalhe-row">
          <Calendar size={13} />
          {doacao.data}
        </div>

        <div className="detalhe-row">
          <MapPin size={13} />
          {doacao.endereco?.completo || "Endereco nao informado"}
        </div>

        <div className="detalhe-row">
          <Weight size={13} />
          Peso estimado: {doacao.doacao?.peso != null ? `${doacao.doacao.peso} kg` : "Nao informado"}
        </div>
      </div>

      {temRodape && (
        <>
          <div className="coleta-divider" />

          <div className="coleta-card-footer">
            {doacao.status === "CONCLUIDO" ? (
              <span className="pontos-badge">+{doacao.pontosGerados} pontos</span>
            ) : (
              <span />
            )}

            <span className="coletor-info">
              {doacao.coletorId ? `Coletor: ${doacao.coletor?.nome || "Nao informado"}` : "Aguardando coletor"}
            </span>
          </div>
        </>
      )}
    </article>
  );
}

export default function Historico() {
  const {
    statusFiltro,
    setStatusFiltro,
    periodoFiltro,
    setPeriodoFiltro,
    statusOptions,
    historicoFiltrado,
    contagens,
    loading,
    error,
    recarregar,
  } = useHistorico();

  const filtrosPeriodo = useMemo(
    () => [
      { value: "Todos os periodos", label: "Todos os periodos" },
      { value: "Ultimo mes", label: "Ultimo mes" },
      { value: "Ultimos 3 meses", label: "Ultimos 3 meses" },
      { value: "Este ano", label: "Este ano" },
    ],
    []
  );

  return (
    <div className="app-container">
      <Navigation />

      <main className="historico-main">
        <div className="historico-container">
          <header className="historico-header">
            <div>
              <p className="mc-kicker">Historico</p>
              <h1>Historico de doacoes</h1>
              <h5>Acompanhe o que ja foi agendado, aceito, concluido ou cancelado no seu perfil.</h5>
            </div>

            <button type="button" className="mc-recarregar-btn" onClick={recarregar}>
              <RefreshCw size={14} />
              Atualizar
            </button>
          </header>

          <section className="mc-abas" style={{ marginBottom: 18 }}>
            <div className="mc-aba">
              <span className="mc-aba-label">Total</span>
              <span className="mc-aba-count mc-aba-count--ativa">{contagens.total}</span>
            </div>
            <div className="mc-aba">
              <span className="mc-aba-label">Coletadas</span>
              <span className="mc-aba-count mc-aba-count--ativa">{contagens.coletadas}</span>
            </div>
            <div className="mc-aba">
              <span className="mc-aba-label">Em andamento</span>
              <span className="mc-aba-count mc-aba-count--ativa">{contagens.emAndamento}</span>
            </div>
            <div className="mc-aba">
              <span className="mc-aba-label">Canceladas</span>
              <span className="mc-aba-count mc-aba-count--ativa">{contagens.canceladas}</span>
            </div>
          </section>

          <div className="filtros-wrapper">
            <select className="filtro-select" value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)}>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <select className="filtro-select" value={periodoFiltro} onChange={(e) => setPeriodoFiltro(e.target.value)}>
              {filtrosPeriodo.map((periodo) => (
                <option key={periodo.value} value={periodo.value}>
                  {periodo.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mc-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="mc-recarregar-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <Package size={60} strokeWidth={1.3} />
              <p>Carregando historico.</p>
              <span>Estamos buscando as doacoes do seu perfil.</span>
            </div>
          ) : historicoFiltrado.length === 0 ? (
            <div className="empty-state">
              <Package size={60} strokeWidth={1.3} />
              <p>Nenhuma doacao encontrada</p>
              <span>Ajuste os filtros ou aguarde novos agendamentos entrarem no sistema.</span>
            </div>
          ) : (
            <div className="historico-lista">
              {historicoFiltrado.map((d, i) => (
                <CardDoacao key={d.id} doacao={d} delay={i * 55} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
