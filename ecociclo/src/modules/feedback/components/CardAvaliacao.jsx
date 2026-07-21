import { useState } from "react"
import Estrelas from "./Estrelas.jsx"

function CardAvaliacao({ avaliacao }) {
  const [expandido, setExpandido] = useState(false)
  const comentario = avaliacao.comentario || ""
  const temComentario = comentario.length > 0

  return (
    <article className="card-avaliacao" onClick={() => temComentario && setExpandido(!expandido)}>
      <div className="card-avaliacao__topo">
        <div className="card-avaliacao__avatar">
          {(avaliacao.titulo || avaliacao.coletor || "A").charAt(0)}
        </div>
        <div className="card-avaliacao__info">
          <span className="card-avaliacao__tipo">{avaliacao.tipo}</span>
          <h3 className="card-avaliacao__nome">{avaliacao.titulo || avaliacao.coletor}</h3>
          {avaliacao.subtitulo && <p className="card-avaliacao__subtitulo">{avaliacao.subtitulo}</p>}
          <time className="card-avaliacao__data">{avaliacao.data}</time>
        </div>
        <div className="card-avaliacao__nota-wrap">
          <Estrelas nota={avaliacao.nota} tamanho="sm" />
          <span className="card-avaliacao__nota-num">{avaliacao.nota}.0</span>
        </div>
      </div>

      {temComentario && (
        <div className={`card-avaliacao__comentario ${expandido ? "card-avaliacao__comentario--aberto" : ""}`}>
          <p>"{comentario}"</p>
        </div>
      )}

      {!temComentario && (
        <p className="card-avaliacao__sem-comentario">Sem comentário</p>
      )}

      {temComentario && (
        <button className="card-avaliacao__toggle" aria-expanded={expandido}>
          {expandido ? "Ver menos ▲" : "Ver comentário ▼"}
        </button>
      )}
    </article>
  )
}

export default CardAvaliacao
