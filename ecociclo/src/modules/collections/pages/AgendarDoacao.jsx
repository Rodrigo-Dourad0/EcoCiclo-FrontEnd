import "../styles/AgendarDoacao.css";
import useAgendarDoacao from "../hooks/useAgendarDoacao.js";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";

export default function AgendarDoacao() {
  const {
    form,
    erros,
    tiposMaterial,
    enderecos,
    fotos,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFotosChange,
    handleRemoverFoto,
  } = useAgendarDoacao();

  /* Drag-over visual */
  function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }
  function handleDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }
  function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const arquivos = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (arquivos.length) handleFotosChange({ target: { files: arquivos } });
  }

  return (
    <div className="ac-page">
      <Navigation />

      <main className="ac-main">
        {/* ── Header ── */}
        <section className="ac-header">
          <p className="ac-kicker">Doações</p>
          <h1>Agendar Doação</h1>
          <p>Preencha os dados para agendar sua doação de recicláveis.</p>
        </section>

        <section className="ac-content">

          {/* ══ Bloco 1: Material ══ */}
          <div className="ac-block">
            <div className="ac-block-label">
              <svg viewBox="0 0 24 24" className="ac-block-icon">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              Material
            </div>

            {/* Tipo de material */}
            <div className="ac-field">
              <label htmlFor="tipoMaterial">
                Tipo de material <span className="ac-required">*</span>
              </label>
              <div className="ac-select-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                <select
                  id="tipoMaterial"
                  value={form.tipoMaterial}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={erros.tipoMaterial ? "input-erro" : ""}
                >
                  <option value="">Selecione o tipo</option>
                  {(tiposMaterial || []).map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
                <svg className="ac-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {erros.tipoMaterial && <span className="ac-erro">{erros.tipoMaterial}</span>}
            </div>

            {/* Peso estimado */}
            <div className="ac-field ac-field--half">
              <label htmlFor="pesoEstimado">
                Peso estimado (kg) <span className="ac-required">*</span>
              </label>
              <div className="ac-input-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <input
                  type="number"
                  id="pesoEstimado"
                  placeholder="Ex: 10"
                  value={form.pesoEstimado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  className={erros.pesoEstimado ? "input-erro" : ""}
                />
              </div>
              {erros.pesoEstimado && <span className="ac-erro">{erros.pesoEstimado}</span>}
            </div>
          </div>

          <div className="ac-divider" />

          {/* ══ Bloco 2: Agendamento ══ */}
          <div className="ac-block">
            <div className="ac-block-label">
              <svg viewBox="0 0 24 24" className="ac-block-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Agendamento
            </div>

            <div className="ac-row">
              {/* Data */}
              <div className="ac-field">
                <label htmlFor="data">
                  Data <span className="ac-required">*</span>
                </label>
                <div className="ac-input-wrap">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <input
                    type="text"
                    id="data"
                    placeholder="dd/mm/aaaa"
                    value={form.data}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={10}
                    className={erros.data ? "input-erro" : ""}
                  />
                </div>
                {erros.data && <span className="ac-erro">{erros.data}</span>}
              </div>

              {/* Horário */}
              <div className="ac-field ac-field--time">
                <label htmlFor="horario">
                  Horário <span className="ac-required">*</span>
                </label>
                <div className="ac-input-wrap">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <input
                    type="text"
                    id="horario"
                    placeholder="--:--"
                    value={form.horario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={5}
                    className={erros.horario ? "input-erro" : ""}
                  />
                </div>
                {erros.horario && <span className="ac-erro">{erros.horario}</span>}
              </div>
            </div>
          </div>

          <div className="ac-divider" />

          {/* ══ Bloco 3: Endereço ══ */}
          <div className="ac-block">
            <div className="ac-block-label">
              <svg viewBox="0 0 24 24" className="ac-block-icon">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Endereço
            </div>

            <div className="ac-field">
              <label htmlFor="endereco">
                Endereço de coleta <span className="ac-required">*</span>
              </label>
              <div className="ac-select-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <select
                  id="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={erros.endereco ? "input-erro" : ""}
                >
                  <option value="">Selecione o endereço</option>
                  {(enderecos || []).map((end) => (
                    <option key={end} value={end}>{end}</option>
                  ))}
                </select>
                <svg className="ac-chevron" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {erros.endereco && <span className="ac-erro">{erros.endereco}</span>}
            </div>
          </div>

          <div className="ac-divider" />

          {/* ══ Bloco 4: Fotos dos materiais ══ */}
          <div className="ac-block">
            <div className="ac-block-label">
              <svg viewBox="0 0 24 24" className="ac-block-icon">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Fotos dos materiais
            </div>

            <div className="ac-field">
              <label>
                Fotos <span className="ac-optional">(opcional)</span>
              </label>

              {/* Área de upload */}
              <div
                className="ac-upload-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="fotos"
                  accept="image/*"
                  multiple
                  onChange={handleFotosChange}
                />
                <div className="ac-upload-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="ac-upload-title">
                  Clique ou arraste as fotos aqui
                </div>
                <div className="ac-upload-sub">
                  <span>JPG, PNG ou WEBP</span> · Até 5 imagens · Máx. 10 MB cada
                </div>
              </div>

              {/* Preview das fotos */}
              {fotos && fotos.length > 0 && (
                <>
                  <div className="ac-fotos-grid">
                    {fotos.map((foto, index) => (
                      <div className="ac-foto-item" key={index}>
                        <img
                          src={URL.createObjectURL(foto)}
                          alt={`Foto ${index + 1}`}
                        />
                        <button
                          type="button"
                          className="ac-foto-remove"
                          onClick={() => handleRemoverFoto(index)}
                          aria-label={`Remover foto ${index + 1}`}
                        >
                          <svg viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="ac-fotos-count">
                    {fotos.length} {fotos.length === 1 ? "foto selecionada" : "fotos selecionadas"}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="ac-divider" />

          {/* ══ Bloco 5: Observações ══ */}
          <div className="ac-block ac-block--last">
            <div className="ac-block-label">
              <svg viewBox="0 0 24 24" className="ac-block-icon">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Detalhes
            </div>

            <div className="ac-field">
              <label htmlFor="observacoes">
                Observações <span className="ac-optional">(opcional)</span>
              </label>
              <div className="ac-textarea-wrap">
                <textarea
                  id="observacoes"
                  placeholder="Informações adicionais sobre os materiais, condições de acesso, etc..."
                  value={form.observacoes}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            {/* Banner de pontos */}
            <div className="ac-banner">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Você ganhará pontos ao completar esta doação!</span>
            </div>
          </div>

          {/* ── Botão principal ── */}
          <button className="ac-btn" onClick={handleSubmit}>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Agendar doação
          </button>

        </section>
      </main>
    </div>
  );
}