import { useEffect, useRef } from "react";
import {
  Search,
  Package,
  MapPin,
  Clock,
  Weight,
  Award,
  User,
  CheckCircle,
  Zap,
} from "lucide-react";

import { Navigation } from "../../../shared/components/Navigation/Navigation";
import useColetasDisponiveis from "../hooks/useColetasDisponiveis";
import "../styles/ColetasDisponiveis.css";

/* ─── Toast ──────────────────────────────────────────────── */
function Toast({ mensagem, visivel }) {
  return (
    <div className={`cd-toast ${visivel ? "show" : ""}`}>
      <span className="cd-toast-dot" />
      {mensagem}
    </div>
  );
}

/* ─── Partículas de aceitação ────────────────────────────── */
function spawnParticles(buttonEl) {
  if (!buttonEl) return;
  const rect = buttonEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ["#22c55e", "#4ade80", "#86efac", "#16a34a", "#bbf7d0"];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "cd-burst-particle";
    p.style.left = cx + "px";
    p.style.top  = cy + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    const size = 4 + Math.random() * 6;
    p.style.width = p.style.height = size + "px";
    document.body.appendChild(p);

    const angle = (Math.PI * 2 / count) * i + Math.random() * 0.6;
    const dist  = 55 + Math.random() * 70;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const dur = 600 + Math.random() * 400;

    p.animate(
      [
        { opacity: 1, transform: "translate(0,0) scale(1)" },
        { opacity: 0, transform: `translate(${tx}px,${ty}px) scale(0)` },
      ],
      { duration: dur, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" }
    ).onfinish = () => p.remove();
  }
}

