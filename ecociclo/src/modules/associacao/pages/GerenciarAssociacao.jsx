import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Filter,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
  UserPlus,
  BadgeCheck,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useGerenciarAssociacao } from "../hooks/useGerenciarAssociacao";
import "../styles/gerenciar-associacao.css";

function formatarEndereco(endereco) {
  if (!endereco) return "Endereco nao informado";

  const partes = [
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep,
  ].filter(Boolean);

  return partes.length > 0 ? partes.join(" - ") : "Endereco nao informado";
}

function getInicials(nome) {
  return String(nome || "A")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() || "")
    .join("");
}

export default function GerenciarAssociacao() {
  const navigate = useNavigate();
  const {
    associacoesFiltradas,
    coletores,
    membros,
    associacaoAtiva,
    modalAberto,
    drawerAberto,
    form,
    setForm,
    erros,
    editandoId,
    abrirModal,
    fecharModal,
    abrirDetalhes,
    fecharDrawer,
    handleSalvar,
    handleDeletar,
    handleAtribuirColetor,
    carregando,
    carregandoDetalhes,
    salvando,
    removendoId,
    atribuindoId,
    coletorSelecionadoId,
    setColetorSelecionadoId,
    erro,
    busca,
    setBusca,
    stats,
    recarregar,
  } = useGerenciarAssociacao();

  return (
    <div className="ga-page">
      <Navigation />

      <main className="ga-main">
        <div className="ga-container">
          <header className="ga-header">
            <div className="ga-header-copy">
              <p className="ga-kicker">Administracao</p>
              <h1>Gerenciar associações</h1>
              <p>Crie, atualize e acompanhe as cooperativas e seus membros em um unico lugar.</p>
            </div>

            <div className="ga-header-actions">
              <button type="button" className="ga-btn-secondary" onClick={recarregar}>
                <RefreshCw size={16} />
                Atualizar
              </button>
              <button type="button" className="ga-btn-primary" onClick={() => abrirModal()}>
                <Plus size={18} />
                Nova associacao
              </button>
            </div>
          </header>

          <section className="ga-stats">
            <div className="ga-stat-card">
              <div className="ga-stat-icon ga-stat-icon--green">
                <Building2 size={18} />
              </div>
              <div>
                <span className="ga-stat-value">{stats.totalAssociacoes}</span>
                <span className="ga-stat-label">Associacoes</span>
              </div>
            </div>

            <div className="ga-stat-card">
              <div className="ga-stat-icon ga-stat-icon--blue">
                <Users size={18} />
              </div>
              <div>
                <span className="ga-stat-value">{stats.totalColetores}</span>
                <span className="ga-stat-label">Coletores cadastrados</span>
              </div>
            </div>

            <div className="ga-stat-card">
              <div className="ga-stat-icon ga-stat-icon--amber">
                <BadgeCheck size={18} />
              </div>
              <div>
                <span className="ga-stat-value">{stats.associacoesComColetores}</span>
                <span className="ga-stat-label">Associacoes ativas</span>
              </div>
            </div>
          </section>

          <section className="ga-toolbar">
            <div className="ga-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar por nome, CNPJ ou endereco"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <button type="button" className="ga-link" onClick={() => navigate("/admin-dashboard")}>
              <ArrowRight size={16} />
              Voltar ao painel
            </button>
          </section>

          {erro && (
            <div className="ga-alert">
              <AlertCircle size={16} />
              <span>{erro}</span>
              <button type="button" className="ga-alert-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          {carregando ? (
            <div className="ga-empty">
              <Users size={42} strokeWidth={1.4} />
              <p>Carregando associacoes.</p>
              <span>Estamos buscando os registros reais do sistema.</span>
            </div>
          ) : associacoesFiltradas.length === 0 ? (
            <div className="ga-empty">
              <Building2 size={42} strokeWidth={1.4} />
              <p>Nenhuma associacao encontrada.</p>
              <span>Cadastre a primeira associacao para liberar os cards da lista.</span>
            </div>
          ) : (
            <section className="ga-lista">
              {associacoesFiltradas.map((associacao, index) => (
                <article
                  key={associacao.id}
                  className="ga-card"
                  style={{ animationDelay: `${index * 45}ms` }}
                  onClick={() => abrirDetalhes(associacao)}
                >
                  <div className="ga-card-header">
                    <div className="ga-card-identidade">
                      <div className="ga-card-avatar">{getInicials(associacao.nome)}</div>
                      <div className="ga-card-copy">
                        <h3>{associacao.nome}</h3>
                        <p>{associacao.cnpj}</p>
                      </div>
                    </div>

                    <span className="ga-card-badge">
                      <Users size={13} />
                      {associacao.totalColetores} coletores
                    </span>
                  </div>

                  <div className="ga-card-body">
                    <div className="ga-card-meta">
                      <MapPin size={14} />
                      <span>{formatarEndereco(associacao.endereco)}</span>
                    </div>

                    <div className="ga-card-actions">
                      <button
                        type="button"
                        className="ga-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirDetalhes(associacao);
                        }}
                      >
                        Ver detalhes
                        <ChevronRight size={14} />
                      </button>
                      <button
                        type="button"
                        className="ga-action-btn ga-action-btn--edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModal(associacao);
                        }}
                      >
                        <Pencil size={14} />
                        Editar
                      </button>
                      <button
                        type="button"
                        className="ga-action-btn ga-action-btn--delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletar(associacao.id);
                        }}
                        disabled={removendoId === associacao.id}
                      >
                        <Trash2 size={14} />
                        {removendoId === associacao.id ? "Excluindo..." : "Excluir"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>

      {modalAberto && (
        <div className="ga-modal-overlay" onClick={(e) => e.target === e.currentTarget && fecharModal()}>
          <div className="ga-modal">
            <div className="ga-modal-header">
              <div>
                <p className="ga-modal-kicker">{editandoId ? "Editar" : "Nova"} associacao</p>
                <h2>{editandoId ? "Atualizar cooperativa" : "Cadastrar cooperativa"}</h2>
              </div>
              <button type="button" className="ga-modal-close" onClick={fecharModal} aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <div className="ga-modal-body">
              <div className="ga-field">
                <label>Nome da associacao</label>
                <input
                  type="text"
                  placeholder="Ex: Cooperativa Esperanca"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                  className={erros.nome ? "ga-input-erro" : ""}
                />
                {erros.nome && <span className="ga-erro">{erros.nome}</span>}
              </div>

              <div className="ga-field">
                <label>CNPJ</label>
                <input
                  type="text"
                  placeholder="12.345.678/0001-90"
                  value={form.cnpj}
                  onChange={(e) => setForm((f) => ({ ...f, cnpj: e.target.value }))}
                  className={erros.cnpj ? "ga-input-erro" : ""}
                />
                {erros.cnpj && <span className="ga-erro">{erros.cnpj}</span>}
              </div>

              <div className="ga-field-row">
                <div className="ga-field ga-field--wide">
                  <label>Logradouro</label>
                  <input
                    type="text"
                    placeholder="Rua A"
                    value={form.logradouro}
                    onChange={(e) => setForm((f) => ({ ...f, logradouro: e.target.value }))}
                    className={erros.logradouro ? "ga-input-erro" : ""}
                  />
                  {erros.logradouro && <span className="ga-erro">{erros.logradouro}</span>}
                </div>

                <div className="ga-field">
                  <label>Bairro</label>
                  <input
                    type="text"
                    placeholder="Centro"
                    value={form.bairro}
                    onChange={(e) => setForm((f) => ({ ...f, bairro: e.target.value }))}
                    className={erros.bairro ? "ga-input-erro" : ""}
                  />
                  {erros.bairro && <span className="ga-erro">{erros.bairro}</span>}
                </div>
              </div>

              <div className="ga-field-row">
                <div className="ga-field">
                  <label>Cidade</label>
                  <input
                    type="text"
                    placeholder="Salvador"
                    value={form.cidade}
                    onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
                    className={erros.cidade ? "ga-input-erro" : ""}
                  />
                  {erros.cidade && <span className="ga-erro">{erros.cidade}</span>}
                </div>

                <div className="ga-field ga-field--small">
                  <label>Estado</label>
                  <input
                    type="text"
                    placeholder="BA"
                    maxLength={2}
                    value={form.estado}
                    onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value.toUpperCase() }))}
                    className={erros.estado ? "ga-input-erro" : ""}
                  />
                  {erros.estado && <span className="ga-erro">{erros.estado}</span>}
                </div>

                <div className="ga-field ga-field--small">
                  <label>CEP</label>
                  <input
                    type="text"
                    placeholder="40000-000"
                    value={form.cep}
                    onChange={(e) => setForm((f) => ({ ...f, cep: e.target.value }))}
                    className={erros.cep ? "ga-input-erro" : ""}
                  />
                  {erros.cep && <span className="ga-erro">{erros.cep}</span>}
                </div>
              </div>
            </div>

            <div className="ga-modal-footer">
              <button type="button" className="ga-btn-cancel" onClick={fecharModal} disabled={salvando}>
                Cancelar
              </button>
              <button type="button" className="ga-btn-save" onClick={handleSalvar} disabled={salvando}>
                {salvando ? "Salvando..." : editandoId ? "Salvar alteracoes" : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {drawerAberto && associacaoAtiva && (
        <div className="ga-drawer-overlay" onClick={(e) => e.target === e.currentTarget && fecharDrawer()}>
          <aside className="ga-drawer">
            <div className="ga-drawer-header">
              <div>
                <p className="ga-modal-kicker">Detalhes</p>
                <h2>{associacaoAtiva.nome}</h2>
                <p className="ga-drawer-subtitle">{associacaoAtiva.cnpj}</p>
              </div>
              <button type="button" className="ga-modal-close" onClick={fecharDrawer} aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <div className="ga-drawer-body">
              <section className="ga-drawer-card">
                <div className="ga-drawer-card-head">
                  <span>Endereco</span>
                  <MapPin size={15} />
                </div>
                <p>{formatarEndereco(associacaoAtiva.endereco)}</p>
                <div className="ga-drawer-mini-stats">
                  <div>
                    <strong>{associacaoAtiva.totalColetores}</strong>
                    <span>Coletores</span>
                  </div>
                  <div>
                    <strong>{membros.length}</strong>
                    <span>Membros</span>
                  </div>
                </div>
              </section>

              <section className="ga-drawer-card">
                <div className="ga-drawer-card-head">
                  <span>Vincular coletor</span>
                  <UserPlus size={15} />
                </div>
                <div className="ga-inline-form">
                  <select
                    value={coletorSelecionadoId}
                    onChange={(e) => setColetorSelecionadoId(e.target.value)}
                  >
                    <option value="">Selecione um coletor</option>
                    {coletores.map((coletor) => (
                      <option key={coletor.id} value={coletor.id}>
                        {coletor.nome}
                        {coletor.associacao?.nome ? ` - ${coletor.associacao.nome}` : ""}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="ga-btn-primary ga-btn-primary--full"
                    onClick={handleAtribuirColetor}
                    disabled={!coletorSelecionadoId || atribuindoId === coletorSelecionadoId}
                  >
                    {atribuindoId === coletorSelecionadoId ? "Vinculando..." : "Vincular coletor"}
                  </button>
                </div>
              </section>

              <section className="ga-drawer-card">
                <div className="ga-drawer-card-head">
                  <span>Membros da associacao</span>
                  <Users size={15} />
                </div>

                {carregandoDetalhes ? (
                  <p className="ga-drawer-empty">Carregando membros...</p>
                ) : membros.length === 0 ? (
                  <p className="ga-drawer-empty">Nenhum membro vinculado a esta associacao.</p>
                ) : (
                  <div className="ga-member-lista">
                    {membros.map((membro) => (
                      <article key={membro.id} className="ga-member-card">
                        <div className="ga-member-avatar">{getInicials(membro.nome)}</div>
                        <div className="ga-member-info">
                          <h3>{membro.nome}</h3>
                          <p>{membro.email || membro.telefone || "Contato nao informado"}</p>
                          <span>{membro.associacao?.nome || "Associacao nao informada"}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
