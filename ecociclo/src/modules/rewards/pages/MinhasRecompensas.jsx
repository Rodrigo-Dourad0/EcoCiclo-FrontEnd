import "../styles/MinhasRecompensas.css";
import useMinhasRecompensas from "../hooks/useMinhasRecompensas";
import { Navigation } from "../../../shared/components/Navigation/Navigation";
import { Gift, Star, Calendar, Hash, CheckCircle, Clock } from "lucide-react";

export default function MinhasRecompensas() {
  const { recompensas } = useMinhasRecompensas();

  const ativas    = recompensas.filter((r) => r.status === "ativa").length;
  const utilizadas = recompensas.filter((r) => r.status === "utilizada").length;

  const CardRecompensa = ({ recompensa, i }) => (
    <article
      className={`mr-card ${recompensa.status === "utilizada" ? "mr-card--utilizada" : ""}`}
      style={{ animationDelay: `${i * 55}ms` }}
    >
      {/* Foto / Placeholder */}
      <div className="mr-card-foto">
        {recompensa.foto ? (
          <img src={recompensa.foto} alt={recompensa.nome} />
        ) : (
          <div className="mr-card-foto-placeholder">
            <Gift size={28} />
          </div>
        )}
        <span className={`mr-badge ${recompensa.status === "ativa" ? "mr-badge--ativa" : "mr-badge--utilizada"}`}>
          {recompensa.status === "ativa" ? "Ativa" : "Utilizada"}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="mr-card-body">
        <div className="mr-card-top">
          <h3 className="mr-card-nome">{recompensa.nome}</h3>

          <div className="mr-card-meta">
            <div className="mr-meta-item">
              <Star size={13} className="mr-meta-icon mr-meta-icon--star" />
              <span><strong>{recompensa.pontos}</strong> pontos</span>
            </div>
            <div className="mr-meta-item">
              <Calendar size={13} className="mr-meta-icon" />
              <span>{recompensa.data}</span>
            </div>
          </div>
        </div>

        <div className="mr-card-bottom">
          {recompensa.status === "ativa" && recompensa.codigo && (
            <div className="mr-codigo-wrap">
              <Hash size={12} className="mr-codigo-icon" />
              <span className="mr-codigo">{recompensa.codigo}</span>
            </div>
          )}
          {recompensa.status === "utilizada" && (
            <div className="mr-utilizada-wrap">
              <CheckCircle size={13} className="mr-utilizada-icon" />
              <span>Recompensa utilizada</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <div className="mr-page">
      <Navigation />

      <main className="mr-main">

        {/* ── Header ── */}
        <section className="mr-header">
          <div className="mr-header-text">
            <p className="mr-kicker">Perfil</p>
            <h1>Minhas recompensas</h1>
            <p>Acompanhe os resgates realizados com seus pontos.</p>
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="mr-stats">
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--total">
              <Gift size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{recompensas.length}</span>
              <span className="mr-stat-label">Total</span>
            </div>
          </div>
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--ativa">
              <Clock size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{ativas}</span>
              <span className="mr-stat-label">Ativas</span>
            </div>
          </div>
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--utilizada">
              <CheckCircle size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{utilizadas}</span>
              <span className="mr-stat-label">Utilizadas</span>
            </div>
          </div>
        </div>

        {/* ── Lista ── */}
        <div className="mr-lista">
          {recompensas.length === 0 ? (
            <div className="mr-vazio">
              <div className="mr-vazio-icone">
                <Gift size={28} />
              </div>
              <strong>Nenhuma recompensa resgatada</strong>
              <span>Acumule pontos nas coletas e troque por recompensas</span>
            </div>
          ) : (
            recompensas.map((r, i) => (
              <CardRecompensa key={r.id} recompensa={r} i={i} />
            ))
          )}
        </div>

      </main>
    </div>
  );
}