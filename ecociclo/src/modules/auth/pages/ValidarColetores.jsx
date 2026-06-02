import { useState } from "react";
import { Navigation } from '../../../shared/components/navigation/Navigation.jsx';
import "../styles/ValidarColetores.css";

const coletoresMock = [
  {
    id: 1,
    nome: "Carlos Eduardo Silva",
    email: "carlos.silva@email.com",
    telefone: "(74) 99812-3344",
    foto: null,
    documento: "CPF: 123.456.789-00",
    docFoto: null,
    regioes: ["Centro", "Bairro São João", "Vila Nova"],
    transporte: "Bicicleta",
    dataPedido: "28/05/2025",
    status: "pendente",
  },
  {
    id: 2,
    nome: "Fernanda Oliveira Santos",
    email: "fernanda.oliveira@email.com",
    telefone: "(74) 98765-1122",
    foto: null,
    documento: "CPF: 987.654.321-00",
    docFoto: null,
    regioes: ["Jardim América", "Pedra Branca"],
    transporte: "A pé",
    dataPedido: "30/05/2025",
    status: "pendente",
  },
  {
    id: 3,
    nome: "Roberto Almeida Costa",
    email: "roberto.costa@email.com",
    telefone: "(74) 99001-5566",
    foto: null,
    documento: "CPF: 456.123.789-00",
    docFoto: null,
    regioes: ["Irecê Centro", "Aeroporto", "São Francisco"],
    transporte: "Carro",
    dataPedido: "01/06/2025",
    status: "pendente",
  },
  {
    id: 4,
    nome: "Mariana Conceição Lima",
    email: "mariana.lima@email.com",
    telefone: "(74) 98234-7788",
    foto: null,
    documento: "CPF: 321.654.987-00",
    docFoto: null,
    regioes: ["Conjunto Habitacional", "Novo Horizonte"],
    transporte: "Carroça",
    dataPedido: "02/06/2025",
    status: "pendente",
  },
];

const transporteIcone = {
  "Bicicleta": "🚲",
  "A pé": "🚶",
  "Carro": "🚗",
  "Carroça": "🛒",
  "Moto": "🏍️",
};

function Avatar({ nome, size = 56 }) {
  const iniciais = nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="vc-avatar"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {iniciais}
    </div>
  );
}

