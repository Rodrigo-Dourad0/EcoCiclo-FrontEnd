import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfilePage } from '../hooks/useProfilePage.js'
import ProfileCard from '../components/ProfileCard.jsx'
import { RenderIcon } from '../components/RenderIcon.jsx'
import { Navigation } from '../../../shared/components/Navigation/Navigation.jsx'
import '../styles/profile-page.css'

// 1. IMPORTAÇÃO DO CONTEXTO ADICIONADA AQUI
import { useAuth } from '../../../context/AuthContext'

function ProfilePage() {
  // 2. FUNÇÃO DE LOGOUT PUXADA AQUI
  const { logout } = useAuth()

  const {
    usuario,
    tipoUsuario,
    isDesktop,
    setIsDesktop,
    configuracoes
  } = useProfilePage()

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsDesktop])

  const navigate = useNavigate()
  
  // Mapeamento de ações
  const acoes = {
    onMeusEnderecos: () => navigate('/meus-enderecos'),
    onNovoEndereco: () => navigate('/novo-endereco'),
    onMinhasAvaliacoes: () => navigate('/minhas-avaliacoes'),
    onMinhasColetas: () => navigate('/minhas-coletas'),
    onGerenciarRecompensas: () => navigate('/gerenciar-recompensa'),
    onGerenciarAssociacoes: () => navigate('/gerenciar-associacao'),
  }

  // 3. FUNÇÃO DE LOGOUT ATUALIZADA AQUI PARA MATAR O TOKEN
  function handleLogout() { 
    localStorage.removeItem('token') // Apaga o token de segurança
    if (logout) logout()             // Limpa os dados do usuário da memória
    navigate('/login')               // Manda para a tela de login
  }

  function handleVoltar() {
    if (tipoUsuario === 'Administrador') {
      navigate('/admin-dashboard');
    } else if (tipoUsuario === 'Coletor') {
      navigate('/dashboard-coletor');
    } else {
      navigate('/dashboard');
    }
  }
  function handleEditarPerfil() { navigate('/editar-perfil') }

  // Executa a ação baseado no nome armazenado
  const executarAcao = (nomeAcao) => {
    if (acoes[nomeAcao]) {
      acoes[nomeAcao]()
    }
  }

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
              tipoUsuario={tipoUsuario}
              configuracoes={configuracoes}
              onLogout={handleLogout}
              onEditarPerfil={handleEditarPerfil}
              executarAcao={executarAcao}
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
                  <p className="profile-painel__tipo-usuario">{usuario.tipoUsuario}</p>
                  {tipoUsuario === 'Coletor' && usuario.associacao?.nome && (
                    <p className="profile-painel__associacao">
                      Associacao: {usuario.associacao.nome}
                      {usuario.associacao.cnpj ? ` • ${usuario.associacao.cnpj}` : ''}
                    </p>
                  )}
                  <p className="profile-painel__sub">{usuario.email}</p>
                  <p className="profile-painel__sub">{usuario.telefone}</p>
                </div>
                <button className="profile-painel__btn-editar" onClick={handleEditarPerfil}>Editar</button>
              </div>
            </div>

            {tipoUsuario === 'Coletor' && (
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
                  <div className="profile-painel__stat">
                    <span className="profile-painel__stat-valor">{usuario.totalAvaliacoes || 0}</span>
                    <span className="profile-painel__stat-label">Avaliações recebidas</span>
                  </div>
                </div>

                <div className="profile-painel__feedback">
                  <span className="profile-painel__feedback-label">Última avaliação</span>
                  <strong className="profile-painel__feedback-nota">
                    {usuario.ultimaAvaliacao
                      ? `${usuario.ultimaAvaliacao.nota}.0 ⭐`
                      : "Sem avaliações ainda"}
                  </strong>
                  {usuario.ultimaAvaliacao?.comentario && (
                    <p className="profile-painel__feedback-comentario">
                      {usuario.ultimaAvaliacao.comentario}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="profile-painel__secao">
              <div className="profile-painel__config-header">
                <h2 className="profile-painel__secao-titulo">Configurações</h2>
              </div>

              {configuracoes.map((config) => (
                <button 
                  key={config.id}
                  className="profile-painel__item" 
                  onClick={() => executarAcao(config.action)}
                >
                  <span className="profile-painel__item-esquerda">
                    <RenderIcon iconName={config.icon} width={18} height={18} />
                    {config.label}
                  </span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
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
