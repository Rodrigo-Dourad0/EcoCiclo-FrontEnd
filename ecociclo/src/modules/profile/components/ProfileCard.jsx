function ProfileCard({ usuario, onLogout }) {
  return (
    <div className="profile-card-wrapper">
      <div className="profile-card">
        <div className="profile-card__header">
          <div className="profile-card__avatar">
            {usuario.avatar ? (
              <img src={usuario.avatar} alt={`Foto de ${usuario.nome}`} />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <div className="profile-card__info">
            <h2 className="profile-card__nome">{usuario.nome}</h2>
            <p className="profile-card__email">{usuario.email}</p>
            <p className="profile-card__telefone">{usuario.telefone}</p>
          </div>
        </div>

        <div className="profile-card__stats">
          <div className="profile-card__stat">
            <span className="profile-card__stat-valor">⭐ {usuario.avaliacao}</span>
            <span className="profile-card__stat-label">Avaliação</span>
          </div>
          <div className="profile-card__divisor" />
          <div className="profile-card__stat">
            <span className="profile-card__stat-valor">{usuario.coletas}</span>
            <span className="profile-card__stat-label">Coletas</span>
          </div>
        </div>
      </div>

      <div className="profile-acoes">
        <button className="profile-card__btn-acao">
          <span className="profile-card__btn-acao-esquerda">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Editar perfil
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <button className="profile-card__btn-acao">
          <span className="profile-card__btn-acao-esquerda">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Gerenciar endereços
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <button className="profile-card__btn-sair" onClick={onLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair da conta
        </button>
      </div>
    </div>
  )
}

export default ProfileCard