import { Gift, Star, Calendar, Check, Tag, Info, AlertCircle } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useDetalhesRecompensa } from "../hooks/useDetalhesRecompensa";
import "../styles/DetalhesRecompensa.css";

function DetalhesRecompensa() {
  const { recompensa, resgatado, podeResgatar, handleResgatar } =
    useDetalhesRecompensa();

  const progresso = Math.min(
    (recompensa.pontosUsuario / recompensa.pontosNecessarios) * 100,
    100
  );

  return (
    <div className="dr-page">
      <Navigation />

      <main className="dr-main">
        <section className="dr-header">
          <p className="dr-kicker">Recompensas</p>
          <h1>Detalhes da recompensa</h1>
          <p>Confira os detalhes da sua recompensa e resgate agora mesmo.</p>
        </section>

        <section className="dr-content">

          {/* ── Hero Banner ── */}
          <div className="dr-hero">
            <div className="dr-hero-bg" />
            <div className="dr-hero-icon">
              <Gift size={48} />
            </div>
            <span className="dr-tipo-badge">
              <Tag size={11} />
              {recompensa.tipo}
            </span>
          </div>

          {/* ── Identidade ── */}
          <div className="dr-identity">
            <div>
              <h2 className="dr-titulo">{recompensa.titulo}</h2>
              <p className="dr-descricao">{recompensa.descricao}</p>
            </div>
          </div>

          <div className="dr-divider" />

          {/* ── Card de Pontos ── */}
          <div className="dr-pontos-card">
            <div className="dr-pontos-col">
              <span className="dr-pontos-label">Pontos necessários</span>
              <div className="dr-pontos-value">
                <Star size={16} className="dr-star" />
                <strong>{recompensa.pontosNecessarios}</strong>
                <span>pts</span>
              </div>
            </div>

            <div className="dr-pontos-sep" />

            <div className="dr-pontos-col dr-pontos-col--user">
              <span className="dr-pontos-label">Seus pontos</span>
              <div className="dr-pontos-value">
                <strong className={podeResgatar ? "dr-pts-ok" : "dr-pts-low"}>
                  {recompensa.pontosUsuario}
                </strong>
                <span>pts</span>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="dr-progress-wrap">
              <div className="dr-progress-track">
                <div
                  className="dr-progress-fill"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <span className="dr-progress-label">
                {podeResgatar
                  ? "Você tem pontos suficientes!"
                  : `Faltam ${recompensa.pontosNecessarios - recompensa.pontosUsuario} pontos`}
              </span>
            </div>
          </div>

          {/* ── Grid de infos ── */}
          <div className="dr-info-grid">
            <div className="dr-info-card">
              <div className="dr-info-icon">
                <Info size={15} />
              </div>
              <div>
                <span className="dr-info-label">Sobre</span>
                <p className="dr-info-text">{recompensa.sobre}</p>
              </div>
            </div>

            <div className="dr-info-card">
              <div className="dr-info-icon dr-info-icon--calendar">
                <Calendar size={15} />
              </div>
              <div>
                <span className="dr-info-label">Validade</span>
                <p className="dr-info-text dr-info-text--strong">{recompensa.validade}</p>
              </div>
            </div>
          </div>

          {/* ── Observação ── */}
          <div className="dr-obs-card">
            <AlertCircle size={15} className="dr-obs-icon" />
            <p className="dr-obs">{recompensa.observacao}</p>
          </div>

          {/* ── Botão ── */}
          {resgatado ? (
            <div className="dr-resgatado">
              <Check size={20} />
              Recompensa resgatada com sucesso!
            </div>
          ) : (
            <button
              className={`dr-btn ${!podeResgatar ? "dr-btn--desabilitado" : ""}`}
              onClick={handleResgatar}
              disabled={!podeResgatar}
            >
              <Gift size={18} />
              {podeResgatar ? "Resgatar recompensa" : "Pontos insuficientes"}
            </button>
          )}

        </section>
      </main>
    </div>
  );
}

export default DetalhesRecompensa;