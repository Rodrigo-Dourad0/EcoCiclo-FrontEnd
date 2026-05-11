function Estrelas({ nota, tamanho = "md" }) {
  return (
    <div className={`estrelas estrelas--${tamanho}`} aria-label={`${nota} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= nota ? "estrela estrela--cheia" : "estrela estrela--vazia"}>
          ★
        </span>
      ))}
    </div>
  )
}

export default Estrelas