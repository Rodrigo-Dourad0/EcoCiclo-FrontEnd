import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useMeusEnderecos } from "../hooks/useMeusEnderecos";
import "../styles/MeusEnderecos.css";

function MeusEnderecos() {
  const {
    enderecos,
    modalExcluir,
    loading,
    erro,
    handleNovoEndereco,
    handleEditar,
    handleConfirmarExcluir,
    handleCancelarExcluir,
    handleExcluir,
    handleVoltar,
  } = useMeusEnderecos();

  return (
    <div className="me-page">
      <Navigation />

      <main className="me-main">
        <section className="me-header">
          <button className="me-btn-voltar" onClick={handleVoltar}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Meus enderecos
          </button>
        </section>

        <section className="me-content">
          <button className="me-btn-adicionar" onClick={handleNovoEndereco}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="18"
              height="18"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Adicionar endereco
          </button>

          {erro && (
            <div className="me-alert me-alert--erro" role="alert">
              {erro}
            </div>
          )}

          {loading ? (
            <div className="me-vazio">
              <p>Carregando endereços...</p>
            </div>
          ) : enderecos.length === 0 ? (
            <div className="me-vazio">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p>Você ainda não tem endereços cadastrados.</p>
            </div>
          ) : (
            <div className="me-lista">
              {enderecos.map((end) => (
                <div
                  key={end.id || `${end.logradouro}-${end.numero}-${end.cep}`}
                  className="me-card"
                >
                  <div className="me-card-topo">
                    <div className="me-card-icone">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>

                    <div className="me-card-info">
                      <p className="me-card-rua">
                        {end.logradouro || end.rua || "Endereco nao informado"}
                        {end.numero ? `, ${end.numero}` : ""}
                      </p>

                      {end.complemento && (
                        <p className="me-card-detalhe">{end.complemento}</p>
                      )}

                      <p className="me-card-detalhe">
                        {[end.bairro, end.cidade, end.estado].filter(Boolean).join(", ")}
                      </p>

                      {end.cep && <p className="me-card-detalhe">CEP: {end.cep}</p>}
                    </div>
                  </div>

                  <div className="me-card-acoes">
                    <button className="me-btn-editar" onClick={() => handleEditar(end.id)}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="15"
                        height="15"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Editar
                    </button>

                    <button
                      className="me-btn-excluir"
                      onClick={() => handleConfirmarExcluir(end.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="15"
                        height="15"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {modalExcluir !== null && (
        <div className="me-modal-overlay">
          <div className="me-modal">
            <div className="me-modal-icone">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <h2>Excluir endereco?</h2>
            <p>Esta ação não poderá ser desfeita. Deseja continuar?</p>
            <div className="me-modal-acoes">
              <button className="me-modal-cancelar" onClick={handleCancelarExcluir}>
                Cancelar
              </button>
              <button className="me-modal-confirmar" onClick={handleExcluir}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeusEnderecos;
