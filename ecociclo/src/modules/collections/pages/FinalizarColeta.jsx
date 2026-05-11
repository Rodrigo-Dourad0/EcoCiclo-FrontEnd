import "../styles/FinalizarColeta.css";
import useFinalizarColeta from "../hooks/useFinalizarColeta";

export default function FinalizarColeta() {
  const {
    form,
    erros,
    idColeta,
    handleChange,
    handleFotos,
    handleSubmit,
  } = useFinalizarColeta();

  return (
    <>
      {/* MOBILE / TABLET */}
      <div className="fc-screen">
        <div className="fc-header">
          <button className="fc-btn-voltar" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1>Finalizar coleta</h1>
        </div>

        <div className="fc-body">

          {/* ÍCONE CHECK */}
          <div className="fc-check-wrapper">
            <div className="fc-check-circle">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="fc-check-text">Confirme os dados da coleta realizada</p>
          </div>

          {/* ID DA COLETA */}
          <div className="fc-id-card">
            <span className="fc-id-label">ID da Coleta</span>
            <span className="fc-id-value">{idColeta}</span>
          </div>

          {/* PESO REAL */}
          <div className="fc-field">
            <label htmlFor="pesoReal">
              Peso real coletado (kg) <span className="fc-obrigatorio">*</span>
            </label>
            <input
              type="number"
              id="pesoReal"
              placeholder="Ex: 10.5"
              value={form.pesoReal}
              onChange={handleChange}
              min="0"
              step="0.1"
              className={erros.pesoReal ? "input-erro" : ""}
            />
            {erros.pesoReal && <span className="fc-erro">{erros.pesoReal}</span>}
          </div>

          {/* OBSERVAÇÕES */}
          <div className="fc-field">
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              placeholder="Adicione observações sobre a coleta..."
              value={form.observacoes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* ADICIONAR FOTOS */}
          <label className="fc-fotos-btn" htmlFor="fotos">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Adicionar fotos (opcional)
            <input
              type="file"
              id="fotos"
              accept="image/*"
              multiple
              onChange={handleFotos}
              style={{ display: "none" }}
            />
          </label>

          {/* PREVIEW DAS FOTOS */}
          {form.fotos.length > 0 && (
            <div className="fc-fotos-preview">
              {form.fotos.map((foto, index) => (
                <div key={index} className="fc-foto-item">
                  <img src={URL.createObjectURL(foto)} alt={`Foto ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* BANNER */}
          <div className="fc-banner">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Ao finalizar, o doador receberá os pontos pela coleta</span>
          </div>

          {/* BOTÃO */}
          <button className="fc-btn-confirmar" onClick={handleSubmit}>
            Confirmar finalização
          </button>

        </div>
      </div>

      {/* DESKTOP */}
      <div className="fc-desktop">
        <div className="fc-desktop-left">
          <div className="fc-desktop-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h2>Finalize sua<br />coleta agora.</h2>
          <p>Confirme os dados da coleta realizada para que o doador receba seus pontos.</p>
          <div className="fc-desktop-features">
            <div className="fc-desktop-feature">
              <div className="fc-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span>O doador receberá pontos ao finalizar</span>
            </div>
            <div className="fc-desktop-feature">
              <div className="fc-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <span>Adicione fotos da coleta realizada</span>
            </div>
            <div className="fc-desktop-feature">
              <div className="fc-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span>Confirme o peso real coletado</span>
            </div>
          </div>
        </div>

        <div className="fc-desktop-right">
          <h1>Finalizar coleta</h1>

          <div className="fc-check-wrapper">
            <div className="fc-check-circle">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="fc-check-text">Confirme os dados da coleta realizada</p>
          </div>

          <div className="fc-id-card">
            <span className="fc-id-label">ID da Coleta</span>
            <span className="fc-id-value">{idColeta}</span>
          </div>

          <div className="fc-field">
            <label htmlFor="pesoReal2">
              Peso real coletado (kg) <span className="fc-obrigatorio">*</span>
            </label>
            <input
              type="number"
              id="pesoReal2"
              placeholder="Ex: 10.5"
              value={form.pesoReal}
              onChange={handleChange}
              min="0"
              step="0.1"
              className={erros.pesoReal ? "input-erro" : ""}
            />
            {erros.pesoReal && <span className="fc-erro">{erros.pesoReal}</span>}
          </div>

          <div className="fc-field">
            <label htmlFor="observacoes2">Observações</label>
            <textarea
              id="observacoes2"
              placeholder="Adicione observações sobre a coleta..."
              value={form.observacoes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <label className="fc-fotos-btn" htmlFor="fotos2">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Adicionar fotos (opcional)
            <input
              type="file"
              id="fotos2"
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

          <div className="fc-banner">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Ao finalizar, o doador receberá os pontos pela coleta</span>
          </div>

          <button className="fc-btn-confirmar" onClick={handleSubmit}>
            Confirmar finalização
          </button>
        </div>
      </div>
    </>
  );
}
