import { useState } from 'react';
import '../styles/DetalhesColeta.css';
import { useNavigate } from 'react-router-dom';
import { useDetalhesColeta, statusConfig, tabLabels } from '../hooks/useDetalhesColeta';
import { Navigation } from '../../../shared/components/Navigation/Navigation';

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
          onClick={() =>
            navigate(
              `/avaliar-coletor?${new URLSearchParams({
                agendamentoId: coleta.id,
                coletorId: coleta.pessoa?.id || "",
                coletorNome: coleta.pessoa?.nome || "Coletor",
              }).toString()}`
            )
          }
        >
          ☆ &nbsp; Avaliar coletor
        </button>
      </div>
    </>
  );
}

function ScreenColetorEmRota({ coleta, onFinalizarColeta }) {
  const navigate = useNavigate();
  return (
    <>
      <MaterialCard coleta={coleta} />
      <PessoaCard pessoa={coleta.pessoa} />
      <div className="dc-btn-area">
        <button className="dc-btn dc-btn--blue" onClick={() => navigate('/visualizar-rota')}>
          📍 &nbsp; Ver rota
        </button>
        <button className="dc-btn dc-btn--green" onClick={onFinalizarColeta}>
          Finalizar coleta
        </button>
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

function renderScreen(coleta, onFinalizarColeta) {
  switch (coleta.status) {
    case 'agendada':         return <ScreenAgendada coleta={coleta} />;
    case 'coletada':         return <ScreenColetada coleta={coleta} />;
    case 'agendada_coletor': return <ScreenColetorEmRota coleta={coleta} onFinalizarColeta={onFinalizarColeta} />;
    case 'disponivel':       return <ScreenDisponivel coleta={coleta} />;
    default:                 return null;
  }
}

/* ─── Modal "Finalizar coleta" (tema escuro / neon) ─────────── */
const FORM_INICIAL = { pesoReal: '', observacoes: '', fotos: [] };

function FinalizarColetaSheet({ aberto, aoFechar, coleta, onConfirmar }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [erroPeso, setErroPeso] = useState(null);

  if (!aberto) return null;

  function validarPeso(valor) {
    if (!valor || valor.trim() === '') return 'Informe o peso real coletado.';
    const numero = Number(valor);
    if (Number.isNaN(numero) || numero <= 0) return 'Informe um peso válido.';
    return null;
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  function handleBlurPeso(e) {
    setErroPeso(validarPeso(e.target.value));
  }

  function handleFotos(e) {
    const arquivos = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, fotos: [...prev.fotos, ...arquivos] }));
  }

  function removerFoto(index) {
    setForm((prev) => ({ ...prev, fotos: prev.fotos.filter((_, i) => i !== index) }));
  }

  function fecharEResetar() {
    setForm(FORM_INICIAL);
    setErroPeso(null);
    aoFechar();
  }

  function handleSubmit() {
    const mensagem = validarPeso(form.pesoReal);
    if (mensagem) {
      setErroPeso(mensagem);
      return;
    }
    onConfirmar({ idColeta: coleta.id, ...form });
    setForm(FORM_INICIAL);
    setErroPeso(null);
  }

  return (
    <div
      className="fc-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) fecharEResetar(); }}
    >
      <div className="fc-modal" role="dialog" aria-modal="true">
        <div className="fc-header">
          <div className="fc-header-left">
            <div className="fc-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div>
              <div className="fc-title">Finalizar coleta</div>
              <span className="fc-sub">ID DA COLETA #{coleta.id}</span>
            </div>
          </div>
          <button className="fc-close" onClick={fecharEResetar} aria-label="Fechar">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="fc-divider" />

        <div className="fc-body">
          {/* Resumo da coleta */}
          <div className="fc-resumo-row">
            <div className="fc-item">
              <svg className="fc-item-icon" viewBox="0 0 24 24">
                <path d="M20 7h-9m9 5H8m12 5H8" />
                <circle cx="4" cy="7" r="1.5" />
                <circle cx="4" cy="12" r="1.5" />
                <circle cx="4" cy="17" r="1.5" />
              </svg>
              <div>
                <div className="fc-item-label">Material</div>
                <div className="fc-item-value">{coleta.material}</div>
              </div>
            </div>
            <div className="fc-item">
              <svg className="fc-item-icon" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <div>
                <div className="fc-item-label">Peso estimado</div>
                <div className="fc-item-value">{coleta.peso}</div>
              </div>
            </div>
          </div>

          <div className="fc-item fc-item--full">
            <svg className="fc-item-icon" viewBox="0 0 24 24">
              <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <div className="fc-item-label">Endereço</div>
              <div className="fc-item-value">{coleta.endereco}</div>
            </div>
          </div>

          {/* Peso real */}
          <div className="fc-field">
            <label htmlFor="pesoReal">
              Peso real coletado (kg) <span className="fc-required">*</span>
            </label>
            <div className={`fc-input-wrap${erroPeso ? ' fc-input-wrap--erro' : ''}`}>
              <svg viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <input
                type="number"
                id="pesoReal"
                placeholder="Ex: 10.5"
                value={form.pesoReal}
                onChange={handleChange}
                onBlur={handleBlurPeso}
                min="0"
                step="0.1"
              />
            </div>
            {erroPeso && <span className="fc-erro">{erroPeso}</span>}
          </div>

          {/* Observações */}
          <div className="fc-field">
            <label htmlFor="observacoes">
              Observações <span className="fc-optional">(opcional)</span>
            </label>
            <textarea
              className="fc-textarea"
              id="observacoes"
              placeholder="Adicione observações sobre a coleta..."
              value={form.observacoes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Fotos */}
          <div className="fc-field">
            <label>
              Fotos <span className="fc-optional">(opcional)</span>
            </label>
            <label className="fc-fotos-btn" htmlFor="fotos">
              <svg viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Adicionar fotos
              <input
                type="file"
                id="fotos"
                accept="image/*"
                multiple
                onChange={handleFotos}
                style={{ display: 'none' }}
              />
            </label>

            {form.fotos.length > 0 && (
              <div className="fc-fotos-preview">
                {form.fotos.map((foto, index) => (
                  <div key={index} className="fc-foto-item">
                    <img src={URL.createObjectURL(foto)} alt={`Foto ${index + 1}`} />
                    <button
                      type="button"
                      className="fc-foto-remover"
                      onClick={() => removerFoto(index)}
                      aria-label="Remover foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="fc-banner">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Ao finalizar, o doador receberá os pontos pela doação realizada.</span>
          </div>
        </div>

        <div className="fc-actions">
          <button className="fc-btn-confirmar" onClick={handleSubmit}>
            <svg viewBox="0 0 24 24" width="16" height="16">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirmar finalização
          </button>
          <button className="fc-btn-cancelar" onClick={fecharEResetar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Componente principal ────────────────────────────────── */
export default function DetalhesColeta() {
  const {
    coletaAtiva,
    activeIndex,
    irParaColeta,
    sheetAberto,
    abrirFinalizarColeta,
    fecharFinalizarColeta,
    finalizarColeta,
  } = useDetalhesColeta();

  const { label, badgeClass } = statusConfig[coletaAtiva.status];

  return (
    <div className="app-container">
      <Navigation />

      <div className="dc-wrapper">
        <div className="dc-phone">
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

          <div className="dc-header">
            <button className="dc-back-btn">←</button>
            <span className="dc-header-title">Detalhes da coleta</span>
          </div>

          <div className="dc-status-row">
            <span className="dc-status-label">Status da coleta</span>
            <span className={`dc-badge ${badgeClass}`}>{label}</span>
          </div>

          <div key={activeIndex} className="dc-screen">
            {renderScreen(coletaAtiva, abrirFinalizarColeta)}
          </div>
        </div>
      </div>

      <FinalizarColetaSheet
        aberto={sheetAberto}
        aoFechar={fecharFinalizarColeta}
        coleta={coletaAtiva}
        onConfirmar={finalizarColeta}
      />
    </div>
  );
}
