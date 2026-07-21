import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  RefreshCw,
  User,
  Weight,
  AlertCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMinhasDoacoes } from "../hooks/useMinhasDoacoes.js";
import "../styles/MinhasDoacoes.css";

export default function MinhasDoacoes() {
  const navigate = useNavigate();
  const {
    abaAtiva,
    setAbaAtiva,
    doacoesFiltradas,
    contagens,
    loading,
    error,
    acaoMensagem,
    acaoEmAndamentoId,
    confirmarColeta,
    recarregar,
  } = useMinhasDoacoes();

  const abas = [
    { id: "agendadas", label: "Agendadas" },
    { id: "aceitas", label: "Aceitas" },
    { id: "coletadas", label: "Coletadas" },
    { id: "canceladas", label: "Canceladas" },
  ];

  function abrirAvaliacao(doacao) {
    const params = new URLSearchParams({
      agendamentoId: doacao.id,
      coletorId: doacao.coletorId || "",
      coletorNome: doacao.coletor?.nome || "Coletor",
    });

    navigate(`/avaliar-coletor?${params.toString()}`);
  }

  return (
    <div className="mc-page">
      <Navigation />

      <main className="mc-main">
        <section className="mc-header">
          <button
            type="button"
            className="mc-voltar-btn"
            onClick={() => navigate("/agendar-doacao")}
            aria-label="Voltar para cadastrar doacao"
          >
            <ArrowLeft size={16} />
            <span>Voltar para cadastrar doacao</span>
          </button>

          <div className="mc-header-copy">
            <p className="mc-kicker">Doacoes</p>
            <h1>Minhas doacoes</h1>
            <p>Acompanhe seus agendamentos reais, separados por etapa do fluxo.</p>
          </div>
        </section>

        <section className="mc-content">
          <div className="mc-abas">
            {abas.map((aba) => (
              <button
                key={aba.id}
                className={`mc-aba ${abaAtiva === aba.id ? "mc-aba--ativa" : ""}`}
                onClick={() => setAbaAtiva(aba.id)}
              >
                <span className="mc-aba-label">{aba.label}</span>
                <span className={`mc-aba-count ${abaAtiva === aba.id ? "mc-aba-count--ativa" : ""}`}>
                  {contagens[aba.id]}
                </span>
              </button>
            ))}
          </div>

          {acaoMensagem && !error && (
            <div className="mc-alerta mc-alerta--sucesso">
              <Sparkles size={16} />
              <span>{acaoMensagem}</span>
              <button type="button" className="mc-recarregar-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Atualizar
              </button>
            </div>
          )}

          {error && (
            <div className="mc-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="mc-recarregar-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          <div className="mc-lista">
            {loading ? (
              <div className="mc-empty">
                <Package size={40} strokeWidth={1.2} />
                <p>Carregando suas doacoes.</p>
                <span>Estamos buscando os agendamentos vinculados ao seu perfil.</span>
              </div>
            ) : doacoesFiltradas.length === 0 ? (
              <div className="mc-empty">
                <Package size={40} strokeWidth={1.2} />
                <p>Nenhuma doacao encontrada nessa aba.</p>
                <span>As doacoes aceitas e concluidas aparecerao aqui quando forem vinculadas ao seu usuario.</span>
              </div>
            ) : (
              doacoesFiltradas.map((doacao, index) => (
                <article className="mc-card" key={doacao.id} style={{ animationDelay: `${index * 60}ms` }}>
                  <div
                    className={`mc-card-stripe ${
                      doacao.status === "CONCLUIDO"
                        ? "mc-card-stripe--coletadas"
                        : doacao.status === "CONFIRMADO" ||
                            doacao.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
                          ? "mc-card-stripe--aceitas"
                          : "mc-card-stripe--agendadas"
                    }`}
                  />

                  <div className="mc-card-inner">
                    <div className="mc-card-header">
                      <div className="mc-card-title">
                        <div
                          className={`mc-icon-wrap ${
                            doacao.status === "CONCLUIDO"
                              ? "mc-icon-wrap--coletadas"
                              : doacao.status === "CONFIRMADO" ||
                                  doacao.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
                                ? "mc-icon-wrap--aceitas"
                              : "mc-icon-wrap--agendadas"
                          }`}
                        >
                          <Package size={18} />
                        </div>
                        <div>
                          <h3>{doacao.doacao?.nome || "Doacao"}</h3>
                          <p>
                            {doacao.status === "CONFIRMADO"
                              ? "Seu coletor ja aceitou este agendamento."
                              : doacao.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
                                ? "A retirada foi feita e aguarda sua confirmacao."
                                : doacao.status === "CONCLUIDO"
                                  ? "Coleta finalizada com pontos liberados."
                                  : "Aguardando um coletor aceitar."}
                          </p>
                        </div>
                      </div>

                      <span className={`mc-badge ${doacao.statusClass}`}>
                        {doacao.status === "CONFIRMADO"
                          ? "Aceita"
                          : doacao.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR"
                            ? "Aguardando confirmacao"
                            : doacao.status === "CONCLUIDO"
                              ? "Coletada"
                              : doacao.status === "CANCELADO"
                                ? "Cancelada"
                                : "Agendada"}
                      </span>
                    </div>

                    <div className="mc-divider" />

                    <div className="mc-card-body">
                      <div className="mc-meta-grid">
                        <div className="mc-meta-item">
                          <Calendar size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Data e hora</span>
                            <span className="mc-meta-value">{doacao.dataColetaFormatada}</span>
                          </div>
                        </div>

                        <div className="mc-meta-item">
                          <MapPin size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Endereco</span>
                            <span className="mc-meta-value">
                              {doacao.endereco?.completo ||
                                doacao.doador?.endereco?.completo ||
                                doacao.enderecoId ||
                                "Endereco nao informado"}
                            </span>
                          </div>
                        </div>

                        <div className="mc-meta-item">
                          <Weight size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Peso estimado</span>
                            <span className="mc-meta-value mc-meta-value--strong">
                              {doacao.doacao?.peso != null ? `${doacao.doacao.peso} kg` : "Nao informado"}
                            </span>
                          </div>
                        </div>

                        <div className="mc-meta-item">
                          <User size={14} className="mc-meta-icon" />
                          <div>
                            <span className="mc-meta-label">Coletor</span>
                            <span className="mc-meta-value mc-meta-value--strong">
                              {doacao.coletorId ? doacao.coletor.nome : "Aguardando coletor"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {doacao.status === "CONCLUIDO" ? (
                        <div className="mc-pontos-wrap">
                          <span className="mc-pontos">
                            <CheckCircle2 size={14} />
                            {doacao.pontosGerados > 0
                              ? `${doacao.pontosGerados} pontos gerados`
                              : "Pontos computados"}
                          </span>
                        </div>
                      ) : doacao.observacoes ? (
                        <div className="mc-pontos-wrap">
                          <span className="mc-pontos">{doacao.observacoes}</span>
                        </div>
                      ) : null}

                      {doacao.status === "CONCLUIDO" && (
                        <div className="mc-card-actions">
                          {doacao.jaAvaliado ? (
                            <p className="mc-card-ajuda">Você já avaliou este coletor.</p>
                          ) : (
                            <button
                              type="button"
                              className="mc-concluir-btn"
                              onClick={() => abrirAvaliacao(doacao)}
                              disabled={!doacao.coletorId}
                            >
                              <Star size={14} />
                              Avaliar coletor
                            </button>
                          )}
                        </div>
                      )}

                      {(doacao.status === "CONFIRMADO" ||
                        doacao.status === "AGUARDANDO_CONFIRMACAO_DO_DOADOR") && (
                        <div className="mc-card-actions">
                          <button
                            type="button"
                            className="mc-concluir-btn"
                            onClick={() => confirmarColeta(doacao.id)}
                            disabled={acaoEmAndamentoId === doacao.id}
                          >
                            <Clock3 size={14} />
                            {acaoEmAndamentoId === doacao.id
                              ? "Concluindo..."
                              : "O coletor ja coletou"}
                          </button>
                          <p className="mc-card-ajuda">
                            Ao confirmar, o sistema conclui o agendamento e libera os pontos do doador.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
