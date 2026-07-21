import { useNavigate } from "react-router-dom";
import CardAvaliacao from "../components/CardAvaliacao.jsx";
import ResumoEstrelas from "../components/ResumoEstrelas.jsx";
import FiltrosBotoes from "../components/FiltrosBotoes.jsx";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMinhasAvaliacoes } from "../hooks/useMinhasAvaliacoes";
import "../styles/MinhasAvaliacoes.css";

export default function MinhasAvaliacoes() {
  const navigate = useNavigate();
  const {
    filtroAtivo,
    setFiltroAtivo,
    avaliacoes,
    avaliacoesFiltradas,
    resumo,
    loading,
    error,
    recarregar,
  } = useMinhasAvaliacoes();

  return (
    <div className="minhas-avaliacoes">
      <Navigation />

      <main className="avaliacoes-conteudo">
        <header className="avaliacoes-conteudo__header">
          <button className="btn-voltar" onClick={() => navigate("/perfil")} aria-label="Voltar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span>Minhas avaliações</span>
          </button>
        </header>

        <ResumoEstrelas avaliacoes={avaliacoes} />
        <FiltrosBotoes filtroAtivo={filtroAtivo} onFiltroChange={setFiltroAtivo} />

        <section className="avaliacoes-resumo-texto">
          <span>{resumo.total} avaliações recebidas</span>
          <span>Média {resumo.media.toFixed(1)} estrelas</span>
        </section>

        {error && (
          <div className="lista-vazia lista-vazia--erro">
            <p>{error}</p>
            <button type="button" className="filtro-btn filtro-btn--ativo" onClick={recarregar}>
              Tentar novamente
            </button>
          </div>
        )}

        <section className="lista-avaliacoes" aria-live="polite">
          {loading ? (
            <div className="lista-vazia">
              <span>🌿</span>
              <p>Carregando avaliações.</p>
            </div>
          ) : avaliacoesFiltradas.length === 0 ? (
            <div className="lista-vazia">
              <span>🌿</span>
              <p>Nenhuma avaliação encontrada para este filtro.</p>
            </div>
          ) : (
            avaliacoesFiltradas.map((a) => <CardAvaliacao key={a.id} avaliacao={a} />)
          )}
        </section>
      </main>
    </div>
  );
}
