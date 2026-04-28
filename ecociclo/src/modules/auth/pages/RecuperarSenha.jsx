import { useRecuperarSenha } from "../hooks/useRecuperarSenha";
import "../styles/RecuperarSenha.css";

export default function RecuperarSenha() {
  const {
    email,
    emailErro,
    enviado,
    handleChange,
    handleSubmit,
    handleReenviar,
  } = useRecuperarSenha();

  const conteudo = enviado ? (
    <div className="rs-sucesso">
      <div className="rs-sucesso-icone">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="rs-sucesso-titulo">E-mail enviado!</h2>
      <p className="rs-sucesso-desc">
        Enviamos as instruções para redefinir sua senha para <strong>{email}</strong>. Verifique sua caixa de entrada.
      </p>
      <button className="btn-enviar" onClick={handleReenviar}>
        Reenviar e-mail
      </button>
      <p className="rs-login-link">
        Lembrou a senha? <a href="/login">Entrar</a>
      </p>
    </div>
  ) : (
    <div className="rs-form-area">
      <p className="subtitle">Digite seu e-mail e enviaremos instruções para redefinir sua senha</p>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="seu@email.com"
          value={email}
          onChange={handleChange}
          className={emailErro ? "input-erro" : ""}
        />
        {emailErro && <span className="erro">{emailErro}</span>}
      </div>

      <button className="btn-enviar" onClick={handleSubmit}>
        Enviar instruções
      </button>

      <p className="rs-login-link">
        Lembrou a senha? <a href="/login">Entrar</a>
      </p>
    </div>
  );

  return (
    <>
      {/* LAYOUT MOBILE */}
      <div className="screen">
        <div className="header">
          <button className="btn-voltar" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1>Recuperar senha</h1>
        </div>

        <div className="body">
          <div className="rs-icone-topo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </div>
          {conteudo}
        </div>
      </div>

      {/* LAYOUT DESKTOP */}
      <div className="rs-desktop">
        <div className="rs-left">
          <div className="rs-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
            </svg>
          </div>
          <h2>Esqueceu sua<br />senha?</h2>
          <p>Não se preocupe! Basta informar seu e-mail e enviaremos as instruções para você criar uma nova senha.</p>
          <div className="rs-features">
            <div className="rs-feature">
              <div className="rs-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
              </div>
              <span>E-mail enviado em segundos</span>
            </div>
            <div className="rs-feature">
              <div className="rs-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <span>Link seguro com validade de 30 minutos</span>
            </div>
            <div className="rs-feature">
              <div className="rs-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span>Sua conta permanece protegida</span>
            </div>
          </div>
        </div>

        <div className="rs-right">
          <h1>Recuperar senha</h1>
          <div className="rs-icone-topo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </div>
          {conteudo}
        </div>
      </div>
    </>
  );
}
