import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const validarEmail = (valor) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valor) {
      setEmailErro("O e-mail é obrigatório.");
    } else if (!regex.test(valor)) {
      setEmailErro("Digite um e-mail válido (ex: nome@email.com).");
    } else {
      setEmailErro("");
    }
  };

  const validarSenha = (valor) => {
    if (!valor) {
      setSenhaErro("A senha é obrigatória.");
    } else if (valor.length < 8) {
      setSenhaErro("A senha deve ter no mínimo 8 caracteres.");
    } else {
      setSenhaErro("");
    }
  };

  return (
    <>
      <div className="panel-left">
        <div className="deco-ring r1"></div>
        <div className="deco-ring r2"></div>
        <div className="deco-ring r3"></div>
        <div className="deco-ring r4"></div>
        <div className="deco-ring r5"></div>

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

        <div className="testimonial">
          <p>"A interface mais elegante que já usei. Simplicidade e poder em perfeito equilíbrio."</p>
          <div className="testimonial-footer">
            <div className="testimonial-avatar">AL</div>
            <span className="testimonial-author">Ana Lima, Designer Lead</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="panel-right">

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

          <div className="field">
            <label>E-mail</label>
            <div className="input-wrap">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validarEmail(e.target.value);
                }}
                onBlur={() => validarEmail(email)}
                className={emailErro ? "input-erro" : ""}
              />
              <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </div>
            {emailErro && <span className="erro-msg">{emailErro}</span>}
          </div>

          <div className="field">
            <div className="field-row">
              <label>Senha</label>
              <a href="#" className="field-link">Esqueci minha senha</a>
            </div>

            <div className="input-wrap">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  validarSenha(e.target.value);
                }}
                onBlur={() => validarSenha(senha)}
                className={senhaErro ? "input-erro" : ""}
              />

              <svg viewBox="0 0 24 24" className="icon-lock">
                <rect x="5" y="11" width="14" height="10" rx="2"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
              </svg>

              <button
                className="eye-btn"
                type="button"
                onClick={() => setShowPwd(!showPwd)}
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
            {senhaErro && <span className="erro-msg">{senhaErro}</span>}
          </div>

          <div className="field">
            <label>Acessar como</label>
            <div className="role-options">
              <label className="role-option">
                <input type="radio" name="role" value="doador" defaultChecked />
                <span className="role-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Doador
                </span>
              </label>
              <label className="role-option">
                <input type="radio" name="role" value="coletor" />
                <span className="role-box">
                  <svg viewBox="0 0 24 24">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                  </svg>
                  Coletor
                </span>
              </label>
            </div>
          </div>

          <label className="remember">
            <input type="checkbox" />
            <span className="check-box"></span>
            <span className="remember-label">Manter-me conectado</span>
          </label>

          <button className="btn-login">Entrar</button>

          <p className="signup-row">
            Não tem conta? <a href="#">Criar agora</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;