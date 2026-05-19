import "../styles/MinhasRecompensas.css";
import useMinhasRecompensas from "../hooks/useMinhasRecompensas";

export default function MinhasRecompensas() {
  const { recompensas } = useMinhasRecompensas();

  const CardRecompensa = ({ recompensa }) => (
    <div className="mr-card">
      <div className="mr-card-top">
        <div className="mr-card-esquerda">
          <div className="mr-icone">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
          <div className="mr-card-info">
            <span className="mr-card-nome">{recompensa.nome}</span>
            <div className="mr-card-data">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{recompensa.data}</span>
            </div>
          </div>
        </div>
        <span className={`mr-badge ${recompensa.status === "ativa" ? "mr-badge-ativa" : "mr-badge-utilizada"}`}>
          {recompensa.status === "ativa" ? "Ativa" : "Utilizada"}
        </span>
      </div>

      <div className="mr-card-bottom">
        <span className="mr-pontos">{recompensa.pontos} pontos</span>
        {recompensa.status === "ativa" && recompensa.codigo && (
          <span className="mr-codigo">{recompensa.codigo}</span>
        )}
        {recompensa.status === "utilizada" && (
          <div className="mr-check-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE / TABLET */}
      <div className="mr-screen">
        <div className="mr-header">
          <button className="mr-btn-voltar" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1>Minhas recompensas</h1>
        </div>

        <div className="mr-body">
          {recompensas.length === 0 ? (
            <div className="mr-vazio">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
              </svg>
              <p>Nenhuma recompensa resgatada</p>
            </div>
          ) : (
            recompensas.map((r) => <CardRecompensa key={r.id} recompensa={r} />)
          )}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mr-desktop">
        <div className="mr-desktop-left">
          <div className="mr-desktop-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h2>Suas<br />recompensas.</h2>
          <p>Acompanhe todas as recompensas que você resgatou com seus pontos de coleta.</p>
          <div className="mr-desktop-features">
            <div className="mr-desktop-feature">
              <div className="mr-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span>Recompensas resgatadas com seus pontos</span>
            </div>
            <div className="mr-desktop-feature">
              <div className="mr-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                </svg>
              </div>
              <span>Vouchers e produtos disponíveis</span>
            </div>
            <div className="mr-desktop-feature">
              <div className="mr-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span>Acompanhe o status de cada recompensa</span>
            </div>
          </div>
        </div>

        <div className="mr-desktop-right">
          <h1>Minhas recompensas</h1>
          <div className="mr-lista">
            {recompensas.length === 0 ? (
              <div className="mr-vazio">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                </svg>
                <p>Nenhuma recompensa resgatada</p>
              </div>
            ) : (
              recompensas.map((r) => <CardRecompensa key={r.id} recompensa={r} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
}
