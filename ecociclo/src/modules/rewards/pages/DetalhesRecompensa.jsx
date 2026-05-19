import { Gift, Star, Calendar, Check } from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useDetalhesRecompensa } from "../hooks/DetalhesRecompensa";
import "../styles/DetalhesRecompensa.css";

function DetalhesRecompensa() {
  const { recompensa, resgatado, podeResgatar, handleResgatar } =
    useDetalhesRecompensa();

  return (
    <div className="dr-page">
      <Navigation />

      <main className="dr-main">
        <section className="dr-header">
          <p className="dr-kicker">Recompensas</p>
          <h1>Detalhes da recompensa</h1>
          <p>Confira os detalhes da sua recompensa e resgate agora mesmo.</p>
        </section>

        <section className="dr-content">
          <div className="dr-icone-wrap">
            <Gift size={56} />
          </div>

          <div className="dr-titulo-row">
            <div>
              <h2 className="dr-titulo">{recompensa.titulo}</h2>
              <p className="dr-descricao">{recompensa.descricao}</p>
            </div>

            <span className="dr-tipo-badge">{recompensa.tipo}</span>
          </div>

          <div className="dr-pontos-card">
            <div className="dr-pontos-esquerda">
              <Star size={20} />
              <span>{recompensa.pontosNecessarios} pontos</span>
            </div>

            <div className="dr-pontos-direita">
              <span>Seus pontos</span>
              <strong>{recompensa.pontosUsuario}</strong>
            </div>
          </div>

          <div className="dr-secao">
            <h3>Sobre esta recompensa</h3>
            <p>{recompensa.sobre}</p>
          </div>

          <div className="dr-validade-card">
            <Calendar size={22} />
            <div>
              <span>Válido até</span>
              <strong>{recompensa.validade}</strong>
            </div>
          </div>

          <p className="dr-obs">{recompensa.observacao}</p>

          {resgatado ? (
            <div className="dr-resgatado">
              <Check size={20} />
              Recompensa resgatada com sucesso!
            </div>
          ) : (
            <button
              className={`dr-btn ${!podeResgatar ? "dr-btn--desabilitado" : ""}`}
              onClick={handleResgatar}
              disabled={!podeResgatar}
            >
              <Gift size={20} />
              {podeResgatar ? "Resgatar recompensa" : "Pontos insuficientes"}
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

export default DetalhesRecompensa;