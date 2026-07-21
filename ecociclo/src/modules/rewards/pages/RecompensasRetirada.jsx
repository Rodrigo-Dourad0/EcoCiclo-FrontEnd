import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock3, Gift, RefreshCw, AlertCircle, Package, Star, User, Calendar } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useRecompensasRetirada } from "../hooks/useRecompensasRetirada";
import "../styles/RecompensasRetirada.css";

export default function RecompensasRetirada() {
  const navigate = useNavigate();
  const {
    pendentes,
    retiradas,
    listaAtiva,
    abaAtiva,
    setAbaAtiva,
    loading,
    error,
    mensagem,
    contagens,
    confirmandoId,
    confirmarRetirada,
    recarregar,
  } = useRecompensasRetirada();

  return (
    <div className="rr-page">
      <Navigation />

      <main className="rr-main">
        <div className="rr-container">
          <header className="rr-header">
            <div>
              <p className="rr-kicker">Administração</p>
              <h1>Recompensas para retirada</h1>
              <p>Confirme quando o doador vier buscar o brinde fisicamente.</p>
            </div>

            <button className="rr-voltar-btn" onClick={() => navigate("/gerenciar-recompensa")}>
              <Gift size={16} />
              Voltar para recompensas
            </button>
          </header>

          <section className="rr-stats">
            <div className="rr-stat">
              <div className="rr-stat-icon rr-stat-icon--total">
                <Package size={18} />
              </div>
              <div>
                <strong>{contagens.total}</strong>
                <span>Resgates pendentes</span>
              </div>
            </div>
            <div className="rr-stat">
              <div className="rr-stat-icon rr-stat-icon--pontos">
                <Star size={18} />
              </div>
              <div>
                <strong>{contagens.pontos}</strong>
                <span>Pontos bloqueados</span>
              </div>
            </div>
            <div className="rr-stat">
              <div className="rr-stat-icon rr-stat-icon--retiradas">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <strong>{contagens.retiradas}</strong>
                <span>Já retiradas</span>
              </div>
            </div>
          </section>

          <section className="rr-abas">
            <button
              type="button"
              className={`rr-aba ${abaAtiva === "pendentes" ? "rr-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("pendentes")}
            >
              Pendentes
              <span>{pendentes.length}</span>
            </button>
            <button
              type="button"
              className={`rr-aba ${abaAtiva === "retiradas" ? "rr-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("retiradas")}
            >
              Já retiradas
              <span>{retiradas.length}</span>
            </button>
          </section>

          {mensagem && !error && (
            <div className="rr-alerta rr-alerta--sucesso">
              <CheckCircle2 size={16} />
              <span>{mensagem}</span>
            </div>
          )}

          {error && (
            <div className="rr-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="rr-alerta-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          <section className="rr-lista">
            {loading ? (
              <div className="rr-empty">
                <Clock3 size={36} />
                <strong>Carregando recompensas</strong>
                <span>Buscando os resgates e o histórico de retiradas.</span>
              </div>
            ) : listaAtiva.length === 0 ? (
              <div className="rr-empty">
                <Gift size={36} />
                <strong>
                  {abaAtiva === "retiradas" ? "Nenhuma recompensa retirada" : "Nenhuma recompensa pendente"}
                </strong>
                <span>
                  {abaAtiva === "retiradas"
                    ? "As recompensas já retiradas vão aparecer aqui."
                    : "Quando houver resgates aguardando retirada, eles aparecerão aqui."}
                </span>
              </div>
            ) : (
              listaAtiva.map((resgate, index) => (
                <article className="rr-card" key={resgate.id} style={{ animationDelay: `${index * 55}ms` }}>
                  <div className="rr-card-acento" />

                  <div className="rr-card-body">
                    <div className="rr-card-top">
                      <div>
                        <h3>{resgate.recompensaNome}</h3>
                        <p>Resgate de {resgate.doadorNome}</p>
                      </div>

                      <span className="rr-badge">
                        {resgate.status === "CONCLUIDO" ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                        {resgate.status === "CONCLUIDO" ? "Retirada confirmada" : "Pendente"}
                      </span>
                    </div>

                    <div className="rr-meta-grid">
                      <div className="rr-meta-item">
                        <User size={14} />
                        <div>
                          <span className="rr-meta-label">Doador</span>
                          <span className="rr-meta-value">{resgate.doadorNome}</span>
                        </div>
                      </div>

                      <div className="rr-meta-item">
                        <Calendar size={14} />
                        <div>
                          <span className="rr-meta-label">Data do resgate</span>
                          <span className="rr-meta-value">{resgate.data}</span>
                        </div>
                      </div>

                      <div className="rr-meta-item">
                        <Star size={14} />
                        <div>
                          <span className="rr-meta-label">Pontos gastos</span>
                          <span className="rr-meta-value">{resgate.pontosGastos}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rr-card-footer">
                      {resgate.status === "PENDENTE" ? (
                        <button
                          type="button"
                          className="rr-confirmar-btn"
                          onClick={() => confirmarRetirada(resgate.id)}
                          disabled={confirmandoId === resgate.id}
                        >
                          {confirmandoId === resgate.id ? "Confirmando..." : "Confirmar retirada"}
                        </button>
                      ) : (
                        <span className="rr-retirada-info">Retirada já confirmada pelo administrador.</span>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
