import "../styles/login.css";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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
    handleLoginSubmit,
    loading
  } = useLogin();

  const handleLogin = async () => {
    const userData = await handleLoginSubmit();
    if (userData) {
      if (userData.tipo === 'ADMIN') {
        navigate("/admin-dashboard");
      } else if (userData.tipo === 'ASSOCIACAO') {
        navigate("/dashboard-coletor");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
      {/* ══════════════════════════════
          MOBILE / TABLET
      ══════════════════════════════ */}
      <div className="ln-screen">
        {/* Header */}
        <div className="ln-header">
          <button className="ln-btn-voltar" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1>Entrar</h1>
        </div>

        <div className="ln-body">
          <p className="ln-subtitle">Acesse sua conta para continuar</p>

          <div className="ln-fields-card">
            {/* Email */}
            <div className={`ln-field ${emailErro ? "ln-field--erro" : ""}`}>
              <label htmlFor="email">
                E-mail <span className="ln-obrigatorio">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); validarEmail(e.target.value); }}
                onBlur={() => validarEmail(email)}
                className={emailErro ? "input-erro" : ""}
                autoComplete="off"
              />
              {emailErro && <span className="ln-erro">{emailErro}</span>}
            </div>

            <div className="ln-field-divider" />

            {/* Senha */}
            <div className={`ln-field ${senhaErro ? "ln-field--erro" : ""}`}>
              <div className="ln-label-row">
                <label htmlFor="senha">
                  Senha <span className="ln-obrigatorio">*</span>
                </label>
                <Link to="/recuperar-senha" className="ln-link-esqueci">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="ln-input-pwd">
                <input
                  type={showPwd ? "text" : "password"}
                  id="senha"
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); validarSenha(e.target.value); }}
                  onBlur={() => validarSenha(senha)}
                  className={senhaErro ? "input-erro" : ""}
                  autoComplete="new-password"
                />
                <button
                  className="ln-eye-btn"
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label="Mostrar senha"
                >
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
              {senhaErro && <span className="ln-erro">{senhaErro}</span>}
            </div>
          </div>

          <label className="ln-remember">
            <input type="checkbox" />
            <span className="ln-check-box" />
            <span className="ln-remember-label">Lembrar meu acesso</span>
          </label>

          <button className="ln-btn-entrar" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="ln-cadastro-link">
            Não tem conta? <Link to="/criar-conta">Criar agora</Link>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════
          DESKTOP
      ══════════════════════════════ */}
      <div className="ln-desktop">
        {/* Painel esquerdo */}
        <div className="ln-left">
          <div className="ln-logo">
            <svg viewBox="0 0 24 24">
              <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
            </svg>
          </div>

          <h2>Bem-vindo<br />de volta.</h2>
          <p>Acesse sua conta e continue contribuindo com um planeta mais sustentável.</p>

          <div className="ln-features">
            <div className="ln-feature">
              <div className="ln-feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span>Seus dados protegidos com segurança de ponta</span>
            </div>
            <div className="ln-feature">
              <div className="ln-feature-icon">
                <svg viewBox="0 0 24 24">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <span>Acompanhe seu impacto ambiental em tempo real</span>
            </div>
            <div className="ln-feature">
              <div className="ln-feature-icon">
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <span>Ganhe pontos e troque por recompensas exclusivas</span>
            </div>
          </div>
        </div>

        {/* Painel direito */}
        <div className="ln-right">
          <h1>Entrar</h1>
          <p className="ln-subtitle">Acesse sua conta para continuar</p>

          <div className="ln-form-card">
            {/* Email */}
            <div className={`ln-field ${emailErro ? "ln-field--erro" : ""}`}>
              <label htmlFor="email2">
                E-mail <span className="ln-obrigatorio">*</span>
              </label>
              <input
                type="email"
                id="email2"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); validarEmail(e.target.value); }}
                onBlur={() => validarEmail(email)}
                className={emailErro ? "input-erro" : ""}
                autoComplete="off"
              />
              {emailErro && <span className="ln-erro">{emailErro}</span>}
            </div>

            {/* Senha */}
            <div className={`ln-field ${senhaErro ? "ln-field--erro" : ""}`}>
              <div className="ln-label-row">
                <label htmlFor="senha2">
                  Senha <span className="ln-obrigatorio">*</span>
                </label>
                <Link to="/recuperar-senha" className="ln-link-esqueci">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="ln-input-pwd">
                <input
                  type={showPwd ? "text" : "password"}
                  id="senha2"
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); validarSenha(e.target.value); }}
                  onBlur={() => validarSenha(senha)}
                  className={senhaErro ? "input-erro" : ""}
                  autoComplete="new-password"
                />
                <button
                  className="ln-eye-btn"
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label="Mostrar senha"
                >
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
              {senhaErro && <span className="ln-erro">{senhaErro}</span>}
            </div>
          </div>

          <label className="ln-remember">
            <input type="checkbox" />
            <span className="ln-check-box" />
            <span className="ln-remember-label">Lembrar meu acesso</span>
          </label>

          <div className="ln-actions">
            <button className="ln-btn-entrar" onClick={handleLogin} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <p className="ln-cadastro-link">
              Não tem conta? <Link to="/criar-conta">Criar agora</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;