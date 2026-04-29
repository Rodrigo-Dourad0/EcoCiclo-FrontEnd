import "../styles/NovoEndereco.css";
import { useNovoEndereco } from "../hooks/useNovoEndereco";

function NovoEndereco() {
  const {
    cep, setCep, cepErro, validarCep,
    rua, setRua, ruaErro, validarRua,
    numero, setNumero, numeroErro, validarNumero,
    complemento, setComplemento,
    bairro, setBairro, bairroErro, validarBairro,
    cidade, setCidade, cidadeErro, validarCidade,
    estado, setEstado, estadoErro, validarEstado,
    principal, setPrincipal,
    handleSubmit,
  } = useNovoEndereco();

  return (
    <>
      {/* LEFT */}
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
            Novo<br /><em>endereço</em>
          </h1>
          <p className="hero-sub">
            Cadastre um novo endereço para facilitar suas doações e coletas. Rápido, seguro e sempre à mão.
          </p>
        </div>

        <div className="testimonial">
          <p>"Cadastrar endereços nunca foi tão simples. A experiência é incrível!"</p>
          <div className="testimonial-footer">
            <div className="testimonial-avatar">RL</div>
            <span className="testimonial-author">Rafael Lima, Usuário EcoCiclo</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="panel-right">

        {/* Header mobile */}
        <div className="mobile-header">
          <button className="mobile-back">
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h2 className="mobile-title">Novo endereço</h2>
        </div>

        <div className="form-card">
          <div className="form-header">
            <p className="form-greeting">Cadastro</p>
            <h2 className="form-title">Novo endereço</h2>
            <p className="form-sub">Preencha os dados do seu endereço</p>
          </div>

          {/* CEP */}
          <div className="field">
            <label>CEP*</label>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                maxLength={9}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
                  setCep(v);
                  validarCep(v);
                }}
                onBlur={() => validarCep(cep)}
                className={cepErro ? "input-erro" : ""}
              />
              <svg viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            {cepErro && <span className="erro-msg">{cepErro}</span>}
          </div>

          {/* Rua */}
          <div className="field">
            <label>Rua*</label>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="Nome da rua"
                value={rua}
                onChange={(e) => { setRua(e.target.value); validarRua(e.target.value); }}
                onBlur={() => validarRua(rua)}
                className={ruaErro ? "input-erro" : ""}
              />
              <svg viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </div>
            {ruaErro && <span className="erro-msg">{ruaErro}</span>}
          </div>

          {/* Número + Complemento */}
          <div className="field-row-group">
            <div className="field">
              <label>Número*</label>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="123"
                  value={numero}
                  onChange={(e) => { setNumero(e.target.value); validarNumero(e.target.value); }}
                  onBlur={() => validarNumero(numero)}
                  className={numeroErro ? "input-erro" : ""}
                />
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6M9 12h6M9 15h4"/>
                </svg>
              </div>
              {numeroErro && <span className="erro-msg">{numeroErro}</span>}
            </div>

            <div className="field">
              <label>Complemento</label>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="Apto, bloco..."
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Bairro */}
          <div className="field">
            <label>Bairro*</label>
            <div className="input-wrap">
              <input
                type="text"
                placeholder="Nome do bairro"
                value={bairro}
                onChange={(e) => { setBairro(e.target.value); validarBairro(e.target.value); }}
                onBlur={() => validarBairro(bairro)}
                className={bairroErro ? "input-erro" : ""}
              />
              <svg viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            {bairroErro && <span className="erro-msg">{bairroErro}</span>}
          </div>

          {/* Cidade + Estado */}
          <div className="field-row-group">
            <div className="field">
              <label>Cidade*</label>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => { setCidade(e.target.value); validarCidade(e.target.value); }}
                  onBlur={() => validarCidade(cidade)}
                  className={cidadeErro ? "input-erro" : ""}
                />
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              {cidadeErro && <span className="erro-msg">{cidadeErro}</span>}
            </div>

            <div className="field">
              <label>Estado*</label>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="UF"
                  value={estado}
                  maxLength={2}
                  onChange={(e) => { setEstado(e.target.value.toUpperCase()); validarEstado(e.target.value); }}
                  onBlur={() => validarEstado(estado)}
                  className={estadoErro ? "input-erro" : ""}
                />
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              {estadoErro && <span className="erro-msg">{estadoErro}</span>}
            </div>
          </div>

          {/* Endereço principal */}
          <label className="remember">
            <input
              type="checkbox"
              checked={principal}
              onChange={(e) => setPrincipal(e.target.checked)}
            />
            <span className="check-box"></span>
            <span className="remember-label">Definir como endereço principal</span>
          </label>

          <button className="btn-login" onClick={handleSubmit}>
            Adicionar endereço
          </button>
        </div>
      </div>
    </>
  );
}

export default NovoEndereco;