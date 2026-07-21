import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gift,
  Lock,
  Check,
  Leaf,
  HelpCircle,
  ChevronRight,
  X,
  Recycle,
  Star,
  ArrowRightLeft,
  RefreshCw,
  AlertCircle,
  Package,
} from "lucide-react";
import "../styles/Recompensas.css";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useRecompensas } from "../hooks/useRecompensas";

function Recompensas() {
  const navigate = useNavigate();
  const {
    pontosAtuais,
    proximoNivel,
    progresso,
    recompensasFiltradas,
    categoriasDisponiveis,
    disponiveis,
    busca,
    setBusca,
    categoria,
    setCategoria,
    loading,
    error,
    mensagem,
    resgatandoId,
    resgatar,
    recarregar,
  } = useRecompensas();
  const [mostrarAjuda, setMostrarAjuda] = useState(false);

  function calcularNivel(pontos) {
    if (pontos >= 1500) return "Ouro";
    if (pontos >= 500) return "Prata";
    return "Bronze";
  }

  function renderBadge(status, custo) {
    if (status === "disponivel") {
      return (
        <span className="rw-card-badge disponivel">
          <Gift size={13} /> {custo} pts
        </span>
      );
    }

    return (
      <span className="rw-card-badge bloqueado">
        <Lock size={13} /> {custo} pts
      </span>
    );
  }

  return (
    <div className="app-container">
      <Navigation />

      <main className="recompensas-main">
        <div className="recompensas-container">
          <header className="rw-top-header">
            <div className="rw-header-esquerda">
              <h2 className="rw-top-title">Recompensas</h2>
              <button
                className="rw-help-button"
                onClick={() => setMostrarAjuda(true)}
                aria-label="Como funciona o sistema de recompensas"
                title="Como funciona?"
              >
                <HelpCircle size={18} />
              </button>
            </div>
            <button
              className="rw-minhas-recompensas-btn"
              onClick={() => navigate("/minhas-recompensas")}
            >
              <Gift size={16} />
              Minhas recompensas
              <ChevronRight size={16} />
            </button>
          </header>

          {mostrarAjuda && (
            <div className="rw-modal-overlay" onClick={() => setMostrarAjuda(false)}>
              <div className="rw-modal" onClick={(e) => e.stopPropagation()}>
                <div className="rw-modal-header">
                  <div className="rw-modal-icone-titulo">
                    <div className="rw-modal-icone">
                      <HelpCircle size={22} />
                    </div>
                    <h3 className="rw-modal-titulo">Como funciona?</h3>
                  </div>
                  <button
                    className="rw-modal-fechar"
                    onClick={() => setMostrarAjuda(false)}
                    aria-label="Fechar modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="rw-modal-body">
                  <p className="rw-modal-descricao">
                    Entenda como ganhar pontos e trocar por recompensas incríveis!
                  </p>

                  <div className="rw-modal-passos">
                    <div className="rw-modal-passo">
                      <div className="rw-modal-passo-numero">1</div>
                      <div className="rw-modal-passo-conteudo">
                        <div className="rw-modal-passo-icone">
                          <Recycle size={20} />
                        </div>
                        <div>
                          <strong>Recicle</strong>
                          <span>Conclua uma reciclagem com sucesso na plataforma.</span>
                        </div>
                      </div>
                    </div>

                    <div className="rw-modal-passo">
                      <div className="rw-modal-passo-numero">2</div>
                      <div className="rw-modal-passo-conteudo">
                        <div className="rw-modal-passo-icone">
                          <Star size={20} />
                        </div>
                        <div>
                          <strong>Ganhe pontos</strong>
                          <span>Cada reciclagem concluída gera pontos automaticamente para você.</span>
                        </div>
                      </div>
                    </div>

                    <div className="rw-modal-passo">
                      <div className="rw-modal-passo-numero">3</div>
                      <div className="rw-modal-passo-conteudo">
                        <div className="rw-modal-passo-icone">
                          <ArrowRightLeft size={20} />
                        </div>
                        <div>
                          <strong>Troque por recompensas</strong>
                          <span>Use seus pontos acumulados para resgatar produtos e vouchers exclusivos.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rw-modal-footer">
                  <button className="rw-modal-btn-entendi" onClick={() => setMostrarAjuda(false)}>
                    Entendi!
                  </button>
                </div>
              </div>
            </div>
          )}

          <section className="rw-pontos-resumo">
            <div className="rw-pontos-icone">
              <Leaf size={28} />
            </div>
            <div className="rw-pontos-info">
              <span className="rw-pontos-valor">{pontosAtuais.toLocaleString("pt-BR")}</span>
              <span className="rw-pontos-label">Pontos acumulados</span>
            </div>
            <div className="rw-pontos-extra">
              <span className="rw-pontos-nivel">Nível {calcularNivel(pontosAtuais)}</span>
              <span className="rw-pontos-proximo">
                {Math.max(0, proximoNivel - pontosAtuais)} pts p/ Ouro
              </span>
            </div>
          </section>

          <section className="rw-status-sistema">
            <div className="rw-status-chip">
              <Check size={14} />
              <span>{disponiveis} recompensas disponíveis</span>
            </div>
            <div className="rw-status-chip rw-status-chip--secundario">
              <Star size={14} />
              <span>{recompensasFiltradas.length} itens na lista</span>
            </div>
          </section>

          <section className="rw-progresso">
            <div className="rw-progresso-label">
              <span className="rw-progresso-texto">Progresso para o nível Ouro</span>
              <span className="rw-progresso-valor">{progresso}%</span>
            </div>
            <div className="rw-progresso-barra">
              <div className="rw-progresso-preenchimento" style={{ width: `${progresso}%` }} />
            </div>
          </section>

          <section className="rw-recompensas">
            <div className="rw-recompensas-header">
              <input
                type="text"
                className="rw-search"
                placeholder="Buscar recompensas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <select
                className="rw-categorias"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categoriasDisponiveis.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

          {error && (
            <div className="rw-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="rw-alerta-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          {mensagem && !error && (
            <div className="rw-alerta rw-alerta--sucesso">
              <Check size={16} />
              <span>{mensagem}</span>
            </div>
          )}

            <div className="rw-lista">
              {loading ? (
                <div className="rw-empty">
                  <Package size={40} strokeWidth={1.2} />
                  <strong>Carregando recompensas</strong>
                  <span>Buscando os itens cadastrados no sistema.</span>
                </div>
              ) : recompensasFiltradas.length === 0 ? (
                <div className="rw-empty">
                  <Package size={40} strokeWidth={1.2} />
                  <strong>Nenhuma recompensa encontrada</strong>
                  <span>Refine a busca ou aguarde novas recompensas serem cadastradas.</span>
                </div>
              ) : (
                recompensasFiltradas.map((item) => (
                  <div key={item.id} className="rw-card">
                    <div className={`rw-card-icone ${item.cor}`}>{item.emoji}</div>
                    <div className="rw-card-info">
                      <span className="rw-card-nome">{item.nome}</span>
                      <span className="rw-card-desc">{item.desc}</span>
                      <span className="rw-card-meta">
                        {item.categoria} · {item.quantidade} em estoque
                      </span>
                    </div>
                    <div className="rw-card-acoes">
                      {renderBadge(item.status, item.custo)}
                      <button
                        type="button"
                        className="rw-card-resgatar"
                        onClick={() => resgatar(item)}
                        disabled={item.status !== "disponivel" || resgatandoId === item.id}
                      >
                        {resgatandoId === item.id ? "Resgatando..." : "Resgatar"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Recompensas;
