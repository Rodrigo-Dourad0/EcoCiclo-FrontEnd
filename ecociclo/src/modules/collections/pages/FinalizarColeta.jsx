import "../styles/FinalizarColeta.css";
import useFinalizarColeta from "../hooks/useFinalizarColeta";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";

export default function FinalizarColeta() {
  const {
    form,
    erros,
    idColeta,
    handleChange,
    handleBlur,
    handleFotos,
    handleSubmit,
  } = useFinalizarColeta();

  return (
    <div className="fc-page">
      <Navigation />

      <main className="fc-main">
        <section className="fc-header">
          <p className="fc-kicker">Coletas</p>
          <h1>Finalizar coleta</h1>
          <p>Confirme os dados da coleta realizada para registrar a conclusão.</p>
        </section>

        <section className="fc-content">

          {/* ── Bloco: Status ── */}
          <div className="fc-block">
            <div className="fc-block-label">
              <svg viewBox="0 0 24 24" className="fc-block-icon">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Status
            </div>

            <div className="fc-check-wrapper">
              <div className="fc-check-circle">
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="fc-check-info">
                <strong>Coleta realizada</strong>
                <span>Confirme os dados abaixo para finalizar</span>
              </div>
            </div>

            <div className="fc-id-card">
              <span className="fc-id-label">ID da Coleta</span>
              <span className="fc-id-value">{idColeta}</span>
            </div>
          </div>

          <div className="fc-divider" />

          {/* ── Bloco: Dados ── */}
          <div className="fc-block">
            <div className="fc-block-label">
              <svg viewBox="0 0 24 24" className="fc-block-icon">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Dados da coleta
            </div>

            <div className="fc-field fc-field--half">
              <label htmlFor="pesoReal">
                Peso real coletado (kg) <span className="fc-required">*</span>
              </label>
              <div className="fc-input-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <input
                  type="number"
                  id="pesoReal"
                  placeholder="Ex: 10.5"
                  value={form.pesoReal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  step="0.1"
                  className={erros.pesoReal ? "input-erro" : ""}
                />
              </div>
              {erros.pesoReal && <span className="fc-erro">{erros.pesoReal}</span>}
            </div>
          </div>

          <div className="fc-divider" />

          {/* ── Bloco: Detalhes ── */}
          <div className="fc-block fc-block--last">
            <div className="fc-block-label">
              <svg viewBox="0 0 24 24" className="fc-block-icon">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              Detalhes
            </div>

            <div className="fc-field">
              <label htmlFor="observacoes">
                Observações <span className="fc-optional">(opcional)</span>
              </label>
              <div className="fc-textarea-wrap">
                <textarea
                  id="observacoes"
                  placeholder="Adicione observações sobre a coleta..."
                  value={form.observacoes}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

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
                  style={{ display: "none" }}
                />
              </label>

              {form.fotos.length > 0 && (
                <div className="fc-fotos-preview">
                  {form.fotos.map((foto, index) => (
                    <div key={index} className="fc-foto-item">
                      <img src={URL.createObjectURL(foto)} alt={`Foto ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fc-banner">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>Ao finalizar, o doador receberá os pontos pela doação realizada.</span>
            </div>
          </div>

          {/* ── Botão ── */}
          <button className="fc-btn" onClick={handleSubmit}>
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Confirmar finalização
          </button>

        </section>
      </main>
    </div>
  );
}