export default function ValidarColetores() {
  const [coletores, setColetores] = useState(coletoresMock);
  const [selecionado, setSelecionado] = useState(null);
  const [recusando, setRecusando] = useState(false);
  const [motivoRecusa, setMotivoRecusa] = useState("");
  const [toast, setToast] = useState(null);

  const pendentes = coletores.filter((c) => c.status === "pendente");
  const processados = coletores.filter((c) => c.status !== "pendente");

  function mostrarToast(msg, tipo = "sucesso") {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 3500);
  }

  function aprovar() {
    setColetores((prev) =>
      prev.map((c) => (c.id === selecionado.id ? { ...c, status: "aprovado" } : c))
    );
    mostrarToast(`${selecionado.nome} foi aprovado como Coletor Licenciado! ✅`);
    setSelecionado(null);
  }

  function recusar() {
    if (!motivoRecusa.trim()) return;
    setColetores((prev) =>
      prev.map((c) =>
        c.id === selecionado.id
          ? { ...c, status: "recusado", motivoRecusa }
          : c
      )
    );
    mostrarToast(`Pedido de ${selecionado.nome} foi recusado.`, "erro");
    setSelecionado(null);
    setRecusando(false);
    setMotivoRecusa("");
  }

  function abrirDetalhe(coletor) {
    setSelecionado(coletor);
    setRecusando(false);
    setMotivoRecusa("");
  }

  return (
    <div className="vc-wrapper">
      <Navigation />

      <main className="vc-page">
        {/* Toast */}
        {toast && (
          <div className={`vc-toast vc-toast--${toast.tipo}`}>{toast.msg}</div>
        )}

        {/* Header */}
        <div className="vc-header">
          <span className="vc-breadcrumb">ADMINISTRAÇÃO</span>
          <h1 className="vc-titulo">Validar Coletores</h1>
          <p className="vc-subtitulo">
            Analise e aprove os pedidos de cadastro de novos coletores.
          </p>
        </div>

        {/* Stats */}
        <div className="vc-stats">
          <div className="vc-stat-card">
            <span className="vc-stat-icon vc-stat-icon--total">⏳</span>
            <div>
              <span className="vc-stat-num">{pendentes.length}</span>
              <span className="vc-stat-label">AGUARDANDO</span>
            </div>
          </div>
          <div className="vc-stat-card">
            <span className="vc-stat-icon vc-stat-icon--ativo">✅</span>
            <div>
              <span className="vc-stat-num">
                {coletores.filter((c) => c.status === "aprovado").length}
              </span>
              <span className="vc-stat-label">APROVADOS</span>
            </div>
          </div>
          <div className="vc-stat-card">
            <span className="vc-stat-icon vc-stat-icon--pausado">❌</span>
            <div>
              <span className="vc-stat-num">
                {coletores.filter((c) => c.status === "recusado").length}
              </span>
              <span className="vc-stat-label">RECUSADOS</span>
            </div>
          </div>
        </div>

        <div className="vc-content">
          {/* Lista */}
          <div className="vc-lista">
            {pendentes.length === 0 && (
              <div className="vc-vazio">
                <span className="vc-vazio-icon">🎉</span>
                <p>Nenhum pedido pendente no momento.</p>
              </div>
            )}

            {pendentes.map((c) => (
              <div
                key={c.id}
                className={`vc-item ${selecionado?.id === c.id ? "vc-item--ativo" : ""}`}
                onClick={() => abrirDetalhe(c)}
              >
                <Avatar nome={c.nome} size={44} />
                <div className="vc-item-info">
                  <span className="vc-item-nome">{c.nome}</span>
                  <span className="vc-item-meta">
                    {transporteIcone[c.transporte] || "🚛"} {c.transporte} · {c.dataPedido}
                  </span>
                </div>
                <span className="vc-item-badge">Pendente</span>
              </div>
            ))}

            {processados.length > 0 && (
              <>
                <div className="vc-secao-label">Processados</div>
                {processados.map((c) => (
                  <div key={c.id} className="vc-item vc-item--processado">
                    <Avatar nome={c.nome} size={44} />
                    <div className="vc-item-info">
                      <span className="vc-item-nome">{c.nome}</span>
                      <span className="vc-item-meta">{c.dataPedido}</span>
                    </div>
                    <span className={`vc-item-badge vc-item-badge--${c.status}`}>
                      {c.status === "aprovado" ? "Aprovado" : "Recusado"}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Painel de detalhe */}
          {selecionado ? (
            <div className="vc-detalhe">
              <div className="vc-detalhe-header">
                <Avatar nome={selecionado.nome} size={64} />
                <div>
                  <h2 className="vc-detalhe-nome">{selecionado.nome}</h2>
                  <span className="vc-detalhe-data">
                    Pedido em {selecionado.dataPedido}
                  </span>
                </div>
              </div>

              <div className="vc-detalhe-grid">
                <div className="vc-detalhe-bloco">
                  <span className="vc-detalhe-rotulo">📧 E-mail</span>
                  <span className="vc-detalhe-valor">{selecionado.email}</span>
                </div>
                <div className="vc-detalhe-bloco">
                  <span className="vc-detalhe-rotulo">📱 Telefone</span>
                  <span className="vc-detalhe-valor">{selecionado.telefone}</span>
                </div>
                <div className="vc-detalhe-bloco">
                  <span className="vc-detalhe-rotulo">🪪 Documento</span>
                  <span className="vc-detalhe-valor">{selecionado.documento}</span>
                </div>
                <div className="vc-detalhe-bloco">
                  <span className="vc-detalhe-rotulo">
                    {transporteIcone[selecionado.transporte] || "🚛"} Transporte
                  </span>
                  <span className="vc-detalhe-valor">{selecionado.transporte}</span>
                </div>
              </div>

              <div className="vc-detalhe-bloco vc-detalhe-bloco--full">
                <span className="vc-detalhe-rotulo">📍 Regiões de atendimento</span>
                <div className="vc-tags">
                  {selecionado.regioes.map((r) => (
                    <span key={r} className="vc-tag">{r}</span>
                  ))}
                </div>
              </div>

              <div className="vc-detalhe-bloco vc-detalhe-bloco--full">
                <span className="vc-detalhe-rotulo">🪪 Foto do documento</span>
                <div className="vc-doc-placeholder">
                  <span>Imagem do documento não disponível nesta demonstração</span>
                </div>
              </div>

              {!recusando ? (
                <div className="vc-acoes">
                  <button className="vc-btn vc-btn--aprovar" onClick={aprovar}>
                    ✅ Aprovar Coletor
                  </button>
                  <button
                    className="vc-btn vc-btn--recusar"
                    onClick={() => setRecusando(true)}
                  >
                    ❌ Recusar
                  </button>
                </div>
              ) : (
                <div className="vc-recusa-form">
                  <label className="vc-detalhe-rotulo">
                    Motivo da recusa (obrigatório)
                  </label>
                  <textarea
                    className="vc-textarea"
                    placeholder="Ex: Foto do documento ilegível. Por favor, reenvie uma imagem mais nítida."
                    value={motivoRecusa}
                    onChange={(e) => setMotivoRecusa(e.target.value)}
                    rows={3}
                  />
                  <div className="vc-acoes">
                    <button
                      className="vc-btn vc-btn--recusar"
                      onClick={recusar}
                      disabled={!motivoRecusa.trim()}
                    >
                      Confirmar Recusa
                    </button>
                    <button
                      className="vc-btn vc-btn--cancelar"
                      onClick={() => setRecusando(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="vc-detalhe vc-detalhe--vazio">
              <div className="vc-detalhe-placeholder">
                <span className="vc-placeholder-icon">👆</span>
                <p>Selecione um coletor na lista para ver os detalhes e tomar uma decisão.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}