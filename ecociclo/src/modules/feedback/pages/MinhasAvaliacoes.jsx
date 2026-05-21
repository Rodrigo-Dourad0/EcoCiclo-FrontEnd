import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CardAvaliacao from "../components/CardAvaliacao.jsx"
import ResumoEstrelas from "../components/ResumoEstrelas.jsx"
import FiltrosBotoes from "../components/FiltrosBotoes.jsx"
import { Navigation } from '../../../shared/components/navigation/Navigation.jsx'
import "../styles/MinhasAvaliacoes.css"

const avaliacoesData = [
  {
    id: 1,
    coletor: "Carlos Oliveira",
    data: "28 abr. 2025",
    nota: 5,
    comentario: "Excelente serviço! Pontual e muito atencioso com a separação dos materiais.",
    tipo: "Coleta Seletiva",
  },
  {
    id: 2,
    coletor: "Ana Souza",
    data: "15 abr. 2025",
    nota: 4,
    comentario: "Muito boa a coleta, só chegou um pouco atrasada.",
    tipo: "Coleta de Eletrônicos",
  },
  {
    id: 3,
    coletor: "Roberto Lima",
    data: "02 abr. 2025",
    nota: 3,
    comentario: "",
    tipo: "Coleta Seletiva",
  },
  {
    id: 4,
    coletor: "Fernanda Costa",
    data: "20 mar. 2025",
    nota: 5,
    comentario: "Simplesmente perfeita! Recomendo demais.",
    tipo: "Coleta de Orgânicos",
  },
]

export default function MinhasAvaliacoes() {
  const navigate = useNavigate()
  const [filtroAtivo, setFiltroAtivo] = useState("Todas")

  const avaliacoesFiltradas = avaliacoesData.filter((a) => {
    if (filtroAtivo === "Todas") return true
    if (filtroAtivo === "Com comentário") return a.comentario.length > 0
    const nota = parseInt(filtroAtivo)
    return a.nota === nota
  })

  return (
    <div className="minhas-avaliacoes">

      <Navigation />

      <main className="avaliacoes-conteudo">
        <header className="avaliacoes-conteudo__header">
          <button className="btn-voltar" onClick={() => navigate('/perfil')} aria-label="Voltar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span>Minhas avaliações</span>
          </button>
        </header>

        <ResumoEstrelas avaliacoes={avaliacoesData} />
        <FiltrosBotoes filtroAtivo={filtroAtivo} onFiltroChange={setFiltroAtivo} />

        <section className="lista-avaliacoes" aria-live="polite">
          {avaliacoesFiltradas.length === 0 ? (
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
  )
}