import "../styles/NovoEndereco.css";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
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
    <div className="ne-page">
      <Navigation />

      <main className="ne-main">
        <section className="ne-header">
          <p className="ne-kicker">Cadastro</p>
          <h1>Novo endereço</h1>
          <p>Preencha os dados do seu endereço para facilitar suas coletas.</p>
        </section>

        <section className="ne-content">

          {/* ── Bloco: Localização ── */}
          <div className="ne-block">
            <div className="ne-block-label">
              <svg viewBox="0 0 24 24" className="ne-block-icon">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Identificação
            </div>

            <div className="ne-field ne-field--half">
              <label>CEP <span className="ne-required">*</span></label>
              <div className="ne-input-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
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
              </div>
              {cepErro && <span className="ne-erro">{cepErro}</span>}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="ne-divider" />

          {/* ── Bloco: Endereço ── */}
          <div className="ne-block">
            <div className="ne-block-label">
              <svg viewBox="0 0 24 24" className="ne-block-icon">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Endereço
            </div>

            <div className="ne-field">
              <label>Rua <span className="ne-required">*</span></label>
              <div className="ne-input-wrap">
                <svg viewBox="0 0 24 24">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6"  x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="15" y2="18"/>
                </svg>
                <input
                  type="text"
                  placeholder="Nome da rua"
                  value={rua}
                  onChange={(e) => { setRua(e.target.value); validarRua(e.target.value); }}
                  onBlur={() => validarRua(rua)}
                  className={ruaErro ? "input-erro" : ""}
                />
              </div>
              {ruaErro && <span className="ne-erro">{ruaErro}</span>}
            </div>

            <div className="ne-row">
              <div className="ne-field ne-field--num">
                <label>Número <span className="ne-required">*</span></label>
                <div className="ne-input-wrap">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 9h1v6M14 9h1v6M9 12h6"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="123"
                    value={numero}
                    onChange={(e) => { setNumero(e.target.value); validarNumero(e.target.value); }}
                    onBlur={() => validarNumero(numero)}
                    className={numeroErro ? "input-erro" : ""}
                  />
                </div>
                {numeroErro && <span className="ne-erro">{numeroErro}</span>}
              </div>

              <div className="ne-field">
                <label>Complemento <span className="ne-optional">(opcional)</span></label>
                <div className="ne-input-wrap">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Apto, bloco..."
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="ne-field">
              <label>Bairro <span className="ne-required">*</span></label>
              <div className="ne-input-wrap">
                <svg viewBox="0 0 24 24">
                  <polygon points="3 11 12 2 21 11 21 22 15 22 15 15 9 15 9 22 3 22 3 11"/>
                </svg>
                <input
                  type="text"
                  placeholder="Nome do bairro"
                  value={bairro}
                  onChange={(e) => { setBairro(e.target.value); validarBairro(e.target.value); }}
                  onBlur={() => validarBairro(bairro)}
                  className={bairroErro ? "input-erro" : ""}
                />
              </div>
              {bairroErro && <span className="ne-erro">{bairroErro}</span>}
            </div>

            <div className="ne-row">
              <div className="ne-field">
                <label>Cidade <span className="ne-required">*</span></label>
                <div className="ne-input-wrap">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => { setCidade(e.target.value); validarCidade(e.target.value); }}
                    onBlur={() => validarCidade(cidade)}
                    className={cidadeErro ? "input-erro" : ""}
                  />
                </div>
                {cidadeErro && <span className="ne-erro">{cidadeErro}</span>}
              </div>

              <div className="ne-field ne-field--uf">
                <label>Estado <span className="ne-required">*</span></label>
                <div className="ne-input-wrap">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                    <line x1="4" y1="22" x2="4" y2="15"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="UF"
                    value={estado}
                    maxLength={2}
                    onChange={(e) => {
                      const valor = e.target.value.toUpperCase();
                      setEstado(valor);
                      validarEstado(valor);
                    }}
                    onBlur={() => validarEstado(estado)}
                    className={estadoErro ? "input-erro" : ""}
                  />
                </div>
                {estadoErro && <span className="ne-erro">{estadoErro}</span>}
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="ne-divider" />

          {/* ── Bloco: Preferência ── */}
          <div className="ne-block ne-block--last">
            <label className="ne-checkbox">
              <input
                type="checkbox"
                checked={principal}
                onChange={(e) => setPrincipal(e.target.checked)}
              />
              <span className="ne-check-box" />
              <div className="ne-checkbox-text">
                <strong>Definir como endereço principal</strong>
                <small>Este endereço será usado por padrão nas suas coletas</small>
              </div>
            </label>
          </div>

          {/* ── Botão ── */}
          <button className="ne-btn" onClick={handleSubmit}>
            <svg viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Adicionar endereço
          </button>

        </section>
      </main>
    </div>
  );
}

export default NovoEndereco;