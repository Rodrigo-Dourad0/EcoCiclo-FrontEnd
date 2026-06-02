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

  return (
    <>
      {/* MOBILE / TABLET */}
      <div className="cc-screen">
        <div className="cc-header">
          <button className="cc-btn-voltar" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1>Criar conta</h1>
        </div>

        <div className="cc-body">
          <p className="cc-subtitle">Preencha seus dados para criar sua conta</p>

          <div className="cc-fields-card">
            <div className="cc-field">
              <label htmlFor="nome">Nome completo <span className="cc-obrigatorio">*</span></label>
              <input type="text" id="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} className={erros.nome ? "input-erro" : ""} autoComplete="new-password" />
              {erros.nome && <span className="cc-erro">{erros.nome}</span>}
            </div>

            <div className="cc-field">
              <label htmlFor="email">Email <span className="cc-obrigatorio">*</span></label>
              <input type="email" id="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} className={erros.email ? "input-erro" : ""} autoComplete="off" />
              {erros.email && <span className="cc-erro">{erros.email}</span>}
            </div>

            <div className="cc-field">
              <label htmlFor="telefone">Telefone <span className="cc-obrigatorio">*</span></label>
              <input type="tel" id="telefone" placeholder="(00) 00000-0000" maxLength={15} value={form.telefone} onChange={handleChange} className={erros.telefone ? "input-erro" : ""} autoComplete="off" />
              {erros.telefone && <span className="cc-erro">{erros.telefone}</span>}
            </div>

            <div className="cc-field">
              <label htmlFor="endereco">Endereço <span className="cc-obrigatorio">*</span></label>
              <input type="text" id="endereco" placeholder="Rua, número, bairro, cidade" value={form.endereco} onChange={handleChange} className={erros.endereco ? "input-erro" : ""} />
              {erros.endereco && <span className="cc-erro">{erros.endereco}</span>}
            </div>

            <div className="cc-field-divider" />

            <div className="cc-field">
              <label htmlFor="senha">Senha <span className="cc-obrigatorio">*</span></label>
              <input type="password" id="senha" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={handleChange} className={erros.senha ? "input-erro" : ""} autoComplete="new-password" />
              {erros.senha && <span className="cc-erro">{erros.senha}</span>}
            </div>

            <div className="cc-field">
              <label htmlFor="confirmarSenha">Confirmar senha <span className="cc-obrigatorio">*</span></label>
              <input type="password" id="confirmarSenha" placeholder="Digite a senha novamente" value={form.confirmarSenha} onChange={handleChange} className={erros.confirmarSenha ? "input-erro" : ""} autoComplete="new-password" />
              {erros.confirmarSenha && <span className="cc-erro">{erros.confirmarSenha}</span>}
            </div>
          </div>

          <p className="cc-tipo-label">Tipo de conta</p>
          <div className="cc-tipo-options">
            <div className={`cc-tipo-option ${tipo === "doador" ? "ativo" : ""}`} onClick={() => setTipo("doador")}>
              <div className="cc-radio-outer">{tipo === "doador" && <div className="cc-radio-inner" />}</div>
              <div className="cc-tipo-info">
                <span className="cc-tipo-nome">Doador</span>
                <span className="cc-tipo-desc">Doar materiais recicláveis</span>
              </div>
            </div>
            <div className={`cc-tipo-option ${tipo === "coletor" ? "ativo" : ""}`} onClick={() => setTipo("coletor")}>
              <div className="cc-radio-outer">{tipo === "coletor" && <div className="cc-radio-inner" />}</div>
              <div className="cc-tipo-info">
                <span className="cc-tipo-nome">Coletor</span>
                <span className="cc-tipo-desc">Coletar materiais recicláveis</span>
              </div>
            </div>
          </div>

          <button className="cc-btn-criar" onClick={handleSubmit}>Criar conta</button>
        </div>
      </div>

      {/* DESKTOP */}
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
          <p className="cc-subtitle">Preencha seus dados para criar sua conta</p>

          <div className="cc-form-card">
            <div className="cc-row">
              <div className="cc-field cc-full">
                <label htmlFor="nome2">Nome completo <span className="cc-obrigatorio">*</span></label>
                <input type="text" id="nome2" placeholder="Seu nome" value={form.nome} onChange={handleChange} className={erros.nome ? "input-erro" : ""} autoComplete="new-password" />
                {erros.nome && <span className="cc-erro">{erros.nome}</span>}
              </div>
            </div>

            <div className="cc-row">
              <div className="cc-field">
                <label htmlFor="email2">Email <span className="cc-obrigatorio">*</span></label>
                <input type="email" id="email2" placeholder="seu@email.com" value={form.email} onChange={handleChange} className={erros.email ? "input-erro" : ""} autoComplete="off" />
                {erros.email && <span className="cc-erro">{erros.email}</span>}
              </div>
              <div className="cc-field">
                <label htmlFor="telefone2">Telefone <span className="cc-obrigatorio">*</span></label>
                <input type="tel" id="telefone2" placeholder="(00) 00000-0000" maxLength={15} value={form.telefone} onChange={handleChange} className={erros.telefone ? "input-erro" : ""} autoComplete="off" />
                {erros.telefone && <span className="cc-erro">{erros.telefone}</span>}
              </div>
            </div>

            <div className="cc-row">
              <div className="cc-field cc-full">
                <label htmlFor="endereco2">Endereço <span className="cc-obrigatorio">*</span></label>
                <input type="text" id="endereco2" placeholder="Rua, número, bairro, cidade" value={form.endereco} onChange={handleChange} className={erros.endereco ? "input-erro" : ""} />
                {erros.endereco && <span className="cc-erro">{erros.endereco}</span>}
              </div>
            </div>

            <div className="cc-row">
              <div className="cc-field">
                <label htmlFor="senha2">Senha <span className="cc-obrigatorio">*</span></label>
                <input type="password" id="senha2" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={handleChange} className={erros.senha ? "input-erro" : ""} autoComplete="new-password" />
                {erros.senha && <span className="cc-erro">{erros.senha}</span>}
              </div>
              <div className="cc-field">
                <label htmlFor="confirmarSenha2">Confirmar senha <span className="cc-obrigatorio">*</span></label>
                <input type="password" id="confirmarSenha2" placeholder="Digite novamente" value={form.confirmarSenha} onChange={handleChange} className={erros.confirmarSenha ? "input-erro" : ""} autoComplete="new-password" />
                {erros.confirmarSenha && <span className="cc-erro">{erros.confirmarSenha}</span>}
              </div>
            </div>
          </div>

          <div className="cc-tipo-card">
            <p className="cc-tipo-label">Tipo de conta</p>
            <div className="cc-tipo-options">
              <div className={`cc-tipo-option ${tipo === "doador" ? "ativo" : ""}`} onClick={() => setTipo("doador")}>
                <div className="cc-radio-outer">{tipo === "doador" && <div className="cc-radio-inner" />}</div>
                <div className="cc-tipo-info">
                  <span className="cc-tipo-nome">Doador</span>
                  <span className="cc-tipo-desc">Doar materiais recicláveis</span>
                </div>
              </div>
              <div className={`cc-tipo-option ${tipo === "coletor" ? "ativo" : ""}`} onClick={() => setTipo("coletor")}>
                <div className="cc-radio-outer">{tipo === "coletor" && <div className="cc-radio-inner" />}</div>
                <div className="cc-tipo-info">
                  <span className="cc-tipo-nome">Coletor</span>
                  <span className="cc-tipo-desc">Coletar materiais recicláveis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cc-actions">
            <button className="cc-btn-criar" onClick={handleSubmit}>Criar conta</button>
            <p className="cc-login-link">Já tem uma conta? <a href="/login">Entrar</a></p>
          </div>
        </div>
      </div>
    </>
  );
}