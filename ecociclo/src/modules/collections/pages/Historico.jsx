// Historico.jsx
import { useState, useMemo } from "react";
import "../styles/Historico.css";
import { coletas, STATUS, PERIODOS } from "../hooks/useHistorico";
import { Navigation } from "../../../shared/components/Navigation/Navigation";

/* ── icones dos cards ────────────────────────────────── */
const IconBox = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconWeight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h12l1 6H5z"/>
    <path d="M5 8l-2 13h18L19 8"/>
    <line x1="12" y1="12" x2="12" y2="18"/>
  </svg>
);

/* ── Helpers ─────────────────────────────────────────── */
function getBadgeClass(status) {
  if (status === STATUS.AGENDADA) return "badge badge-agendada";
  if (status === STATUS.COLETADA) return "badge badge-coletada";
  return "badge badge-cancelada";
}

function filtrarPorPeriodo(coleta, periodo) {
  if (periodo === PERIODOS.TODOS) return true;
  const [dia, mes, ano] = coleta.data.split("/").map(Number);
  const dataColeta = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  if (periodo === PERIODOS.ULTIMO_MES) {
    const ref = new Date(hoje);
    ref.setMonth(hoje.getMonth() - 1);
    return dataColeta >= ref;
  }
  if (periodo === PERIODOS.ULTIMOS_3_MESES) {
    const ref = new Date(hoje);
    ref.setMonth(hoje.getMonth() - 3);
    return dataColeta >= ref;
  }
  if (periodo === PERIODOS.ESTE_ANO) {
    return dataColeta.getFullYear() === hoje.getFullYear();
  }
  return true;
}

/* ── Card de coleta ──────────────────────────────────── */
function CardColeta({ coleta, delay }) {
  const temRodape = coleta.pontos !== null || coleta.coletor;

  return (
    <div className="coleta-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="coleta-card-header">
        <div className="coleta-tipo-row">
          <div className="icone-material">
            <IconBox />
          </div>
          <span className="coleta-tipo">{coleta.tipo}</span>
        </div>
        <span className={getBadgeClass(coleta.status)}>{coleta.status}</span>
      </div>

      <div className="coleta-detalhes">
        <div className="detalhe-row">
          <IconCalendar />
          {coleta.data} às {coleta.horario}
        </div>
        <div className="detalhe-row">
          <IconPin />
          {coleta.endereco}
        </div>
        <div className="detalhe-row">
          <IconWeight />
          Peso estimado: {coleta.pesoEstimado} kg
        </div>
      </div>

      {temRodape && (
        <>
          <div className="coleta-divider" />
          <div className="coleta-card-footer">
            {coleta.pontos !== null
              ? <span className="pontos-badge">+{coleta.pontos} pontos</span>
              : <span />
            }
            <span className="coletor-info">Coletor: {coleta.coletor}</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Tela principal ──────────────────────────────────── */
export default function Historico() {
  const [statusFiltro, setStatusFiltro] = useState("Todos os status");
  const [periodoFiltro, setPeriodoFiltro] = useState(PERIODOS.TODOS);

  const coletasFiltradas = useMemo(() => {
    return coletas.filter((c) => {
      const passaStatus =
        statusFiltro === "Todos os status" || c.status === statusFiltro;
      const passaPeriodo = filtrarPorPeriodo(c, periodoFiltro);
      return passaStatus && passaPeriodo;
    });
  }, [statusFiltro, periodoFiltro]);

  return (
    <div className="app-container">
      <Navigation />

      <main className="historico-main">
        <div className="historico-container">

          {/* Header */}
          <header className="historico-header">
            <h1>Histórico</h1>
          </header>

          {/* Filtros */}
          <div className="filtros-wrapper">
            <select
              className="filtro-select"
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option>Todos os status</option>
              <option>{STATUS.AGENDADA}</option>
              <option>{STATUS.COLETADA}</option>
              <option>{STATUS.CANCELADA}</option>
            </select>

            <select
              className="filtro-select"
              value={periodoFiltro}
              onChange={(e) => setPeriodoFiltro(e.target.value)}
            >
              {Object.values(PERIODOS).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Lista ou empty state */}
          {coletasFiltradas.length === 0 ? (
            <div className="empty-state">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <p>Nenhuma coleta encontrada</p>
              <span>Tente ajustar os filtros</span>
            </div>
          ) : (
            <div className="historico-lista">
              {coletasFiltradas.map((c, i) => (
                <CardColeta key={c.id} coleta={c} delay={i * 55} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}