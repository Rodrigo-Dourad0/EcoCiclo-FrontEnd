import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

function Login() {
  const {
    showPwd,
    setShowPwd,
    email,
    setEmail,
    senha,
    setSenha,
    emailErro,
    senhaErro,
    validarEmail,
    validarSenha,
  } = useLogin();

  return (
    <div className="login-page">

      {/* ── PAINEL ESQUERDO ── */}
      <div className="panel-left">
        <div className="deco-ring r1" />
        <div className="deco-ring r2" />
        <div className="deco-ring r3" />
        <div className="deco-ring r4" />
        <div className="deco-ring r5" />
        <div className="deco-dot d1" />
        <div className="deco-dot d2" />
        <div className="deco-dot d3" />

        <div className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 24 24">
              <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
            </svg>
          </div>
          <span className="brand-name">EcoCiclo</span>
        </div>

        <div className="hero-copy">
          <p className="hero-label">Plataforma Premium</p>
          <h1 className="hero-title">
            Bem-vindo<br />de <em>volta</em>
          </h1>
          <p className="hero-sub">
            Acesse sua conta para continuar de onde parou. Tudo sincronizado, seguro e pronto para você.
          </p>
        </div>

        <div className="left-stats">
          <div className="stat-item">
            <span className="stat-number">12k+</span>
            <span className="stat-label">Usuários ativos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Satisfação</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">50t</span>
            <span className="stat-label">Recicladas</span>
          </div>
        </div>

        <div className="left-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <span className="feature-title">Segurança de ponta</span>
              <span className="feature-desc">Seus dados protegidos com criptografia de alto nível.</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div>
              <span className="feature-title">Impacto em tempo real</span>
              <span className="feature-desc">Acompanhe cada coleta e seu impacto ambiental ao vivo.</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div>
              <span className="feature-title">Comunidade ativa</span>
              <span className="feature-desc">Mais de 12 mil usuários transformando o meio ambiente.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAINEL DIREITO ── */}
      <div className="panel-right">
        <div className="panel-right-bg" />

        {/* Mobile header */}
        <div className="mobile-header">
          <div className="mobile-brand-mark">
            <svg viewBox="0 0 24 24">
              <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
            </svg>
          </div>
          <h2 className="mobile-title">Bem-vindo de volta</h2>
          <p className="mobile-sub">Acesse sua conta para continuar</p>
        </div>

        <div className="form-card">
          <div className="form-header">
            <p className="form-greeting">Acesse sua conta</p>
            <h2 className="form-title">Entrar</h2>
            <p className="form-sub">Preencha seus dados para continuar</p>
          </div>

          {/* Email */}
          <div className={`field ${emailErro ? "field--erro" : ""}`}>
            <label>E-mail<span className="required">*</span></label>
            <div className="input-wrap">
              <svg viewBox="0 0 24 24" className="input-icon">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); validarEmail(e.target.value); }}
                onBlur={() => validarEmail(email)}
                className={emailErro ? "input-erro" : ""}
              />
              {email && !emailErro && (
                <span className="input-check">
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              )}
            </div>
            {emailErro && (
              <span className="erro-msg">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {emailErro}
              </span>
            )}
          </div>

          {/* Senha */}
          <div className={`field ${senhaErro ? "field--erro" : ""}`}>
            <div className="field-row">
              <label>Senha<span className="required">*</span></label>
              <Link to="/recuperar-senha" className="field-link">Esqueci minha senha</Link>
            </div>
            <div className="input-wrap">
              <svg viewBox="0 0 24 24" className="input-icon icon-lock">
                <rect x="5" y="11" width="14" height="10" rx="2"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
              </svg>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); validarSenha(e.target.value); }}
                onBlur={() => validarSenha(senha)}
                className={senhaErro ? "input-erro" : ""}
              />
              <button className="eye-btn" type="button" onClick={() => setShowPwd(!showPwd)} aria-label="Mostrar senha">
                {showPwd ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {senhaErro && (
              <span className="erro-msg">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {senhaErro}
              </span>
            )}
          </div>

          <label className="remember">
            <input type="checkbox" />
            <span className="check-box" />
            <span className="remember-label">Manter-me conectado</span>
          </label>

          <button className="login-btn-submit">
            <span>Entrar</span>
            <svg viewBox="0 0 24 24" className="btn-arrow">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>

          <p className="signup-row">
            Não tem conta? <Link to="/criar-conta">Criar agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;