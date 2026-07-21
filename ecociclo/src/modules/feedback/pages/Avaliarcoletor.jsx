import { useAvaliarColetor } from "../hooks/useAvaliarColetor";
import "../styles/Avaliarcoletor.css";
import { Navigation } from "../../../shared/components/Navigation/Navigation";

export default function AvaliarColetor() {
  const {
    rating,
    setRating,
    hovered,
    setHovered,
    comment,
    setComment,
    submitted,
    activeRating,
    handleSubmit,
    handleBack,
    handleGoToDoacoes,
    loading,
    error,
    podeEnviar,
    coletorNome,
    resumoAgendamento,
  } = useAvaliarColetor();

  return (
    <div className="app-container">
      <Navigation />

      <div className="avaliarcoletor-screen">
        <div className="avaliarcoletor-main">
          <div className="avaliarcoletor-header">
            <button className="avaliarcoletor-back-btn" onClick={handleBack} aria-label="Voltar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <span className="avaliarcoletor-header-title">Avaliar coletor</span>
          </div>

          <div className="avaliarcoletor-body">
            <div className="avaliarcoletor-collector-info">
              <p className="avaliarcoletor-collector-subtitle">Como foi sua experiência com</p>
              <p className="avaliarcoletor-collector-name">{coletorNome}</p>
              <p className="avaliarcoletor-collector-meta">{resumoAgendamento}</p>
            </div>

            {error && <div className="avaliarcoletor-error">{error}</div>}

            <div className="avaliarcoletor-card">
              <p className="avaliarcoletor-card-title">Avaliação</p>
              <div className="avaliarcoletor-stars-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="avaliarcoletor-star-btn"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
                    disabled={loading}
                  >
                    <svg
                      className={`avaliarcoletor-star-svg${star <= activeRating ? " active" : ""}`}
                      width="44" height="44" viewBox="0 0 24 24"
                      fill={star <= activeRating ? "#F5A623" : "none"}
                      stroke={star <= activeRating ? "#F5A623" : "#AAAAAA"}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="avaliarcoletor-card">
              <span className="avaliarcoletor-comment-label">Comentário (opcional)</span>
              <textarea
                className="avaliarcoletor-comment-textarea"
                rows={5}
                placeholder="Compartilhe sua experiência..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              className={`avaliarcoletor-submit-btn ${podeEnviar ? "enabled" : "disabled"}`}
              onClick={handleSubmit}
              disabled={!podeEnviar}
            >
              {loading ? "Enviando..." : "Enviar avaliação"}
            </button>
          </div>
        </div>

        {submitted && (
          <div className="avaliarcoletor-modal-overlay">
            <div className="avaliarcoletor-modal-card">
              <div className="avaliarcoletor-modal-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="avaliarcoletor-modal-title">Avaliação enviada!</p>
              <p className="avaliarcoletor-modal-text">
                Obrigado pelo seu feedback. Isso ajuda a melhorar a comunidade.
              </p>
              <button className="avaliarcoletor-modal-btn" onClick={handleGoToDoacoes}>
                Voltar para minhas doações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