/* ─── Componente principal ───────────────────────────────── */
export default function ColetasDisponiveis() {
  const {
    busca,
    setBusca,
    categoriaAtiva,
    setCategoriaAtiva,
    categorias,
    coletasFiltradas,
    coletasAtivas,
    limiteColetas,
    limiteAtingido,
    totalDisponiveis,
    pontosColetor,
    aceitarColeta,
    idsEmProcessamento,
    coletasAceitas,
    toastVisivel,
    toastMensagem,
  } = useColetasDisponiveis();

  const btnRefs = useRef({});

  /* dispara partículas quando a coleta passa de "processando" → "aceita" */
  useEffect(() => {
    coletasAceitas.forEach((item) => {
      if (btnRefs.current[item.id]) {
        spawnParticles(btnRefs.current[item.id]);
        delete btnRefs.current[item.id]; // dispara só uma vez
      }
    });
  }, [coletasAceitas]);

  return (
    <div className="cd-page">
      <Navigation />

      <main className="cd-main">
        <div className="cd-container">

          {/* Cabeçalho */}
          <header className="cd-header">
            <div className="cd-header-conteudo">
                <div className="cd-header-texto">
                <p className="cd-kicker">
                    <Zap size={13} />
                    Coletor
                </p>

                <h1>Coletas Disponíveis</h1>

                <p className="cd-header-sub">
                    Escolha uma coleta para realizar e ganhe pontos.
                </p>
                </div>

                <div className="cd-pontos-resumo">
                <div className="cd-pontos-resumo-icon">
                    <Award size={19} />
                </div>

                <div>
                    <strong>{pontosColetor.toLocaleString("pt-BR")}</strong>
                    <span>Pontos acumulados</span>
                </div>
                </div>
            </div>
            </header>

          {/* Resumo */}
          <section className="cd-resumo">
            <div className="cd-resumo-card">
              <div className="cd-resumo-icon">
                <Package size={22} />
              </div>
              <div>
                <strong>{coletasAtivas}/{limiteColetas}</strong>
                <span>Coletas ativas</span>
              </div>
            </div>
            <div className="cd-resumo-card cd-resumo-card--destaque">
              <div className="cd-resumo-icon cd-resumo-icon--destaque">
                <CheckCircle size={22} />
              </div>
              <div>
                <strong>{totalDisponiveis}</strong>
                <span>Disponíveis</span>
              </div>
            </div>
          </section>

          {limiteAtingido && (
            <div className="cd-alerta">
              <Zap size={16} />
              Você atingiu o limite máximo de coletas simultâneas.
            </div>
          )}

          {/* Busca */}
          <div className="cd-search">
            <Search size={17} className="cd-search-icon" />
            <input
              type="text"
              placeholder="Pesquisar material ou endereço..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* Categorias */}
          <div className="cd-categorias">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaAtiva(categoria)}
                className={categoriaAtiva === categoria ? "cd-chip ativo" : "cd-chip"}
              >
                {categoria}
              </button>
            ))}
          </div>

          {/* Lista */}
          <section className="cd-lista">
            {coletasFiltradas.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">
                  <Package size={40} strokeWidth={1.2} />
                </div>
                <h3>Nenhuma coleta encontrada</h3>
                <span>Tente alterar os filtros ou aguarde novas coletas.</span>
              </div>
            ) : (
              coletasFiltradas.map((coleta, index) => {
                const coletaJaAceita = coletasAceitas.some((item) => item.id === coleta.id);
                const emProcessamento = idsEmProcessamento.includes(coleta.id);

                return (
                  <article
                    key={coleta.id}
                    className={`cd-card ${coletaJaAceita ? "cd-card--aceita" : ""}`}
                    style={{ animationDelay: `${index * 65}ms` }}
                  >
                    <div className={`cd-stripe ${coletaJaAceita ? "cd-stripe--aceita" : ""}`} />

                    <div className="cd-card-inner">
                      <div className="cd-card-header">
                        <div className="cd-card-title">
                          <div className={`cd-material-icon ${coletaJaAceita ? "cd-material-icon--aceita" : ""}`}>
                            <Package size={18} />
                          </div>
                          <div>
                            <h3>{coleta.material}</h3>
                            <span className="cd-card-desc">{coleta.descricao}</span>
                          </div>
                        </div>
                        <div className={`cd-status ${coletaJaAceita ? "cd-status--aceita" : ""}`}>
                          {coletaJaAceita ? "Aceita ✓" : "Disponível"}
                        </div>
                      </div>

                      <div className="cd-divider" />

                      <div className="cd-info">
                        <div className="cd-info-item">
                          <User size={15} className="cd-info-icon" />
                          <div>
                            <span className="cd-info-label">Doador</span>
                            <span className="cd-info-value">{coleta.doador}</span>
                          </div>
                        </div>
                        <div className="cd-info-item">
                          <Weight size={15} className="cd-info-icon" />
                          <div>
                            <span className="cd-info-label">Peso estimado</span>
                            <span className="cd-info-value">{coleta.peso}</span>
                          </div>
                        </div>
                        <div className="cd-info-item">
                          <Clock size={15} className="cd-info-icon" />
                          <div>
                            <span className="cd-info-label">Horário</span>
                            <span className="cd-info-value">{coleta.horario}</span>
                          </div>
                        </div>
                        <div className="cd-info-item">
                          <MapPin size={15} className="cd-info-icon" />
                          <div>
                            <span className="cd-info-label">Endereço</span>
                            <span className="cd-info-value">{coleta.endereco}</span>
                          </div>
                        </div>
                      </div>

                      <div className="cd-footer">
                        <div className="cd-pontos">
                          <Award size={16} />
                          <span>{coleta.pontos} pontos</span>
                        </div>

                        <button
                          ref={(el) => {
                            if (el && emProcessamento) btnRefs.current[coleta.id] = el;
                          }}
                          className={`cd-btn ${
                            coletaJaAceita
                              ? "cd-btn--aceito"
                              : emProcessamento
                              ? "cd-btn--aceitando"
                              : limiteAtingido
                              ? "cd-btn--bloqueado"
                              : ""
                          }`}
                          disabled={coletaJaAceita || emProcessamento || limiteAtingido}
                          onClick={() => aceitarColeta(coleta.id)}
                        >
                          {coletaJaAceita ? (
                            <>
                              <CheckCircle size={16} />
                              Coleta aceita!
                            </>
                          ) : emProcessamento ? (
                            <>
                              <span className="cd-spinner" />
                              Confirmando...
                            </>
                          ) : limiteAtingido ? (
                            "Limite atingido"
                          ) : (
                            "Aceitar coleta"
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </div>
      </main>

      {/* Toast de confirmação */}
      <Toast visivel={toastVisivel} mensagem={toastMensagem} />
    </div>
  );
}