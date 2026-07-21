import { useNavigate } from "react-router-dom";
import { Home, ChevronRight, Gift, Clock, CheckCircle, Star } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      id: "associacoes",
      kicker: "Estrutura",
      title: "Gerenciar associações",
      description: "Cadastrar, editar, excluir e vincular coletores às associações do sistema.",
      icon: <Home size={20} />,
      action: () => navigate("/gerenciar-associacao"),
      actionLabel: "Abrir associações",
      accent: "blue",
      tags: ["coletores", "membros", "vínculos"],
    },
    {
      id: "recompensas",
      kicker: "Incentivos",
      title: "Gerenciar recompensas",
      description: "Criar e manter os brindes disponíveis para resgate pelos doadores.",
      icon: <Gift size={20} />,
      action: () => navigate("/gerenciar-recompensa"),
      actionLabel: "Abrir recompensas",
      accent: "green",
      tags: ["estoque", "cadastro", "resgate"],
    },
    {
      id: "retiradas",
      kicker: "Fluxo",
      title: "Recompensas para retirada",
      description: "Confirmar a retirada física dos resgates já solicitados pelos doadores.",
      icon: <Clock size={20} />,
      action: () => navigate("/recompensas-retirada"),
      actionLabel: "Ver retiradas",
      accent: "purple",
      tags: ["pendentes", "histórico", "confirmação"],
    },
  ];

  return (
    <div className="ad-page">
      <Navigation />

      <main className="ad-main">
        <div className="ad-container">
          <header className="ad-top-header">
            <div className="ad-hero">
              <span className="ad-kicker">Administração</span>
              <h1 className="ad-titulo">Painel administrativo</h1>
              <p className="ad-subtitulo">
                Acesse os módulos administrativos disponíveis na plataforma.
              </p>
            </div>

            <div className="ad-status-card">
              <div className="ad-status-icon">
                <CheckCircle size={18} />
              </div>
              <div>
                <strong>Módulos disponíveis</strong>
                <span>Associações, recompensas e retirada de resgates</span>
              </div>
            </div>
          </header>

          <section className="ad-actions-section">
            <div className="ad-section-header">
              <div>
                <span className="ad-section-kicker">
                  <Star size={13} /> Acessos rápidos
                </span>
                <h2>Atalhos administrativos</h2>
              </div>
            </div>

            <div className="ad-actions-grid">
              {cards.map((card) => (
                <article key={card.id} className={`ad-action-card ad-action-card--${card.accent}`}>
                  <div className="ad-action-card__head">
                    <div className="ad-action-card__icon">{card.icon}</div>
                    <span className="ad-action-card__kicker">{card.kicker}</span>
                  </div>

                  <div className="ad-action-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  <div className="ad-action-card__tags">
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <button type="button" className="ad-action-card__button" onClick={card.action}>
                    {card.actionLabel}
                    <ChevronRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
