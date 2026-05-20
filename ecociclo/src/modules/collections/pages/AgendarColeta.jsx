import "../styles/AgendarColeta.css";
import useAgendarColeta from "../hooks/useAgendarColeta";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";

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

      <div className="ac-page">
      {/*mobile*/}
      <Navigation />
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
                  {(tiposMaterial || []).map((tipo) => (
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
                  {(enderecos || []).map((end) => (
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
    </div>
    </>
  );
}
