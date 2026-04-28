import "../styles/AgendarColeta.css";
import useAgendarColeta from "../hooks/useAgendarColeta";

export default function AgendarColeta() {
  const {
    form,
    erros,
    tiposMaterial,
    enderecos,
    handleChange,
    handleSubmit,
  } = useAgendarColeta();

  return (
    <>
      {/*mobile*/}
      <div className="ac-screen">
        <div className="ac-header">
          <button className="ac-btn-voltar" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1>Agendar coleta</h1>
        </div>
        <div className="ac-body">
          <div className="ac-form-area">
            <p className="ac-subtitle">Preencha os dados para agendar sua coleta</p>

            {/* TIPO DE MATERIAL */}
            <div className="ac-field">
              <label htmlFor="tipoMaterial">Tipo de material <span className="ac-obrigatorio">*</span></label>
              <div className="ac-select-wrapper">
                <select
                  id="tipoMaterial"
                  value={form.tipoMaterial}
                  onChange={handleChange}
                  className={erros.tipoMaterial ? "input-erro" : ""}
                >
                  <option value="">Selecione o tipo</option>
                  {tiposMaterial.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <svg className="ac-select-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {erros.tipoMaterial && <span className="ac-erro">{erros.tipoMaterial}</span>}
            </div>

            {/* PESO ESTIMADO */}
            <div className="ac-field">
              <label htmlFor="pesoEstimado">Peso estimado (kg) <span className="ac-obrigatorio">*</span></label>
              <input
                type="number"
                id="pesoEstimado"
                placeholder="Ex: 10"
                value={form.pesoEstimado}
                onChange={handleChange}
                min="0"
                className={erros.pesoEstimado ? "input-erro" : ""}
              />
              {erros.pesoEstimado && <span className="ac-erro">{erros.pesoEstimado}</span>}
            </div>

            {/* DATA E HORÁRIO */}
            <div className="ac-row">
              <div className="ac-field">
                <label htmlFor="data">Data <span className="ac-obrigatorio">*</span></label>
                <input
                  type="text"
                  id="data"
                  placeholder="dd/mm/aaaa"
                  value={form.data}
                  onChange={handleChange}
                  maxLength={10}
                  className={erros.data ? "input-erro" : ""}
                />
                {erros.data && <span className="ac-erro">{erros.data}</span>}
              </div>
              <div className="ac-field">
                <label htmlFor="horario">Horário <span className="ac-obrigatorio">*</span></label>
                <input
                  type="text"
                  id="horario"
                  placeholder="--:--"
                  value={form.horario}
                  onChange={handleChange}
                  maxLength={5}
                  className={erros.horario ? "input-erro" : ""}
                />
                {erros.horario && <span className="ac-erro">{erros.horario}</span>}
              </div>
            </div>

            {/* ENDEREÇO */}
            <div className="ac-field">
              <label htmlFor="endereco">Endereço de coleta <span className="ac-obrigatorio">*</span></label>
              <div className="ac-select-wrapper">
                <select
                  id="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  className={erros.endereco ? "input-erro" : ""}
                >
                  <option value="">Selecione o endereço</option>
                  {enderecos.map((end) => (
                    <option key={end} value={end}>{end}</option>
                  ))}
                </select>
                <svg className="ac-select-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {erros.endereco && <span className="ac-erro">{erros.endereco}</span>}
            </div>

            {/* OBSERVAÇÕES */}
            <div className="ac-field">
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                placeholder="Informações adicionais sobre a coleta..."
                value={form.observacoes}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* BANNER DE PONTOS */}
            <div className="ac-banner">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Você ganhará pontos ao completar esta coleta!</span>
            </div>

            {/* BOTÃO */}
            <button className="ac-btn" onClick={handleSubmit}>
              Agendar coleta
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="ac-desktop">
        <div className="ac-desktop-left">
          <div className="ac-desktop-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h2>Agende sua<br />coleta agora.</h2>
          <p>Selecione o tipo de material, data e endereço para que um coletor possa buscar seus recicláveis.</p>
          <div className="ac-desktop-features">
            <div className="ac-desktop-feature">
              <div className="ac-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span>Ganhe pontos ao completar a coleta</span>
            </div>
            <div className="ac-desktop-feature">
              <div className="ac-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span>Escolha a melhor data e horário</span>
            </div>
            <div className="ac-desktop-feature">
              <div className="ac-desktop-feature-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span>Coleta no endereço que você escolher</span>
            </div>
          </div>
        </div>

        <div className="ac-desktop-right">
          <h1>Agendar coleta</h1>
          <div className="ac-form-area">
            <p className="ac-subtitle">Preencha os dados para agendar sua coleta</p>

            {/* TIPO DE MATERIAL */}
            <div className="ac-field">
              <label htmlFor="tipoMaterial2">Tipo de material  <span className="ac-obrigatorio">*</span></label>
              <div className="ac-select-wrapper">
                <select
                  id="tipoMaterial2"
                  value={form.tipoMaterial}
                  onChange={handleChange}
                  className={erros.tipoMaterial ? "input-erro" : ""}
                >
                  <option value="">Selecione o tipo</option>
                  {tiposMaterial.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <svg className="ac-select-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {erros.tipoMaterial && <span className="ac-erro">{erros.tipoMaterial}</span>}
            </div>

            {/* PESO ESTIMADO */}
            <div className="ac-field">
              <label htmlFor="pesoEstimado2">Peso estimado (kg)  <span className="ac-obrigatorio">*</span></label>
              <input
                type="number"
                id="pesoEstimado2"
                placeholder="Ex: 10"
                value={form.pesoEstimado}
                onChange={handleChange}
                min="0"
                className={erros.pesoEstimado ? "input-erro" : ""}
              />
              {erros.pesoEstimado && <span className="ac-erro">{erros.pesoEstimado}</span>}
            </div>

            {/* DATA E HORÁRIO */}
            <div className="ac-row">
              <div className="ac-field">
                <label htmlFor="data2">Data  <span className="ac-obrigatorio">*</span></label>
                <input
                  type="text"
                  id="data2"
                  placeholder="dd/mm/aaaa"
                  value={form.data}
                  onChange={handleChange}
                  maxLength={10}
                  className={erros.data ? "input-erro" : ""}
                />
                {erros.data && <span className="ac-erro">{erros.data}</span>}
              </div>
              <div className="ac-field">
                <label htmlFor="horario2">Horário  <span className="ac-obrigatorio">*</span></label>
                <input
                  type="text"
                  id="horario2"
                  placeholder="--:--"
                  value={form.horario}
                  onChange={handleChange}
                  maxLength={5}
                  className={erros.horario ? "input-erro" : ""}
                />
                {erros.horario && <span className="ac-erro">{erros.horario}</span>}
              </div>
            </div>

            {/* ENDEREÇO */}
            <div className="ac-field">
              <label htmlFor="endereco2">Endereço de coleta  <span className="ac-obrigatorio">*</span></label>
              <div className="ac-select-wrapper">
                <select
                  id="endereco2"
                  value={form.endereco}
                  onChange={handleChange}
                  className={erros.endereco ? "input-erro" : ""}
                >
                  <option value="">Selecione o endereço</option>
                  {enderecos.map((end) => (
                    <option key={end} value={end}>{end}</option>
                  ))}
                </select>
                <svg className="ac-select-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {erros.endereco && <span className="ac-erro">{erros.endereco}</span>}
            </div>

            {/* pbservações, pra acrescentar os detalhes */}
            <div className="ac-field">
              <label htmlFor="observacoes2">Observações</label>
              <textarea
                id="observacoes2"
                placeholder="Informações adicionais sobre a coleta..."
                value={form.observacoes}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* BANNER DE PONTOS */}
            <div className="ac-banner">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Você ganhará pontos ao completar esta coleta!</span>
            </div>

            {/*aqui o botão*/}
            <button className="ac-btn" onClick={handleSubmit}>
              Agendar coleta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
