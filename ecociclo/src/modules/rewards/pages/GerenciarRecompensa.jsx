import { Plus, Star, Package, Pencil, Pause, Play, Upload, X, Gift } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useGerenciarRecompensa } from "../hooks/useGerenciarRecompensa";
import "../styles/GerenciarRecompensa.css";

function GerenciarRecompensa() {
  const {
    recompensas,
    modalAberto,
    form,
    setForm,
    erros,
    editandoId,
    abrirModal,
    fecharModal,
    handleSalvar,
    toggleAtiva,
    handleFoto,
  } = useGerenciarRecompensa();

  const ativas   = recompensas.filter((r) => r.ativa).length;
  const pausadas = recompensas.filter((r) => !r.ativa).length;

  return (
    <div className="gr-page">
      <Navigation />

      <main className="gr-main">

        {/* ── Header ── */}
        <section className="gr-header">
          <div className="gr-header-text">
            <p className="gr-kicker">Administração</p>
            <h1>Gerenciar recompensas</h1>
            <p>Cadastre e controle os brindes disponíveis para resgate.</p>
          </div>
          <button className="gr-btn-novo" onClick={() => abrirModal()}>
            <Plus size={18} />
            Nova recompensa
          </button>
        </section>

        {/* ── Stats ── */}
        <div className="gr-stats">
          <div className="gr-stat">
            <div className="gr-stat-icon gr-stat-icon--total">
              <Gift size={16} />
            </div>
            <div>
              <span className="gr-stat-num">{recompensas.length}</span>
              <span className="gr-stat-label">Total</span>
            </div>
          </div>
          <div className="gr-stat">
            <div className="gr-stat-icon gr-stat-icon--ativa">
              <Play size={16} />
            </div>
            <div>
              <span className="gr-stat-num">{ativas}</span>
              <span className="gr-stat-label">Ativas</span>
            </div>
          </div>
          <div className="gr-stat">
            <div className="gr-stat-icon gr-stat-icon--pausada">
              <Pause size={16} />
            </div>
            <div>
              <span className="gr-stat-num">{pausadas}</span>
              <span className="gr-stat-label">Pausadas</span>
            </div>
          </div>
        </div>

        {/* ── Lista de recompensas ── */}
        <div className="gr-lista">
          {recompensas.map((r, i) => (
            <article
              className={`gr-card ${!r.ativa ? "gr-card--pausada" : ""}`}
              key={r.id}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {/* Foto / Placeholder */}
              <div className="gr-card-foto">
                {r.foto ? (
                  <img src={r.foto} alt={r.nome} />
                ) : (
                  <div className="gr-card-foto-placeholder">
                    <Gift size={28} />
                  </div>
                )}
                {!r.ativa && <span className="gr-card-pausada-tag">Pausada</span>}
              </div>

              {/* Conteúdo */}
              <div className="gr-card-body">
                <div className="gr-card-top">
                  <h3 className="gr-card-nome">{r.nome}</h3>
                  <p className="gr-card-desc">{r.descricao}</p>
                </div>

                <div className="gr-card-meta">
                  <div className="gr-meta-item">
                    <Star size={13} className="gr-meta-icon gr-meta-icon--star" />
                    <span><strong>{r.pontos}</strong> pts</span>
                  </div>
                  <div className="gr-meta-item">
                    <Package size={13} className="gr-meta-icon" />
                    <span>
                      <strong className={r.estoque <= 5 ? "gr-estoque-baixo" : ""}>
                        {r.estoque}
                      </strong>{" "}
                      em estoque
                    </span>
                  </div>
                </div>

                <div className="gr-card-actions">
                  <button
                    className="gr-action-btn gr-action-btn--edit"
                    onClick={() => abrirModal(r)}
                    aria-label="Editar"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>
                  <button
                    className={`gr-action-btn ${r.ativa ? "gr-action-btn--pause" : "gr-action-btn--play"}`}
                    onClick={() => toggleAtiva(r.id)}
                    aria-label={r.ativa ? "Pausar" : "Reativar"}
                  >
                    {r.ativa ? <Pause size={14} /> : <Play size={14} />}
                    {r.ativa ? "Pausar" : "Reativar"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* ── Modal ── */}
      {modalAberto && (
        <div className="gr-modal-overlay" onClick={(e) => e.target === e.currentTarget && fecharModal()}>
          <div className="gr-modal">

            <div className="gr-modal-header">
              <div>
                <p className="gr-modal-kicker">{editandoId ? "Editar" : "Nova"} recompensa</p>
                <h2 className="gr-modal-title">
                  {editandoId ? "Atualizar brinde" : "Cadastrar brinde"}
                </h2>
              </div>
              <button className="gr-modal-close" onClick={fecharModal} aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <div className="gr-modal-body">

              {/* Upload de foto */}
              <label className="gr-upload-area">
                <input type="file" accept="image/*" onChange={handleFoto} />
                {form.fotoPreview ? (
                  <img src={form.fotoPreview} alt="Preview" className="gr-upload-preview" />
                ) : (
                  <div className="gr-upload-placeholder">
                    <Upload size={24} />
                    <span>Clique para enviar a foto</span>
                    <small>PNG, JPG até 5MB</small>
                  </div>
                )}
              </label>

              {/* Nome */}
              <div className="gr-field">
                <label>Nome do brinde <span className="gr-req">*</span></label>
                <input
                  type="text"
                  placeholder="Ex: Garrafa Térmica EcoCiclo"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                  className={erros.nome ? "gr-input-erro" : ""}
                />
                {erros.nome && <span className="gr-erro">{erros.nome}</span>}
              </div>

              {/* Descrição */}
              <div className="gr-field">
                <label>Descrição <span className="gr-req">*</span></label>
                <textarea
                  placeholder="Descreva o brinde em detalhes..."
                  value={form.descricao}
                  rows={3}
                  onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                  className={erros.descricao ? "gr-input-erro" : ""}
                />
                {erros.descricao && <span className="gr-erro">{erros.descricao}</span>}
              </div>

              {/* Pontos + Estoque */}
              <div className="gr-field-row">
                <div className="gr-field">
                  <label>Pontos necessários <span className="gr-req">*</span></label>
                  <div className="gr-input-icon-wrap">
                    <Star size={14} className="gr-input-icon" />
                    <input
                      type="number"
                      placeholder="500"
                      min={1}
                      value={form.pontos}
                      onChange={(e) => setForm((f) => ({ ...f, pontos: e.target.value }))}
                      className={erros.pontos ? "gr-input-erro" : ""}
                    />
                  </div>
                  {erros.pontos && <span className="gr-erro">{erros.pontos}</span>}
                </div>

                <div className="gr-field">
                  <label>Estoque <span className="gr-req">*</span></label>
                  <div className="gr-input-icon-wrap">
                    <Package size={14} className="gr-input-icon" />
                    <input
                      type="number"
                      placeholder="10"
                      min={0}
                      value={form.estoque}
                      onChange={(e) => setForm((f) => ({ ...f, estoque: e.target.value }))}
                      className={erros.estoque ? "gr-input-erro" : ""}
                    />
                  </div>
                  {erros.estoque && <span className="gr-erro">{erros.estoque}</span>}
                </div>
              </div>
            </div>

            <div className="gr-modal-footer">
              <button className="gr-btn-cancelar" onClick={fecharModal}>Cancelar</button>
              <button className="gr-btn-salvar" onClick={handleSalvar}>
                {editandoId ? "Salvar alterações" : "Cadastrar brinde"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarRecompensa;