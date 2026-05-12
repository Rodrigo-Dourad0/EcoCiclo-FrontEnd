import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EditarPerfil.css'

function EditarPerfil() {
  const navigate = useNavigate()

  // Dados mockados do usuário (futuramente virão do contexto/API)
  const [nome, setNome] = useState('João Silva')
  const [email, setEmail] = useState('joao.silva@gmail.com')
  const [telefone, setTelefone] = useState('(11) 98765-4321')
  const [avatar, setAvatar] = useState(null)

  // Formata o telefone enquanto digita
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

  // Simula a troca do avatar
  function handleAvatarChange() {
    alert('Funcionalidade de upload em breve!')
  }

  return (
    <div className="editar-perfil-wrapper">
      {/* PAINEL ESQUERDO (Desktop) */}
      <div className="ep-panel-left">
        <div className="ep-deco-ring ep-r1"></div>
        <div className="ep-deco-ring ep-r2"></div>
        <div className="ep-deco-ring ep-r3"></div>
        <div className="ep-deco-ring ep-r4"></div>
        <div className="ep-deco-ring ep-r5"></div>

        <div className="ep-brand">
          <div className="ep-brand-mark">
            <svg viewBox="0 0 24 24">
              <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
            </svg>
          </div>
          <span className="ep-brand-name">EcoCiclo</span>
        </div>

        <div className="ep-hero-copy">
          <p className="ep-hero-label">Sua conta</p>
          <h1 className="ep-hero-title">
            Editar<br /><em>perfil</em>
          </h1>
          <p className="ep-hero-sub">
            Atualize suas informações pessoais para manter seu perfil sempre em dia.
          </p>
        </div>
      </div>

      {/* PAINEL DIREITO */}
      <div className="ep-panel-right">

        {/* Header mobile */}
        <div className="ep-mobile-header">
          <button className="ep-mobile-back" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h2 className="ep-mobile-title">Editar perfil</h2>
        </div>

        <div className="ep-form-card">
          <div className="ep-form-header">
            <p className="ep-form-greeting">Configurações</p>
            <h2 className="ep-form-title">Editar perfil</h2>
            <p className="ep-form-sub">Atualize seus dados pessoais</p>
          </div>

          {/* Avatar */}
          <div className="ep-avatar-section">
            <div className="ep-avatar-preview">
              {avatar ? (
                <img src={avatar} alt="Avatar do usuário" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <div className="ep-avatar-info">
              <p className="ep-avatar-nome">{nome || 'Seu nome'}</p>
              <button className="ep-avatar-btn" onClick={handleAvatarChange}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Alterar foto
              </button>
            </div>
          </div>

          {/* Nome */}
          <div className="ep-field">
            <label>Nome completo</label>
            <div className="ep-input-wrap">
              <input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <svg viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          {/* Email */}
          <div className="ep-field">
            <label>E-mail</label>
            <div className="ep-input-wrap">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </div>

          {/* Telefone */}
          <div className="ep-field">
            <label>Telefone</label>
            <div className="ep-input-wrap">
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={telefone}
                maxLength={15}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              />
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="ep-actions">
            <button className="ep-btn-salvar" onClick={() => alert('Funcionalidade em breve!')}>
              Salvar alterações
            </button>
            <button className="ep-btn-cancelar" onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarPerfil
