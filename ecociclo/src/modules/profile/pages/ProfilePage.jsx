import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileCard from '../components/ProfileCard.jsx'
import '../styles/profile-page.css'
import { Home, Search, Package, User } from 'lucide-react'

function ProfilePage() {
  const [usuario, setUsuario] = useState({
    nome: 'João Silva',
    email: 'joao.silva@gmail.com',
    telefone: '(11) 98765-4321',
    avatar: null,
    avaliacao: 4.8,
    coletas: 24,
  })

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navigate = useNavigate()
  function handleLogout() {
    navigate('/login')
  }

  return (
    <div className="profile-page">

      {isDesktop && (
        <aside className="profile-page__lateral">
          <div className="profile-page__lateral-logo">
            <div className="profile-page__lateral-logo-icone">
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
              </svg>
            </div>
            EcoCiclo
          </div>

          <div>
            <p className="profile-page__lateral-tag">Sua conta</p>
            <h2 className="profile-page__lateral-titulo">
              Olá,<br />
              <span>{usuario.nome}</span>
            </h2>
            <p className="profile-page__lateral-desc">
              Gerencie seus dados, endereços e preferências de coleta em um só lugar.
            </p>
          </div>

          <div className="profile-page__lateral-stats">
            <div>
              <div className="profile-page__lateral-stat-valor">⭐ {usuario.avaliacao}</div>
              <div className="profile-page__lateral-stat-label">Avaliação</div>
            </div>
            <div>
              <div className="profile-page__lateral-stat-valor">{usuario.coletas}</div>
              <div className="profile-page__lateral-stat-label">Coletas</div>
            </div>
          </div>
        </aside>
      )}

      {!isDesktop && (
        <main className="profile-page__content profile-page__content--mobile">
          <header className="profile-page__header">
            Detalhes do Perfil
          </header>

          <div className="profile-page__body">
            <ProfileCard usuario={usuario} onLogout={handleLogout} />
          </div>

          <nav className="bottom-nav">
            <Home size={22} />
            <Search size={22} />
            <Package size={22} />
            <User size={22} />
          </nav>
        </main>
      )}

      {isDesktop && (
        <main className="profile-page__content profile-page__content--desktop">
          <div className="profile-painel">

            <div className="profile-painel__secao">
              <h2 className="profile-painel__secao-titulo">Informações pessoais</h2>
              <div className="profile-painel__linha">
                <div className="profile-painel__avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="profile-painel__nome">{usuario.nome}</p>
                  <p className="profile-painel__sub">{usuario.email}</p>
                  <p className="profile-painel__sub">{usuario.telefone}</p>
                </div>
                <button className="profile-painel__btn-editar">Editar</button>
              </div>
            </div>

            <div className="profile-painel__secao">
              <h2 className="profile-painel__secao-titulo">Atividade</h2>
              <div className="profile-painel__stats">
                <div className="profile-painel__stat">
                  <span className="profile-painel__stat-valor">⭐ {usuario.avaliacao}</span>
                  <span className="profile-painel__stat-label">Avaliação média</span>
                </div>
                <div className="profile-painel__stat">
                  <span className="profile-painel__stat-valor">{usuario.coletas}</span>
                  <span className="profile-painel__stat-label">Coletas realizadas</span>
                </div>
              </div>
            </div>

            <div className="profile-painel__secao">
              <h2 className="profile-painel__secao-titulo">Configurações</h2>
              <button className="profile-painel__item">
                <span className="profile-painel__item-esquerda">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Gerenciar endereços
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="profile-painel__secao profile-painel__secao--perigo">
              <button className="profile-painel__btn-sair" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sair da conta
              </button>
            </div>

          </div>
        </main>
      )}

    </div>
  )
}

export default ProfilePage