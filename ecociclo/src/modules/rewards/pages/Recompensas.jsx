import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Gift, Lock, Check, Leaf, Bell } from 'lucide-react'
import '../styles/Recompensas.css'
import { Navigation } from '../../../shared/components/Navigation/Navigation.jsx'

/**
 * Página de Recompensas — exibe pontos acumulados, nível,
 * recompensas disponíveis e histórico de resgates (dados mockados).
 */
function Recompensas() {

  const navigate = useNavigate()

  /* ── Dados mockados ──────────────────────────── */
  const pontosAtuais = 1250
  const proximoNivel = 1500
  const progresso = Math.round((pontosAtuais / proximoNivel) * 100)

  const recompensas = [
    {
      id: 1,
      nome: 'Desconto 10% — Loja Eco',
      desc: 'Válido em produtos sustentáveis',
      emoji: '🛍️',
      cor: 'verde',
      custo: 500,
      status: 'resgatado',
    },
    {
      id: 2,
      nome: 'Sacola Ecológica',
      desc: 'Sacola reutilizável personalizada',
      emoji: '🌿',
      cor: 'azul',
      custo: 800,
      status: 'disponivel',
    },
    {
      id: 3,
      nome: 'Copo Térmico 350ml',
      desc: 'Aço inoxidável, livre de BPA',
      emoji: '☕',
      cor: 'amarelo',
      custo: 1200,
      status: 'disponivel',
    },
    {
      id: 4,
      nome: 'Kit Composteira Doméstica',
      desc: 'Transforme resíduos em adubo',
      emoji: '🌱',
      cor: 'roxo',
      custo: 2000,
      status: 'bloqueado',
    },
    {
      id: 5,
      nome: 'Voucher Restaurante Orgânico',
      desc: 'R$50 em refeições orgânicas',
      emoji: '🥗',
      cor: 'rosa',
      custo: 2500,
      status: 'bloqueado',
    },
  ]

  const historico = [
    { id: 1, nome: 'Desconto 10% — Loja Eco', data: '12 Mai 2026', pontos: -500, emoji: '🛍️' },
    { id: 2, nome: 'Coleta #22 completada', data: '08 Mai 2026', pontos: +120, emoji: '♻️' },
    { id: 3, nome: 'Coleta #21 completada', data: '02 Mai 2026', pontos: +95, emoji: '♻️' },
    { id: 4, nome: 'Bônus semanal', data: '28 Abr 2026', pontos: +50, emoji: '🎁' },
  ]

  /* ── Renderiza badge de status ───────────────── */
  function renderBadge(status, custo) {
    if (status === 'resgatado') {
      return (
        <span className="rw-card-badge resgatado">
          <Check size={13} />
          Resgatado
        </span>
      )
    }
    if (status === 'disponivel') {
      return (
        <span className="rw-card-badge disponivel">
          <Gift size={13} />
          {custo} pts
        </span>
      )
    }
    return (
      <span className="rw-card-badge bloqueado">
        <Lock size={13} />
        {custo} pts
      </span>
    )
  }

  return (
    <div className="app-container">
      <Navigation />

      <main className="recompensas-main">
        <div className="recompensas-container">

          {/* Top Header */}
          <header className="rw-top-header">
              <h2 className="rw-top-title">Recompensas</h2>

              <div style={{ display: 'flex', gap: '8px' }}>
    
               {/*botão provisório para acesso da tela Minhas Recompensas */}
               <button
                  className="rw-icon-button"
                  onClick={() => navigate('/minhas-recompensas')}
                  style={{
                    fontSize: '12px',
                    padding: '6px 10px',
                    border: '1px solid #22C55E',
                    borderRadius: '8px',
                    color: '#22C55E',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                   Minhas recompensas
                </button>

                <button className="rw-icon-button">
                  <Bell size={20} />
                </button>

              </div>
        </header>

          {/* Saudação */}
          <section className="rw-greeting">
            <h1 className="rw-greeting-title">Suas Recompensas 🎁</h1>
            <p className="rw-greeting-subtitle">Acompanhe seus pontos e troque por prêmios exclusivos</p>
          </section>

          {/* Resumo de pontos */}
          <section className="rw-pontos-resumo">
            <div className="rw-pontos-icone">
              <Leaf size={28} />
            </div>
            <div className="rw-pontos-info">
              <span className="rw-pontos-valor">{pontosAtuais.toLocaleString('pt-BR')}</span>
              <span className="rw-pontos-label">Pontos acumulados</span>
            </div>
            <div className="rw-pontos-extra">
              <span className="rw-pontos-nivel">Nível Prata</span>
              <span className="rw-pontos-proximo">{proximoNivel - pontosAtuais} pts p/ Ouro</span>
            </div>
          </section>

          {/* Barra de progresso */}
          <section className="rw-progresso">
            <div className="rw-progresso-label">
              <span className="rw-progresso-texto">Progresso para o nível Ouro</span>
              <span className="rw-progresso-valor">{progresso}%</span>
            </div>
            <div className="rw-progresso-barra">
              <div
                className="rw-progresso-preenchimento"
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
          </section>

          {/* Recompensas disponíveis */}
          <section>
            <h3 className="rw-secao-titulo">Recompensas disponíveis</h3>
            <div className="rw-lista">
              {recompensas.map((item) => (
                <div key={item.id} className="rw-card">
                  <div className={`rw-card-icone ${item.cor}`}>
                    {item.emoji}
                  </div>
                  <div className="rw-card-info">
                    <span className="rw-card-nome">{item.nome}</span>
                    <span className="rw-card-desc">{item.desc}</span>
                  </div>
                  {renderBadge(item.status, item.custo)}
                </div>
              ))}
            </div>
          </section>

          {/* Histórico de resgates */}
          <section>
            <h3 className="rw-secao-titulo">Histórico recente</h3>
            <div className="rw-historico">
              {historico.map((item) => (
                <div key={item.id} className="rw-historico-item">
                  <div className="rw-historico-esquerda">
                    <span className="rw-historico-emoji">{item.emoji}</span>
                    <div className="rw-historico-info">
                      <span className="rw-historico-nome">{item.nome}</span>
                      <span className="rw-historico-data">{item.data}</span>
                    </div>
                  </div>
                  <span
                    className="rw-historico-pontos"
                    style={{ color: item.pontos > 0 ? '#22C55E' : '#dc2626' }}
                  >
                    {item.pontos > 0 ? '+' : ''}{item.pontos} pts
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default Recompensas
