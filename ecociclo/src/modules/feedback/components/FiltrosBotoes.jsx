const filtrosDisponiveis = ["Todas", "5 estrelas", "4 estrelas", "3 estrelas", "Com comentário"]

function FiltrosBotoes({ filtroAtivo, onFiltroChange }) {
  return (
    <div className="filtros" role="group" aria-label="Filtrar avaliações">
      {filtrosDisponiveis.map((f) => (
        <button
          key={f}
          className={`filtro-btn ${filtroAtivo === f ? "filtro-btn--ativo" : ""}`}
          onClick={() => onFiltroChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

export default FiltrosBotoes