import "../styles/MinhasRecompensas.css";
import useMinhasRecompensas from "../hooks/useMinhasRecompensas";
import { Navigation } from "../../../shared/components/Navigation/Navigation";
import {
  Gift,
  Star,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  AlertCircle,
  Package,
  Wallet,
} from "lucide-react";

function BadgeStatus({ status, label }) {
  if (status === "CONCLUIDO") {
    return (
      <span className="mr-badge mr-badge--concluido">
        <CheckCircle size={12} />
        {label}
      </span>
    );
  }

  if (status === "CANCELADO") {
    return (
      <span className="mr-badge mr-badge--cancelado">
        <XCircle size={12} />
        {label}
      </span>
    );
  }

  return (
    <span className="mr-badge mr-badge--pendente">
      <Clock size={12} />
      {label}
    </span>
  );
}

export default function MinhasRecompensas() {
  const {
    resgatesFiltrados,
    contagens,
    totalPontosGastos,
    pontosAtuais,
    abaAtiva,
    setAbaAtiva,
    loading,
    error,
    recarregar,
  } = useMinhasRecompensas();

  const abas = [
    { id: "pendentes", label: "Pendentes" },
    { id: "concluidas", label: "Concluídas" },
    { id: "canceladas", label: "Canceladas" },
  ];

  return (
    <div className="mr-page">
      <Navigation />

      <main className="mr-main">
        <section className="mr-header">
          <div className="mr-header-copy">
            <p className="mr-kicker">Perfil</p>
            <h1>Minhas recompensas</h1>
            <p>Veja seus resgates reais, os que aguardam retirada e os que já foram validados.</p>
          </div>
        </section>

        <section className="mr-stats">
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--total">
              <Gift size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{contagens.total}</span>
              <span className="mr-stat-label">Total de resgates</span>
            </div>
          </div>
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--pendente">
              <Clock size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{contagens.pendentes}</span>
              <span className="mr-stat-label">Aguardando retirada</span>
            </div>
          </div>
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--utilizada">
              <CheckCircle size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{contagens.concluidas}</span>
              <span className="mr-stat-label">Concluídas</span>
            </div>
          </div>
          <div className="mr-stat">
            <div className="mr-stat-icon mr-stat-icon--pontos">
              <Wallet size={16} />
            </div>
            <div>
              <span className="mr-stat-num">{totalPontosGastos}</span>
              <span className="mr-stat-label">Pontos gastos</span>
            </div>
          </div>
        </section>

        <section className="mr-saldo">
          <Star size={18} />
          <span>
            Você tem <strong>{pontosAtuais}</strong> pontos disponíveis no momento.
          </span>
        </section>

        <section className="mr-content">
          <div className="mr-abas">
            {abas.map((aba) => (
              <button
                key={aba.id}
                type="button"
                className={`mr-aba ${abaAtiva === aba.id ? "mr-aba--ativa" : ""}`}
                onClick={() => setAbaAtiva(aba.id)}
              >
                {aba.label}
                <span>{contagens[aba.id]}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="mr-alerta">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="mr-alerta-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          <div className="mr-lista">
            {loading ? (
              <div className="mr-vazio">
                <Package size={28} />
                <strong>Carregando recompensas</strong>
                <span>Buscando os resgates vinculados ao seu perfil.</span>
              </div>
            ) : resgatesFiltrados.length === 0 ? (
              <div className="mr-vazio">
                <Gift size={28} />
                <strong>Nenhum resgate encontrado</strong>
                <span>
                  As recompensas resgatadas aparecem aqui, separadas entre pendentes e concluídas.
                </span>
              </div>
            ) : (
              resgatesFiltrados.map((resgate, index) => (
                <article
                  className={`mr-card ${resgate.status === "CONCLUIDO" ? "mr-card--concluido" : ""}`}
                  key={resgate.id}
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div className="mr-card-foto">
                    <div className="mr-card-foto-placeholder">
                      <Gift size={28} />
                    </div>
                  </div>

                  <div className="mr-card-body">
                    <div className="mr-card-top">
                      <div className="mr-card-titulo-linha">
                        <h3 className="mr-card-nome">{resgate.recompensaNome}</h3>
                        <BadgeStatus status={resgate.status} label={resgate.statusLabel} />
                      </div>

                      <div className="mr-card-meta">
                        <div className="mr-meta-item">
                          <Star size={13} className="mr-meta-icon mr-meta-icon--star" />
                          <span>
                            <strong>{resgate.pontosGastos}</strong> pontos
                          </span>
                        </div>
                        <div className="mr-meta-item">
                          <Calendar size={13} className="mr-meta-icon" />
                          <span>{resgate.data}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mr-card-bottom">
                      <span className="mr-card-resumo">
                        {resgate.status === "CONCLUIDO"
                          ? "Retirada validada pelo administrador."
                          : resgate.status === "CANCELADO"
                            ? "Resgate cancelado."
                            : "Resgate aguardando retirada física e validação do administrador."}
                      </span>
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
