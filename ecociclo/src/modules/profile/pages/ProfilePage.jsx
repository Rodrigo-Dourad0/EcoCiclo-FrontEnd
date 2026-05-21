import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileCard from '../components/ProfileCard.jsx'
import { Navigation } from '../../../shared/components/navigation/Navigation.jsx'
import '../styles/profile-page.css'

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
  function handleLogout() { navigate('/login') }
  function handleNovoEndereco() { navigate('/novo-endereco') }
  function handleMinhasAvaliacoes() { navigate('/minhas-avaliacoes') }
  function handleMinhasColetas() { navigate('/minhas-coletas') }
  function handleVoltar() { navigate('/') }
  function handleEditarPerfil() { navigate('/editar-perfil') }

  return (
    <div className="profile-page">

      {/* Navigation lateral (desktop) ou bottom bar (mobile) */}
      <Navigation />

      {/* MOBILE */}
      {!isDesktop && (
        <main className="profile-page__content profile-page__content--mobile">
          <header className="profile-page__header">
            <button onClick={handleVoltar} className="profile-page__btn-voltar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              <span>Detalhes do Perfil</span>
            </button>
          </header>

          <div className="profile-page__body">
            <ProfileCard
              usuario={usuario}
              onLogout={handleLogout}
              onNovoEndereco={handleNovoEndereco}
              onMinhasAvaliacoes={handleMinhasAvaliacoes}
              onMinhasColetas={handleMinhasColetas}
              onEditarPerfil={handleEditarPerfil}
            />
          </div>
        </main>
      )}

      {/* DESKTOP */}
      {isDesktop && (
        <main className="profile-page__content profile-page__content--desktop">
          <div className="profile-painel">

            <header className="profile-painel__header">
              <button className="btn-voltar" onClick={handleVoltar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                <span>Meu perfil</span>
              </button>
            </header>

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
                <button className="profile-painel__btn-editar" onClick={handleEditarPerfil}>Editar</button>
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

              <button className="profile-painel__item" onClick={() => alert('Em breve!')}>
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

              <button className="profile-painel__item" onClick={handleNovoEndereco}>
                <span className="profile-painel__item-esquerda">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Adicionar novo endereço
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button className="profile-painel__item" onClick={handleMinhasColetas}>
                <span className="profile-painel__item-esquerda">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  Minhas coletas
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button className="profile-painel__item" onClick={handleMinhasAvaliacoes}>
                <span className="profile-painel__item-esquerda">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Minhas avaliações
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