import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/visualizar-rota.css'

const dadosRota = {
  destino: {
    rua: 'Rua do Comércio, 789',
    bairro: 'Centro, São Paulo',
  },
  distancia: '3.5 km',
  tempo: '12 min',
  contato: {
    nome: 'Ana Costa',
    telefone: '(11) 99876-5432',
  },
}

function VisualizarRota() {
  const navigate = useNavigate()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleVoltar() {
    navigate(-1)
  }

  function handleLigar() {
    window.location.href = `tel:${dadosRota.contato.telefone}`
  }

  function handleNavegar() {
    const enderecoEncoded = encodeURIComponent(
      `${dadosRota.destino.rua}, ${dadosRota.destino.bairro}`
    )
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${enderecoEncoded}`, '_blank')
  }

  const PainelConteudo = () => (
    <div className="rota-painel">
      <header className="rota-painel__header">
        <button className="rota-painel__btn-voltar" onClick={handleVoltar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span>Visualizar rota</span>
        </button>
      </header>

      {/* Mapa simulado */}
      <div className="rota-mapa">
        <div className="rota-mapa__fundo">
          <svg className="rota-mapa__grade" viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">
            {[30, 70, 110, 150, 190].map(y => (
              <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="#d1d5db" strokeWidth="1" />
            ))}
            {[50, 110, 170, 230, 290].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="#d1d5db" strokeWidth="1" />
            ))}
            <line x1="0" y1="110" x2="340" y2="110" stroke="#b0b8c1" strokeWidth="4" />
            <line x1="170" y1="0" x2="170" y2="200" stroke="#b0b8c1" strokeWidth="4" />
            <polyline
              points="60,60 60,110 170,110 170,155"
              fill="none"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 4"
            />
          </svg>

          <div className="rota-mapa__origem">
            <div className="rota-mapa__origem-dot" />
          </div>

          <div className="rota-mapa__pin">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="#22c55e">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
          </div>

          <p className="rota-mapa__label">Mapa de navegação</p>
          <p className="rota-mapa__sublabel">Integração com app de mapas</p>
        </div>
      </div>

      {/* Infos */}
      <div className="rota-info">
        <div className="rota-info__secao">
          <div className="rota-info__linha">
            <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" width="16" height="16">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="rota-info__label">Destino</span>
          </div>
          <p className="rota-info__valor">{dadosRota.destino.rua}</p>
          <p className="rota-info__sub">{dadosRota.destino.bairro}</p>
        </div>

        <div className="rota-info__divider" />

        <div className="rota-info__metricas">
          <span className="rota-info__metrica">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {dadosRota.distancia}
          </span>
          <span className="rota-info__metrica">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {dadosRota.tempo}
          </span>
        </div>

        <div className="rota-info__divider" />

        <div className="rota-info__contato">
          <div>
            <p className="rota-info__label">Contato</p>
            <p className="rota-info__valor">{dadosRota.contato.nome}</p>
            <p className="rota-info__sub">{dadosRota.contato.telefone}</p>
          </div>
          <button className="rota-info__btn-ligar" onClick={handleLigar}>
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rota-footer">
        <button className="rota-footer__btn" onClick={handleNavegar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          Iniciar navegação
        </button>
      </div>
    </div>
  )

  return (
    <div className="rota-page">
      {isDesktop && (
        <aside className="rota-page__lateral">
          <div className="rota-page__lateral-logo">
            <div className="rota-page__lateral-logo-icone">
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
              </svg>
            </div>
            EcoCiclo
          </div>

          <div>
            <p className="rota-page__lateral-tag">Coleta ativa</p>
            <h2 className="rota-page__lateral-titulo">
              Navegando até<br />
              <span>o destino</span>
            </h2>
            <p className="rota-page__lateral-desc">
              Siga a rota indicada para chegar ao ponto de coleta com segurança.
            </p>
          </div>

          <div className="rota-page__lateral-stats">
            <div>
              <div className="rota-page__lateral-stat-valor">{dadosRota.distancia}</div>
              <div className="rota-page__lateral-stat-label">Distância</div>
            </div>
            <div>
              <div className="rota-page__lateral-stat-valor">{dadosRota.tempo}</div>
              <div className="rota-page__lateral-stat-label">Tempo est.</div>
            </div>
          </div>
        </aside>
      )}

      <main className={`rota-page__content ${isDesktop ? 'rota-page__content--desktop' : 'rota-page__content--mobile'}`}>
        <PainelConteudo />
      </main>
    </div>
  )
}

export default VisualizarRota
