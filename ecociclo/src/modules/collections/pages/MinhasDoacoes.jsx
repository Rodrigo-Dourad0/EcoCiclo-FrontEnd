import { Link } from "react-router-dom";
import { Calendar, MapPin, Package, User, Weight } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMinhasDoacoes } from "../hooks/useMinhasDoacoes.js";
import "../styles/MinhasDoacoes.css";

function MinhasDoacoes() {
  const { abaAtiva, setAbaAtiva, doacoesFiltradas, contagens } = useMinhasDoacoes();

  return (
    <div className="mc-page">
      <Navigation />

      <main className="mc-main">
        <section className="mc-header">
          <p className="mc-kicker">Doações</p>
          <h1>Minhas doações</h1>
          <p>Acompanhe suas doações agendadas, coletadas e canceladas.</p>

          <Link to="/detalhes-recompensas" className="mc-teste-link">
            Testar DetalhesRecompensa
          </Link>
        </section>

        <section className="mc-content">
          <div className="mc-abas">
            {["agendadas", "coletadas", "canceladas"].map((aba) => (
              <button
                key={aba}
                className={`mc-aba ${abaAtiva === aba ? "mc-aba--ativa" : ""}`}
                onClick={() => setAbaAtiva(aba)}
              >
                <span className="mc-aba-label">
                  {aba.charAt(0).toUpperCase() + aba.slice(1)}
                </span>
                <span className={`mc-aba-count ${abaAtiva === aba ? "mc-aba-count--ativa" : ""}`}>
                  {contagens[aba]}
                </span>
              </button>
            ))}
          </div>

          <div className="mc-lista">
            {doacoesFiltradas.length === 0 && (
              <div className="mc-empty">
                <Package size={40} strokeWidth={1.2} />
                <p>Nenhuma doação encontrada.</p>
              </div>
            )}

            {doacoesFiltradas.map((doacao, index) => (
              <article className="mc-card" key={doacao.id} style={{ animationDelay: `${index * 60}ms` }}>
                <div className={`mc-card-stripe mc-card-stripe--${abaAtiva}`} />

                <div className="mc-card-inner">
                  <div className="mc-card-header">
                    <div className="mc-card-title">
                      <div className={`mc-icon-wrap mc-icon-wrap--${abaAtiva}`}>
                        <Package size={18} />
                      </div>
                      <h3>{doacao.tipo}</h3>
                    </div>
                    <span className={`mc-badge mc-badge--${abaAtiva}`}>
                      {doacao.status}
                    </span>
                  </div>

                  <div className="mc-divider" />

                  <div className="mc-card-body">
                    <div className="mc-meta-grid">
                      <div className="mc-meta-item">
                        <Calendar size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Data e hora</span>
                          <span className="mc-meta-value">{doacao.data}</span>
                        </div>
                      </div>

                      <div className="mc-meta-item">
                        <MapPin size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Endereço</span>
                          <span className="mc-meta-value">{doacao.endereco}</span>
                        </div>
                      </div>

                      <div className="mc-meta-item">
                        <Weight size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Peso estimado</span>
                          <span className="mc-meta-value mc-meta-value--strong">{doacao.peso}</span>
                        </div>
                      </div>

                      <div className="mc-meta-item">
                        <User size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Coletor</span>
                          <span className="mc-meta-value mc-meta-value--strong">{doacao.coletor}</span>
                        </div>
                      </div>
                    </div>

                    {doacao.pontos && (
                      <div className="mc-pontos-wrap">
                        <span className="mc-pontos">+{doacao.pontos} pontos</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MinhasDoacoes;