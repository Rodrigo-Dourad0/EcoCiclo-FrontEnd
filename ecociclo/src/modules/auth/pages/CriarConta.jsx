import "../styles/CriarConta.css";
import useCriarConta from "../hooks/useCriarConta";

export default function CriarConta() {
  const {
    tipo,
    setTipo,
    form,
    erros,
    handleChange,
    handleSubmit,
  } = useCriarConta(); 

  const camposFormulario = (
    <div className="cc-form-area">
      <p className="subtitle">Preencha seus dados para criar sua conta</p>

      <div className="cc-row">
        <div className="field cc-full">
          <label htmlFor="nome">Nome completo <span className="ac-obrigatorio">*</span></label>
          <input
            type="text"
            id="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            className={erros.nome ? "input-erro" : ""}
          />
          {erros.nome && <span className="erro">{erros.nome}</span>}
        </div>
      </div>

      <div className="cc-row">
        <div className="field">
          <label htmlFor="email">Email <span className="ac-obrigatorio">*</span></label>
          <input
            type="email"
            id="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            className={erros.email ? "input-erro" : ""}
          />
          {erros.email && <span className="erro">{erros.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="telefone">Telefone <span className="ac-obrigatorio">*</span></label>
          <input
            type="tel"
            id="telefone"
            placeholder="(00) 00000-0000"
            maxLength={15}
            value={form.telefone}
            onChange={handleChange}
            className={erros.telefone ? "input-erro" : ""}
          />
          {erros.telefone && <span className="erro">{erros.telefone}</span>}
        </div>
      </div>

      <div className="cc-row">
        <div className="field">
          <label htmlFor="senha">Senha <span className="ac-obrigatorio">*</span></label>
          <input
            type="password"
            id="senha"
            placeholder="Mínimo 6 caracteres"
            value={form.senha}
            onChange={handleChange}
            className={erros.senha ? "input-erro" : ""}
          />
          {erros.senha && <span className="erro">{erros.senha}</span>}
        </div>
        <div className="field">
          <label htmlFor="confirmarSenha">Confirmar senha <span className="ac-obrigatorio">*</span></label>
          <input
            type="password"
            id="confirmarSenha"
            placeholder="Digite novamente"
            value={form.confirmarSenha}
            onChange={handleChange}
            className={erros.confirmarSenha ? "input-erro" : ""}
          />
          {erros.confirmarSenha && <span className="erro">{erros.confirmarSenha}</span>}
        </div>
      </div>

      <p className="tipo-label">Tipo de conta</p>
      <div className="tipo-options">
        <div
          className={`tipo-option ${tipo === "doador" ? "ativo" : ""}`}
          onClick={() => setTipo("doador")}
        >
          <div className="radio-outer">
            {tipo === "doador" && <div className="radio-inner" />}
          </div>
          <div className="tipo-info">
            <span className="tipo-nome">Doador</span>
            <span className="tipo-desc">Doar materiais recicláveis</span>
          </div>
        </div>
        <div
          className={`tipo-option ${tipo === "coletor" ? "ativo" : ""}`}
          onClick={() => setTipo("coletor")}
        >
          <div className="radio-outer">
            {tipo === "coletor" && <div className="radio-inner" />}
          </div>
          <div className="tipo-info">
            <span className="tipo-nome">Coletor</span>
            <span className="tipo-desc">Coletar materiais recicláveis</span>
          </div>
        </div>
      </div>

      <button className="btn-criar" onClick={handleSubmit}>
        Criar conta
      </button>

      <p className="cc-login-link">
        Já tem uma conta? <a href="/login">Entrar</a>
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
          <h1>Criar conta</h1>
        </div>
        <div className="body">
          {camposFormulario}
        </div>
      </div>

      {/* LAYOUT DESKTOP */}
      <div className="cc-desktop">
        <div className="cc-left">
          <div className="cc-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h2>Recicle mais.<br />Impacte o mundo.</h2>
          <p>Conectamos doadores e coletores de materiais recicláveis de forma simples e eficiente.</p>
          <div className="cc-features">
            <div className="cc-feature">
              <div className="cc-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span>Ganhe pontos a cada coleta realizada</span>
            </div>
            <div className="cc-feature">
              <div className="cc-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span>Coletas agendadas perto de você</span>
            </div>
            <div className="cc-feature">
              <div className="cc-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <span>Troque pontos por recompensas</span>
            </div>
          </div>
        </div>

        <div className="cc-right">
          <h1>Criar conta</h1>
          {camposFormulario}
        </div>
      </div>
    </>
  );
}
