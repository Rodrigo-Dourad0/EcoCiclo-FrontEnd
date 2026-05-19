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
          <div className="field">
            <label>CEP*</label>
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
            {cepErro && <span className="erro-msg">{cepErro}</span>}
          </div>

          <div className="field">
            <label>Rua*</label>
            <input
              type="text"
              placeholder="Nome da rua"
              value={rua}
              onChange={(e) => {
                setRua(e.target.value);
                validarRua(e.target.value);
              }}
              onBlur={() => validarRua(rua)}
              className={ruaErro ? "input-erro" : ""}
            />
            {ruaErro && <span className="erro-msg">{ruaErro}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label>Número*</label>
              <input
                type="text"
                placeholder="123"
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value);
                  validarNumero(e.target.value);
                }}
                onBlur={() => validarNumero(numero)}
                className={numeroErro ? "input-erro" : ""}
              />
              {numeroErro && <span className="erro-msg">{numeroErro}</span>}
            </div>

            <div className="field">
              <label>Complemento</label>
              <input
                type="text"
                placeholder="Apto, bloco..."
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Bairro*</label>
            <input
              type="text"
              placeholder="Nome do bairro"
              value={bairro}
              onChange={(e) => {
                setBairro(e.target.value);
                validarBairro(e.target.value);
              }}
              onBlur={() => validarBairro(bairro)}
              className={bairroErro ? "input-erro" : ""}
            />
            {bairroErro && <span className="erro-msg">{bairroErro}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label>Cidade*</label>
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => {
                  setCidade(e.target.value);
                  validarCidade(e.target.value);
                }}
                onBlur={() => validarCidade(cidade)}
                className={cidadeErro ? "input-erro" : ""}
              />
              {cidadeErro && <span className="erro-msg">{cidadeErro}</span>}
            </div>

            <div className="field field-uf">
              <label>Estado*</label>
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
              {estadoErro && <span className="erro-msg">{estadoErro}</span>}
            </div>
          </div>

          <label className="ne-checkbox">
            <input
              type="checkbox"
              checked={principal}
              onChange={(e) => setPrincipal(e.target.checked)}
            />
            <span></span>
            Definir como endereço principal
          </label>

          <button className="ne-btn" onClick={handleSubmit}>
            Adicionar endereço
          </button>
        </section>
      </main>
    </div>
  );
}

export default NovoEndereco;