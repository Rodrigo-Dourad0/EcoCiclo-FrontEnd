import { Calendar, CheckCircle2, Clock3, MapPin, Package, RefreshCw, Route, Star, User, Weight, AlertCircle } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMinhasColetas } from "../hooks/useMinhasColetas.js";
import "../styles/minhas-coletas.css";

function StatusIcon({ status }) {
  if (status === "CONCLUIDO") {
    return <CheckCircle2 size={14} />;
  }

  if (status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR") {
    return <Clock3 size={14} />;
  }

  return <Route size={14} />;
}

export default function MinhasColetas() {
  const {
    abaAtiva,
    setAbaAtiva,
    coletasFiltradas,
    contagens,
    resumo,
    loading,
    error,
    recarregar,
  } = useMinhasColetas();

  return (
    <div className="mc-page">
      <Navigation />

      <main className="mc-main">
        <section className="mc-header">
          <p className="mc-kicker">Coletor</p>
          <h1>Minhas coletas</h1>
          <p className="mc-subtitle">
            Veja as coletas que você aceitou e as que já foram concluídas.
          </p>
        </section>

        <section className="mc-summary">
          <article className="mc-summary-card">
            <span className="mc-summary-label">Aceitas</span>
            <strong>{resumo.emAndamento}</strong>
            <small>Coletas em andamento no seu fluxo</small>
          </article>

          <article className="mc-summary-card">
            <span className="mc-summary-label">Concluídas</span>
            <strong>{resumo.finalizadas}</strong>
            <small>Coletas já finalizadas com pontos gerados</small>
          </article>

          <article className="mc-summary-card">
            <span className="mc-summary-label">Total</span>
            <strong>{resumo.total}</strong>
            <small>Histórico geral da sua atuação</small>
          </article>
        </section>

        <section className="mc-content">
          <div className="mc-abas">
            <button
              className={`mc-aba ${abaAtiva === "aceitas" ? "mc-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("aceitas")}
            >
              <span className="mc-aba-label">Aceitas</span>
              <span className={`mc-aba-count ${abaAtiva === "aceitas" ? "mc-aba-count--ativa" : ""}`}>
                {contagens.aceitas}
              </span>
            </button>

            <button
              className={`mc-aba ${abaAtiva === "concluidas" ? "mc-aba--ativa" : ""}`}
              onClick={() => setAbaAtiva("concluidas")}
            >
              <span className="mc-aba-label">Concluídas</span>
              <span className={`mc-aba-count ${abaAtiva === "concluidas" ? "mc-aba-count--ativa" : ""}`}>
                {contagens.concluidas}
              </span>
            </button>
          </div>

          {error && (
            <div className="mc-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="mc-recarregar-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          <div className="mc-lista">
            {loading ? (
              <div className="mc-empty">
                <Package size={40} strokeWidth={1.2} />
                <p>Carregando suas coletas.</p>
                <span>Estamos buscando os agendamentos vinculados ao seu perfil.</span>
              </div>
            ) : coletasFiltradas.length === 0 ? (
              <div className="mc-empty">
                <Package size={40} strokeWidth={1.2} />
                <p>Nenhuma coleta encontrada nessa aba.</p>
                <span>As coletas aceitas e concluídas aparecerão aqui quando forem vinculadas ao seu usuário.</span>
              </div>
            ) : (
              coletasFiltradas.map((coleta, index) => (
                <article className="mc-card" key={coleta.id} style={{ animationDelay: `${index * 60}ms` }}>
                  <div
                    className={`mc-card-stripe ${
                      coleta.status === "CONCLUIDO" ? "mc-card-stripe--concluida" : "mc-card-stripe--ativa"
                    }`}
                  />

                  <div className="mc-card-inner">
                    <div className="mc-card-header">
                      <div className="mc-card-title">
                        <div className="mc-icon-wrap">
                          <Package size={18} />
                        </div>
                        <div>
                          <h3>{coleta.doacao?.nome || "Coleta"}</h3>
                          <p>{coleta.destaque}</p>
                        </div>
                      </div>

                      <span className={`mc-badge ${coleta.statusClass}`}>
                        <StatusIcon status={coleta.status} />
                        {coleta.statusLabel}
                      </span>
                    </div>

                    <div className="mc-divider" />

                    <div className="mc-card-body">
                      <div className="mc-meta-grid">
                        <div className="mc-meta-item">
                          <Calendar size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Data e hora</span>
                            <span className="mc-meta-value">{coleta.dataColetaFormatada}</span>
                          </div>
                        </div>

                        <div className="mc-meta-item">
                          <MapPin size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Endereço</span>
                            <span className="mc-meta-value">{coleta.endereco?.completo || "Endereco nao informado"}</span>
                          </div>
                        </div>

                        <div className="mc-meta-item">
                          <Weight size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Peso estimado</span>
                            <span className="mc-meta-value mc-meta-value--strong">
                              {coleta.doacao?.peso != null ? `${coleta.doacao.peso} kg` : "Nao informado"}
                            </span>
                          </div>
                        </div>

                        <div className="mc-meta-item">
                          <User size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Doador</span>
                            <span className="mc-meta-value mc-meta-value--strong">
                              {coleta.doador?.nome || "Doador nao informado"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mc-observacao">
                        {coleta.observacoes || coleta.etapa || "Sem observações."}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <section className="mc-footer-note">
            <Star size={16} />
            <p>
              As coletas aceitas seguem em andamento até a conclusão. As concluídas ficam registradas
              no histórico da sua atuação.
            </p>
          </section>
        </section>
      </main>
    </div>
  );
}
