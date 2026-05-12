import "../styles/MinhasColetas.css";
import { useMinhasColetas } from "../hooks/MinhasColetas";

function MinhasColetas() {
  const { abaAtiva, setAbaAtiva, coletasFiltradas } = useMinhasColetas();

  return (
    <>
      {/* LEFT */}
      <div className="panel-left">
        <div className="deco-ring r1"></div>
        <div className="deco-ring r2"></div>
        <div className="deco-ring r3"></div>
        <div className="deco-ring r4"></div>
        <div className="deco-ring r5"></div>

        <div className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24">
              <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
            </svg>
          </div>
          <span className="brand-name">EcoCiclo</span>
        </div>

        <div className="hero-copy">
          <p className="hero-label">Plataforma Premium</p>
          <h1 className="hero-title">
            Minhas<br /><em>coletas</em>
          </h1>
          <p className="hero-sub">
            Acompanhe todas as suas coletas agendadas, realizadas e canceladas em um só lugar.
          </p>
        </div>

        <div className="testimonial">
          <p>"Nunca foi tão fácil acompanhar minhas coletas. Organização perfeita!"</p>
          <div className="testimonial-footer">
            <div className="testimonial-avatar">JS</div>
            <span className="testimonial-author">Julia Silva, Usuária EcoCiclo</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="panel-right">

        {/* Header mobile */}
        <div className="mobile-header">
          <button className="mobile-back">
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h2 className="mobile-title">Minhas coletas</h2>
        </div>

        <div className="form-card">
          <div className="form-header">
            <p className="form-greeting">Histórico</p>
            <h2 className="form-title">Minhas coletas</h2>
            <p className="form-sub">Acompanhe o status das suas coletas</p>
          </div>

          {/* Abas */}
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

          {/* Lista */}
          <div className="mc-lista">
            {coletasFiltradas.length === 0 ? (
              <div className="mc-vazio">
                <svg viewBox="0 0 24 24" className="mc-vazio-icone">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <p>Nenhuma coleta encontrada</p>
              </div>
            ) : (
              coletasFiltradas.map((coleta) => (
                <div className="mc-card" key={coleta.id}>
                  <div className="mc-card-header">
                    <div className="mc-card-tipo">
                      <svg viewBox="0 0 24 24" className="mc-card-icone">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                      <span className="mc-card-nome">{coleta.tipo}</span>
                    </div>
                    <span className={`mc-badge mc-badge--${abaAtiva}`}>
                      {coleta.status}
                    </span>
                  </div>

                  <div className="mc-card-info">
                    <div className="mc-card-linha">
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>{coleta.data}</span>
                    </div>
                    <div className="mc-card-linha">
                      <svg viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{coleta.endereco}</span>
                    </div>
                  </div>

                  <p className="mc-card-peso">Peso estimado: {coleta.peso}</p>

                  {coleta.pontos && (
                    <p className="mc-card-pontos">+{coleta.pontos} pontos</p>
                  )}

                  <p className="mc-card-coletor">Coletor: {coleta.coletor}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MinhasColetas;