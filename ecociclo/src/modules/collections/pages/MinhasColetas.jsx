import { Link } from "react-router-dom";
import { Calendar, MapPin, Package, User, Weight } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMinhasColetas } from "../hooks/MinhasColetas";
import "../styles/MinhasColetas.css";

function MinhasColetas() {
  const { abaAtiva, setAbaAtiva, coletasFiltradas, contagens } = useMinhasColetas();

  return (
    <div className="mc-page">
      <Navigation />

      <main className="mc-main">
        <section className="mc-header">
          <p className="mc-kicker">Histórico</p>
          <h1>Minhas coletas</h1>
          <p>Acompanhe suas coletas agendadas, realizadas e canceladas.</p>

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
            {coletasFiltradas.length === 0 && (
              <div className="mc-empty">
                <Package size={40} strokeWidth={1.2} />
                <p>Nenhuma coleta encontrada.</p>
              </div>
            )}

            {coletasFiltradas.map((coleta, index) => (
              <article className="mc-card" key={coleta.id} style={{ animationDelay: `${index * 60}ms` }}>
                {/* Stripe lateral colorida por status */}
                <div className={`mc-card-stripe mc-card-stripe--${abaAtiva}`} />

                <div className="mc-card-inner">
                  {/* Cabeçalho */}
                  <div className="mc-card-header">
                    <div className="mc-card-title">
                      <div className={`mc-icon-wrap mc-icon-wrap--${abaAtiva}`}>
                        <Package size={18} />
                      </div>
                      <h3>{coleta.tipo}</h3>
                    </div>
                    <span className={`mc-badge mc-badge--${abaAtiva}`}>
                      {coleta.status}
                    </span>
                  </div>

                  {/* Separador */}
                  <div className="mc-divider" />

                  {/* Corpo */}
                  <div className="mc-card-body">
                    <div className="mc-meta-grid">
                      <div className="mc-meta-item">
                        <Calendar size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Data e hora</span>
                          <span className="mc-meta-value">{coleta.data}</span>
                        </div>
                      </div>

                      <div className="mc-meta-item">
                        <MapPin size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Endereço</span>
                          <span className="mc-meta-value">{coleta.endereco}</span>
                        </div>
                      </div>

                      <div className="mc-meta-item">
                        <Weight size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Peso estimado</span>
                          <span className="mc-meta-value mc-meta-value--strong">{coleta.peso}</span>
                        </div>
                      </div>

                      <div className="mc-meta-item">
                        <User size={14} className="mc-meta-icon" />
                        <div>
                          <span className="mc-meta-label">Coletor</span>
                          <span className="mc-meta-value mc-meta-value--strong">{coleta.coletor}</span>
                        </div>
                      </div>
                    </div>

                    {coleta.pontos && (
                      <div className="mc-pontos-wrap">
                        <span className="mc-pontos">+{coleta.pontos} pontos</span>
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

export default MinhasColetas;