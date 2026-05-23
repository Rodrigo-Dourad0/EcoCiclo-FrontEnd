import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useMeusEnderecos() {
  const navigate = useNavigate();

  // Dados mockados — substituir pela chamada à API quando o back-end estiver pronto
  const [enderecos, setEnderecos] = useState([
    {
      id: 1,
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Apto 45",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
      principal: true,
    },
  ]);

  const [modalExcluir, setModalExcluir] = useState(null); // id do endereço a excluir

  function handleNovoEndereco() {
    navigate("/novo-endereco");
  }

  function handleEditar(id) {
    // Navegar para edição quando o back-end estiver pronto
    navigate("/novo-endereco");
    console.log("Editar endereço id:", id);
  }

  function handleConfirmarExcluir(id) {
    setModalExcluir(id);
  }

  function handleCancelarExcluir() {
    setModalExcluir(null);
  }

  function handleExcluir() {
    setEnderecos((prev) => prev.filter((e) => e.id !== modalExcluir));
    setModalExcluir(null);
  }

  function handleDefinirPrincipal(id) {
    setEnderecos((prev) =>
      prev.map((e) => ({ ...e, principal: e.id === id }))
    );
  }

  function handleVoltar() {
    navigate("/perfil");
  }

  return {
    enderecos,
    modalExcluir,
    handleNovoEndereco,
    handleEditar,
    handleConfirmarExcluir,
    handleCancelarExcluir,
    handleExcluir,
    handleDefinirPrincipal,
    handleVoltar,
  };
}
