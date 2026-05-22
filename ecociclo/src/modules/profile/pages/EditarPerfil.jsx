import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EditarPerfil.css'

function EditarPerfil() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('João Silva')
  const [email, setEmail] = useState('joao.silva@gmail.com')
  const [telefone, setTelefone] = useState('(11) 98765-4321')
  const [avatar, setAvatar] = useState(null)

  function formatarTelefone(valor) {
    let v = valor.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)
    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`
    } else if (v.length > 0) {
      v = `(${v}`
    }
    return v
  }

  function handleAvatarChange() {
    alert('Funcionalidade de upload em breve!')
  }

  function handleSave(event) {
    event.preventDefault()
    alert('Funcionalidade de salvar em breve!')
  }

  return (
    <main className="ep-page-wrapper">
      <div className="ep-page-container">
        <header className="ep-page-header">
          <div>
            <span className="ep-page-tag">Perfil</span>
            <h1 className="ep-page-title">Editar perfil</h1>
            <p className="ep-page-description">
              Atualize suas informações pessoais e mantenha sua conta EcoCiclo sempre segura.
            </p>
          </div>

          <button
            type="button"
            className="ep-back-button"
            onClick={() => navigate(-1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Voltar
          </button>
        </header>

        <div className="ep-grid-layout">
          <aside className="ep-summary-card">
            <div className="ep-summary-badge">Conta EcoCiclo</div>
            <h2>Resumo do perfil</h2>
            <p className="ep-summary-copy">
              Verifique seus dados atuais antes de salvar as alterações. Um perfil atualizado facilita a comunicação com sua equipe de coleta.
            </p>

            <div className="ep-summary-list">
              <div className="ep-summary-item">
                <span className="ep-summary-label">Nome</span>
                <strong>{nome}</strong>
              </div>
              <div className="ep-summary-item">
                <span className="ep-summary-label">Telefone</span>
                <strong>{telefone}</strong>
              </div>
            </div>

            <div className="ep-summary-note">
              Alterações só serão aplicadas após salvar. Você pode trocar sua foto de perfil quando quiser.
            </div>
          </aside>

          <section className="ep-form-card">
            <div className="ep-form-top">
              <div>
                <p className="ep-form-section">Dados da conta</p>
                <h2 className="ep-form-heading">Detalhes do perfil</h2>
              </div>
              <p className="ep-form-accent">Todas as informações podem ser atualizadas com segurança.</p>
            </div>

            <form className="ep-form" onSubmit={handleSave}>
              <div className="ep-avatar-section">
                <div className="ep-avatar-preview">
                  {avatar ? (
                    <img src={avatar} alt="Avatar do usuário" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="42" height="42">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div className="ep-avatar-details">
                  <strong>{nome || 'Seu nome'}</strong>
                  <span>Avatar atual</span>
                  <button
                    type="button"
                    className="ep-avatar-button"
                    onClick={handleAvatarChange}
                  >
                    Alterar foto
                  </button>
                </div>
              </div>

              <div className="ep-fields-group">
                <div className="ep-field">
                  <label htmlFor="nome">Nome completo</label>
                  <div className="ep-input-wrap">
                    <input
                      id="nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>

                <div className="ep-field">
                  <label htmlFor="telefone">Telefone</label>
                  <div className="ep-input-wrap">
                    <input
                      id="telefone"
                      type="text"
                      placeholder="(00) 00000-0000"
                      value={telefone}
                      maxLength={15}
                      onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                    />
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="ep-actions">
                <button type="submit" className="ep-btn-primary">
                  Salvar alterações
                </button>
                <button
                  type="button"
                  className="ep-btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

export default EditarPerfil
