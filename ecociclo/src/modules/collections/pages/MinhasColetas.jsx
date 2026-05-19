import { Link } from "react-router-dom";
import { Calendar, MapPin, Package } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMinhasColetas } from "../hooks/MinhasColetas";
import "../styles/MinhasColetas.css";

function MinhasColetas() {
  const { abaAtiva, setAbaAtiva, coletasFiltradas } = useMinhasColetas();

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
            <button
              className={`mc-aba ${abaAtiva === "agendadas" ? "mc-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("agendadas")}
            >
              Agendadas
            </button>

            <button
              className={`mc-aba ${abaAtiva === "coletadas" ? "mc-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("coletadas")}
            >
              Coletadas
            </button>

            <button
              className={`mc-aba ${abaAtiva === "canceladas" ? "mc-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("canceladas")}
            >
              Canceladas
            </button>
          </div>

          <div className="mc-lista">
            {coletasFiltradas.map((coleta) => (
              <article className="mc-card" key={coleta.id}>
                <div className="mc-card-header">
                  <div className="mc-card-title">
                    <Package size={22} />
                    <h3>{coleta.tipo}</h3>
                  </div>

                  <span className={`mc-badge mc-badge--${abaAtiva}`}>
                    {coleta.status}
                  </span>
                </div>

                <div className="mc-info">
                  <div className="mc-info-line">
                    <Calendar size={16} />
                    <span>{coleta.data}</span>
                  </div>

                  <div className="mc-info-line">
                    <MapPin size={16} />
                    <span>{coleta.endereco}</span>
                  </div>
                </div>

                <div className="mc-details">
                  <p>Peso estimado: <strong>{coleta.peso}</strong></p>
                  <p>Coletor: <strong>{coleta.coletor}</strong></p>

                  {coleta.pontos && (
                    <p className="mc-pontos">+{coleta.pontos} pontos</p>
                  )}
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