import '../styles/DetalhesColeta.css';
import { useNavigate } from 'react-router-dom';
import { useDetalhesColeta, statusConfig, tabLabels } from '../hooks/useDetalhesColeta';

// ─── INFO ROW ─────────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <div className="dc-info-row">
      <span className="dc-info-icon">{icon}</span>
      <div>
        <div className="dc-info-label">{label}</div>
        <div className="dc-info-value">{value}</div>
      </div>
    </div>
  );
}

// ─── MATERIAL CARD ────────────────────────────────────────────────────────────
function MaterialCard({ coleta }) {
  return (
    <div className="dc-card">
      <div className="dc-mat-header">
        <div className="dc-mat-icon">{coleta.icon}</div>
        <div>
          <div className="dc-mat-name">{coleta.material}</div>
          <div className="dc-mat-id">ID: #{coleta.id}</div>
        </div>
      </div>
      <InfoRow icon="📅" label="Data e horário"  value={coleta.data} />
      <InfoRow icon="📍" label="Endereço"         value={coleta.endereco} />
      <InfoRow icon="⚖️" label="Peso estimado"    value={coleta.peso} />
      <InfoRow icon="💬" label="Observações"      value={coleta.observacoes} />
    </div>
  );
}

// ─── PESSOA CARD ──────────────────────────────────────────────────────────────
function PessoaCard({ pessoa }) {
  const titulo =
    pessoa.tipo === 'coletor'
      ? 'Informações do coletor'
      : 'Informações do doador';

  return (
    <div className="dc-pessoa-card">
      <div className="dc-pessoa-card-title">{titulo}</div>
      <div className="dc-pessoa-row">
        <div className="dc-avatar">👤</div>
        <div>
          <div className="dc-pessoa-name">{pessoa.nome}</div>
          {pessoa.rating && (
            <div className="dc-pessoa-rating">⭐ {pessoa.rating}</div>
          )}
          <div className="dc-pessoa-phone">
            {pessoa.tipo === 'doador' ? '📞 ' : ''}
            {pessoa.telefone}
          </div>
        </div>
        {pessoa.tipo === 'doador' && (
          <button className="dc-contact-btn">Contatar</button>
        )}
      </div>
    </div>
  );
}

// ─── TELAS POR STATUS ─────────────────────────────────────────────────────────
function ScreenAgendada({ coleta }) {
  return (
    <>
      <MaterialCard coleta={coleta} />
      <PessoaCard pessoa={coleta.pessoa} />
      <div className="dc-btn-area">
        <button className="dc-btn dc-btn--cancel">Cancelar coleta</button>
      </div>
    </>
  );
}

function ScreenColetada({ coleta }) {
  const navigate = useNavigate();
  return (
    <>
      <MaterialCard coleta={coleta} />
      <PessoaCard pessoa={coleta.pessoa} />
      <div className="dc-points-card">
        <div>
          <div className="dc-points-label">Pontos ganhos</div>
          <div className="dc-points-value">+{coleta.pontos}</div>
        </div>
        <span className="dc-star-outline">☆</span>
      </div>
      <div className="dc-btn-area">
        <button
          className="dc-btn dc-btn--green"
          onClick={() => navigate('/avaliar-coletor')}
        >
          ☆ &nbsp; Avaliar coletor
        </button>
      </div>
    </>
  );
}

function ScreenColetorEmRota({ coleta }) {
  const navigate = useNavigate()

  return (
    <>
      <MaterialCard coleta={coleta} />
      <PessoaCard pessoa={coleta.pessoa} />
      <div className="dc-btn-area">
        <button className="dc-btn dc-btn--blue" onClick={() => navigate('/visualizar-rota')}>
          📍 &nbsp; Ver rota
        </button>
        <button className="dc-btn dc-btn--green">Finalizar coleta</button>
      </div>
    </>
  );
}

function ScreenDisponivel({ coleta }) {
  return (
    <>
      <MaterialCard coleta={coleta} />
      <PessoaCard pessoa={coleta.pessoa} />
      <div className="dc-btn-area">
        <button className="dc-btn dc-btn--green">Aceitar coleta</button>
      </div>
    </>
  );
}

function renderScreen(coleta) {
  switch (coleta.status) {
    case 'agendada':         return <ScreenAgendada coleta={coleta} />;
    case 'coletada':         return <ScreenColetada coleta={coleta} />;
    case 'agendada_coletor': return <ScreenColetorEmRota coleta={coleta} />;
    case 'disponivel':       return <ScreenDisponivel coleta={coleta} />;
    default:                 return null;
  }
}

// ─── SIDEBAR ESQUERDA (desktop) ───────────────────────────────────────────────
function Sidebar({ status }) {
  const info = {
    agendada: {
      titulo: 'Coleta agendada',
      desc: 'Sua coleta está confirmada. Prepare os materiais para o horário marcado.',
    },
    coletada: {
      titulo: 'Coleta realizada',
      desc: 'Materiais coletados com sucesso. Obrigado por contribuir com o meio ambiente!',
    },
    agendada_coletor: {
      titulo: 'Em rota de coleta',
      desc: 'Você está a caminho. Finalize a coleta ao chegar no endereço.',
    },
    disponivel: {
      titulo: 'Coleta disponível',
      desc: 'Uma nova coleta está aguardando. Aceite para iniciar o processo.',
    },
  };

  const { titulo, desc } = info[status] || info.agendada;

  return (
    <aside className="dc-sidebar">
      <div className="dc-sidebar-icon">♻️</div>
      <h2 className="dc-sidebar-title">{titulo}</h2>
      <p className="dc-sidebar-desc">{desc}</p>
    </aside>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function DetalhesColeta() {
  const { coletaAtiva, activeIndex, irParaColeta } = useDetalhesColeta();
  const { label, badgeClass } = statusConfig[coletaAtiva.status];

  return (
    <div className="dc-wrapper">
      {/* Sidebar verde — visível só no desktop via CSS */}
      <Sidebar status={coletaAtiva.status} />

      {/* Coluna direita */}
      <div className="dc-phone">
        {/* Tabs de navegação (teste) */}
        <div className="dc-tabs">
          {tabLabels.map((tabLabel, i) => (
            <button
              key={i}
              className={`dc-tab-btn${activeIndex === i ? ' active' : ''}`}
              onClick={() => irParaColeta(i)}
            >
              {tabLabel}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="dc-header">
          <button className="dc-back-btn">←</button>
          <span className="dc-header-title">Detalhes da coleta</span>
        </div>

        {/* Status */}
        <div className="dc-status-row">
          <span className="dc-status-label">Status da coleta</span>
          <span className={`dc-badge ${badgeClass}`}>{label}</span>
        </div>

        {/* Conteúdo */}
        <div key={activeIndex} className="dc-screen">
          {renderScreen(coletaAtiva)}
        </div>
      </div>
    </div>
  );
}