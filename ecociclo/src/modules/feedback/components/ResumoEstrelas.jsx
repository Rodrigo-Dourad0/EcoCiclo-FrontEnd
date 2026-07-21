import Estrelas from "./Estrelas.jsx"

function ResumoEstrelas({ avaliacoes }) {
  const media = avaliacoes.length
    ? avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length
    : 0

  const contagem = [5, 4, 3, 2, 1].map((n) => ({
    nota: n,
    qtd: avaliacoes.filter((a) => a.nota === n).length,
  }))

  return (
    <div className="resumo">
      <div className="resumo__media">
        <span className="resumo__numero">{media.toFixed(1)}</span>
        <Estrelas nota={Math.round(media)} tamanho="lg" />
        <span className="resumo__total">{avaliacoes.length} avaliações</span>
      </div>
      <div className="resumo__barras">
        {contagem.map(({ nota, qtd }) => (
          <div key={nota} className="resumo__linha">
            <span className="resumo__linha-label">{nota}★</span>
            <div className="resumo__barra-bg">
              <div
                className="resumo__barra-fill"
                style={{ width: `${avaliacoes.length ? (qtd / avaliacoes.length) * 100 : 0}%` }}
              />
            </div>
            <span className="resumo__linha-qtd">{qtd}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumoEstrelas
