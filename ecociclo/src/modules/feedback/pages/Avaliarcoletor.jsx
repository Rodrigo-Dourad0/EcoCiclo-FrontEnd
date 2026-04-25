import { useAvaliarColetor } from "../hooks/useAvaliarColetor";
import "../styles/Avaliarcoletor.css"

export default function AvaliarColetor({ collectorName = "Carlos Oliveira" }) {
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
  } = useAvaliarColetor();

  return (
    <div className="avaliarcoletor-screen">

      {/* Sidebar — desktop only */}
      <aside className="avaliarcoletor-sidebar">
        <div className="avaliarcoletor-sidebar-logo">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h2 className="avaliarcoletor-sidebar-title">Avaliar coletor</h2>
        <p className="avaliarcoletor-sidebar-subtitle">
          Sua avaliação ajuda a comunidade a identificar os melhores coletores e melhorar o serviço de coleta seletiva.
        </p>
      </aside>

      {/* Main */}
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
            <p className="avaliarcoletor-collector-name">{collectorName}</p>
          </div>

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
            />
          </div>

          <button
            className={`avaliarcoletor-submit-btn ${rating === 0 ? "disabled" : "enabled"}`}
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Enviar avaliação
          </button>

        </div>
      </div>

      {/* Modal de sucesso */}
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
            <button className="avaliarcoletor-modal-btn" onClick={handleBack}>
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}