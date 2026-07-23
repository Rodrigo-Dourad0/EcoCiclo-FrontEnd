import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gift, Star, Calendar, Check, Tag, Info, AlertCircle, ArrowLeft } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import "../styles/DetalhesRecompensa.css";

function DetalhesRecompensa() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const rawRecompensa = state.recompensa || {};
  const pontosUsuario = state.pontosAtuais || 0;

  const recompensa = {
    titulo: rawRecompensa.nome || "Recompensa não encontrada",
    tipo: rawRecompensa.categoria || "Desconhecido",
    descricao: rawRecompensa.desc || "Nenhuma descrição disponível.",
    pontosNecessarios: rawRecompensa.custo || 0,
    pontosUsuario: pontosUsuario,
    sobre: rawRecompensa.sobre || rawRecompensa.desc || "Sem informações adicionais.",
    validade: rawRecompensa.validade || "Sem validade informada.",
    observacao: rawRecompensa.observacao || "Nenhuma observação.",
    imagem: rawRecompensa.imagem || null,
  };

  const [resgatado, setResgatado] = useState(false);
  const podeResgatar = recompensa.pontosUsuario >= recompensa.pontosNecessarios;
  
  const handleResgatar = () => {
    if (podeResgatar) {
      setResgatado(true);
      // Aqui você poderia chamar a API de resgate real
    }
  };

  const progresso = Math.min(
    (recompensa.pontosNecessarios > 0 ? (recompensa.pontosUsuario / recompensa.pontosNecessarios) * 100 : 0),
    100
  );

  return (
    <div className="dr-page">
      <Navigation />

      <main className="dr-main">
        <section className="dr-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#f1f5f9' }}
            aria-label="Voltar"
          >
            <ArrowLeft size={24} color="#64748b" />
          </button>
          <div>
            <p className="dr-kicker">Recompensas</p>
            <h1>Detalhes da recompensa</h1>
            <p>Confira os detalhes da sua recompensa e resgate agora mesmo.</p>
          </div>
        </section>

        <section className="dr-content">

          {/* ── Hero Banner ── */}
          <div className="dr-hero" style={recompensa.imagem ? { padding: 0, backgroundColor: '#f1f5f9' } : {}}>
            {recompensa.imagem ? (
              <img 
                src={recompensa.imagem} 
                alt={recompensa.titulo} 
                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', inset: 0, padding: '24px' }} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <>
                <div className="dr-hero-bg" />
                <div className="dr-hero-icon">
                  <Gift size={48} />
                </div>
              </>
            )}
            <span className="dr-tipo-badge">
              <Tag size={11} />
              {recompensa.tipo}
            </span>
          </div>

          {/* ── Identidade ── */}
          <div className="dr-identity">
            <div>
              <h2 className="dr-titulo">{recompensa.titulo}</h2>
              <p className="dr-descricao">{recompensa.descricao}</p>
            </div>
          </div>

          <div className="dr-divider" />

          {/* ── Card de Pontos ── */}
          <div className="dr-pontos-card">
            <div className="dr-pontos-col">
              <span className="dr-pontos-label">Pontos necessários</span>
              <div className="dr-pontos-value">
                <Star size={16} className="dr-star" />
                <strong>{recompensa.pontosNecessarios}</strong>
                <span>pts</span>
              </div>
            </div>

            <div className="dr-pontos-sep" />

            <div className="dr-pontos-col dr-pontos-col--user">
              <span className="dr-pontos-label">Seus pontos</span>
              <div className="dr-pontos-value">
                <strong className={podeResgatar ? "dr-pts-ok" : "dr-pts-low"}>
                  {recompensa.pontosUsuario}
                </strong>
                <span>pts</span>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="dr-progress-wrap">
              <div className="dr-progress-track">
                <div
                  className="dr-progress-fill"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <span className="dr-progress-label">
                {podeResgatar
                  ? "Você tem pontos suficientes!"
                  : `Faltam ${recompensa.pontosNecessarios - recompensa.pontosUsuario} pontos`}
              </span>
            </div>
          </div>

          {/* ── Grid de infos ── */}
          <div className="dr-info-grid">
            <div className="dr-info-card">
              <div className="dr-info-icon">
                <Info size={15} />
              </div>
              <div>
                <span className="dr-info-label">Sobre</span>
                <p className="dr-info-text">{recompensa.sobre}</p>
              </div>
            </div>

            <div className="dr-info-card">
              <div className="dr-info-icon dr-info-icon--calendar">
                <Calendar size={15} />
              </div>
              <div>
                <span className="dr-info-label">Validade</span>
                <p className="dr-info-text dr-info-text--strong">{recompensa.validade}</p>
              </div>
            </div>
          </div>

          {/* ── Observação ── */}
          <div className="dr-obs-card">
            <AlertCircle size={15} className="dr-obs-icon" />
            <p className="dr-obs">{recompensa.observacao}</p>
          </div>

          {/* ── Botão ── */}
          {resgatado ? (
            <div className="dr-resgatado">
              <Check size={20} />
              Recompensa resgatada com sucesso!
            </div>
          ) : (
            <button
              className={`dr-btn ${!podeResgatar ? "dr-btn--desabilitado" : ""}`}
              onClick={handleResgatar}
              disabled={!podeResgatar}
            >
              <Gift size={18} />
              {podeResgatar ? "Resgatar recompensa" : "Pontos insuficientes"}
            </button>
          )}

        </section>
      </main>
    </div>
  );
}

export default DetalhesRecompensa;