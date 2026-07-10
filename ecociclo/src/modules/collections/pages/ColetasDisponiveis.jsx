import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Package, MapPin, Clock, Weight, User, CheckCircle,
  Zap, Info, X, Star, Phone, FileText, Hash, Image,
  Navigation2, Flag, Calendar,
} from "lucide-react";

import { Navigation } from "../../../shared/components/Navigation/Navigation";
import useColetasDisponiveis from "../hooks/useColetasDisponiveis";
import "../styles/ColetasDisponiveis.css";

/* ─── Toast ─────────────────────────────────────── */
function Toast({ mensagem, visivel }) {
  return (
    <div className={`cd-toast ${visivel ? "show" : ""}`}>
      <span className="cd-toast-dot" />
      {mensagem}
    </div>
  );
}

/* ─── Partículas ────────────────────────────────── */
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

/* ─── Componente principal ──────────────────────── */
export default function ColetasDisponiveis() {
  const navigate = useNavigate();

  const {
    busca, setBusca,
    categoriaAtiva, setCategoriaAtiva,
    categorias, coletasFiltradas,
    coletasAtivas, limiteColetas, limiteAtingido,
    totalDisponiveis,
    aceitarColeta, idsEmProcessamento, coletasAceitas,
    toastVisivel, toastMensagem,
  } = useColetasDisponiveis();

  const btnRefs = useRef({});
  const aceitarBtnRef = useRef(null);
  const [coletaDetalhes, setColetaDetalhes] = useState(null);

  useEffect(() => {
    coletasAceitas.forEach((item) => {
      if (btnRefs.current[item.id]) {
        spawnParticles(btnRefs.current[item.id]);
        delete btnRefs.current[item.id];
      }
    });
  }, [coletasAceitas]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setColetaDetalhes(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Atualiza coletaDetalhes quando coletasAceitas muda (para refletir estado aceito dentro do modal)
  useEffect(() => {
    if (!coletaDetalhes) return;
    const atualizada = coletasAceitas.find((c) => c.id === coletaDetalhes.id);
    if (atualizada) setColetaDetalhes((prev) => ({ ...prev, status: "Aceita" }));
  }, [coletasAceitas]);

  const isAceita = (id) => coletasAceitas.some((c) => c.id === id);
  const isProcessando = (id) => idsEmProcessamento.includes(id);

  const handleAceitarNoModal = () => {
    if (!coletaDetalhes) return;
    aceitarColeta(coletaDetalhes.id);
  };

  return (
    <div className="cd-page">
      <Navigation />

      <main className="cd-main">
        <div className="cd-container">

          {/* Cabeçalho */}
          <header className="cd-header">
            <p className="cd-kicker"><Zap size={13} />Coletor</p>
            <h1>Coletas Disponíveis</h1>
            <p className="cd-header-sub">Escolha uma coleta para realizar.</p>
          </header>

          {/* Resumo */}
          <section className="cd-resumo">
            <div className="cd-resumo-card">
              <div className="cd-resumo-icon"><Package size={22} /></div>
              <div>
                <strong>{coletasAtivas}/{limiteColetas}</strong>
                <span>Coletas ativas</span>
              </div>
            </div>
            <div className="cd-resumo-card cd-resumo-card--destaque">
              <div className="cd-resumo-icon cd-resumo-icon--destaque"><CheckCircle size={22} /></div>
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
                <div className="cd-empty-icon"><Package size={40} strokeWidth={1.2} /></div>
                <h3>Nenhuma coleta encontrada</h3>
                <span>Tente alterar os filtros ou aguarde novas coletas.</span>
              </div>
            ) : (
              coletasFiltradas.map((coleta, index) => {
                const coletaJaAceita = isAceita(coleta.id);
                const emProcessamento = isProcessando(coleta.id);

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

                      {/* Footer — só botão Detalhes */}
                      <div className="cd-footer">
                        <button
                          className="cd-btn-detalhes"
                          onClick={() => setColetaDetalhes(coleta)}
                        >
                          <Info size={14} />
                          Detalhes
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

      <Toast visivel={toastVisivel} mensagem={toastMensagem} />

      {/* ════════════════════════════════
          MODAL DE DETALHES COMPLETO
      ════════════════════════════════ */}
      {coletaDetalhes && (() => {
        const jaAceita    = isAceita(coletaDetalhes.id);
        const processando = isProcessando(coletaDetalhes.id);

        return (
          <div className="cd-modal-overlay" onClick={() => setColetaDetalhes(null)}>
            <div className="cd-modal" onClick={(e) => e.stopPropagation()}>

              {/* ── Header ── */}
              <div className="cd-modal-header">
                <div className="cd-modal-header-left">
                  <div className="cd-modal-icon"><Package size={22} /></div>
                  <div>
                    <h2>{coletaDetalhes.material}</h2>
                    <span className="cd-modal-id">
                      <Hash size={11} />
                      {coletaDetalhes.codigoId}
                    </span>
                  </div>
                </div>
                <button className="cd-modal-close" onClick={() => setColetaDetalhes(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="cd-modal-scroll">

                {/* Status + categoria */}
                <div className="cd-modal-status-row cd-modal-status-row--top">
                  <span className={`cd-modal-status ${jaAceita ? "cd-modal-status--aceita" : ""}`}>
                    <CheckCircle size={12} />
                    {jaAceita ? "Aceita" : coletaDetalhes.status}
                  </span>
                  <span className="cd-modal-categoria">{coletaDetalhes.categoria}</span>
                  <span className="cd-modal-dist">
                    <Navigation2 size={11} />
                    {coletaDetalhes.distancia}
                  </span>
                </div>

                <div className="cd-modal-divider" />

                {/* Grid de info */}
                <div className="cd-modal-body">

                  {/* Doador + Telefone */}
                  <div className="cd-modal-row">
                    <div className="cd-modal-item">
                      <User size={15} className="cd-modal-item-icon" />
                      <div>
                        <span className="cd-modal-item-label">Doador</span>
                        <span className="cd-modal-item-value">{coletaDetalhes.doador}</span>
                      </div>
                    </div>
                    <div className="cd-modal-item">
                      <Phone size={15} className="cd-modal-item-icon" />
                      <div>
                        <span className="cd-modal-item-label">Contato</span>
                        <span className="cd-modal-item-value">{coletaDetalhes.telefone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Data + Peso */}
                  <div className="cd-modal-row">
                    <div className="cd-modal-item">
                      <Calendar size={15} className="cd-modal-item-icon" />
                      <div>
                        <span className="cd-modal-item-label">Data e horário</span>
                        <span className="cd-modal-item-value">{coletaDetalhes.dataHoraCompleta}</span>
                      </div>
                    </div>
                    <div className="cd-modal-item">
                      <Weight size={15} className="cd-modal-item-icon" />
                      <div>
                        <span className="cd-modal-item-label">Peso estimado</span>
                        <span className="cd-modal-item-value">{coletaDetalhes.peso}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pontos */}
                  <div className="cd-modal-row">
                    <div className="cd-modal-item">
                      <Star size={15} className="cd-modal-item-icon cd-modal-item-icon--star" />
                      <div>
                        <span className="cd-modal-item-label">Pontos</span>
                        <span className="cd-modal-item-value cd-modal-pts">+{coletaDetalhes.pontos} pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Endereço completo */}
                  <div className="cd-modal-item cd-modal-item--full">
                    <MapPin size={15} className="cd-modal-item-icon" />
                    <div>
                      <span className="cd-modal-item-label">Endereço completo</span>
                      <span className="cd-modal-item-value">{coletaDetalhes.enderecoCompleto}</span>
                    </div>
                  </div>

                  {/* Mapa */}
                  <div className="cd-modal-mapa">
                    <iframe
                      title="mapa"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(coletaDetalhes.enderecoCompleto)}&output=embed`}
                    />
                  </div>

                  {/* Descrição completa */}
                  <div className="cd-modal-item cd-modal-item--full">
                    <FileText size={15} className="cd-modal-item-icon" />
                    <div>
                      <span className="cd-modal-item-label">Descrição completa</span>
                      <span className="cd-modal-item-value">{coletaDetalhes.descricaoCompleta}</span>
                    </div>
                  </div>

                  {/* Observações */}
                  <div className="cd-modal-obs">
                    <span className="cd-modal-obs-label">
                      <Flag size={12} />
                      Observações
                    </span>
                    <p>{coletaDetalhes.observacoes}</p>
                  </div>

                  {/* Fotos */}
                  <div className="cd-modal-fotos">
                    <span className="cd-modal-fotos-label">
                      <Image size={12} />
                      Fotos dos materiais
                    </span>
                    {coletaDetalhes.fotos && coletaDetalhes.fotos.length > 0 ? (
                      <div className="cd-modal-fotos-grid">
                        {coletaDetalhes.fotos.map((foto, i) => (
                          <img key={i} src={foto} alt={`Material ${i + 1}`} />
                        ))}
                      </div>
                    ) : (
                      <div className="cd-modal-fotos-empty">
                        <Image size={28} strokeWidth={1.2} />
                        <span>Nenhuma foto disponível</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* ── Botões de ação ── */}
                <div className="cd-modal-actions">
                  {/* Aceitar coleta */}
                  <button
                    ref={(el) => {
                      if (el && processando) aceitarBtnRef.current = el;
                    }}
                    className={`cd-modal-btn cd-modal-btn--aceitar ${
                      jaAceita ? "cd-btn--aceito" :
                      processando ? "cd-btn--aceitando" :
                      limiteAtingido ? "cd-btn--bloqueado" : ""
                    }`}
                    disabled={jaAceita || processando || limiteAtingido}
                    onClick={handleAceitarNoModal}
                  >
                    {jaAceita ? (
                      <><CheckCircle size={16} />Coleta aceita!</>
                    ) : processando ? (
                      <><span className="cd-spinner" />Confirmando...</>
                    ) : limiteAtingido ? (
                      "Limite atingido"
                    ) : (
                      <><CheckCircle size={16} />Aceitar coleta</>
                    )}
                  </button>

                  {/* Visualizar rota */}
                  <button
                    className="cd-modal-btn cd-modal-btn--rota"
                    onClick={() => navigate("/visualizar-rota")}
                  >
                    <Navigation2 size={16} />
                    Visualizar rota
                  </button>

                  {/* Finalizar coleta — só aparece se já aceita */}
                  {jaAceita && (
                    <button
                      className="cd-modal-btn cd-modal-btn--finalizar"
                      onClick={() => navigate("/finalizar-coleta")}
                    >
                      <Flag size={16} />
                      Finalizar coleta
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}