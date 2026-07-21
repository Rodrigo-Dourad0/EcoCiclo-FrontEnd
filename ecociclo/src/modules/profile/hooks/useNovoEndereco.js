import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/services/api";
import { useAuth } from "../../../context/AuthContext";

export function useNovoEndereco() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [cepErro, setCepErro] = useState("");
  const [ruaErro, setRuaErro] = useState("");
  const [numeroErro, setNumeroErro] = useState("");
  const [bairroErro, setBairroErro] = useState("");
  const [cidadeErro, setCidadeErro] = useState("");
  const [estadoErro, setEstadoErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroGeral, setErroGeral] = useState("");
  const [sucesso, setSucesso] = useState("");

  const validarCep = (valor) => {
    const regex = /^\d{5}-?\d{3}$/;
    if (!valor) setCepErro("O CEP e obrigatorio.");
    else if (!regex.test(valor)) setCepErro("Digite um CEP valido (ex: 00000-000).");
    else setCepErro("");
  };

  const validarRua = (valor) => {
    if (!valor) setRuaErro("A rua e obrigatoria.");
    else setRuaErro("");
  };

  const validarNumero = (valor) => {
    if (!valor) setNumeroErro("O numero e obrigatorio.");
    else setNumeroErro("");
  };

  const validarBairro = (valor) => {
    if (!valor) setBairroErro("O bairro e obrigatorio.");
    else setBairroErro("");
  };

  const validarCidade = (valor) => {
    if (!valor) setCidadeErro("A cidade e obrigatoria.");
    else setCidadeErro("");
  };

  const validarEstado = (valor) => {
    if (!valor) setEstadoErro("O estado e obrigatorio.");
    else if (valor.length !== 2) setEstadoErro("Use a sigla (ex: SP).");
    else setEstadoErro("");
  };

  const handleSubmit = () => {
    validarCep(cep);
    validarRua(rua);
    validarNumero(numero);
    validarBairro(bairro);
    validarCidade(cidade);
    validarEstado(estado);

    const possuiErros =
      !cep ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      cepErro ||
      ruaErro ||
      numeroErro ||
      bairroErro ||
      cidadeErro ||
      estadoErro;

    if (possuiErros) {
      setErroGeral("Confira os campos obrigatorios antes de salvar.");
      return;
    }

    return salvarEndereco();
  };

  async function salvarEndereco() {
    if (!user?.id) {
      setErroGeral("Voce precisa estar logado para cadastrar um endereco.");
      return;
    }

    setLoading(true);
    setErroGeral("");
    setSucesso("");

    const payloadBase = {
      logradouro: rua.trim(),
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      estado: estado.trim().toUpperCase(),
      cep: cep.replace(/\D/g, ""),
      usuarioId: user.id,
    };

    const rotas = [
      { method: "post", url: `/api/usuarios/${user.id}/enderecos` },
      { method: "post", url: "/api/enderecos" },
    ];

    try {
      let response = null;
      let ultimoErro = null;

      for (const rota of rotas) {
        try {
          response = await api[rota.method](rota.url, payloadBase);
          if (response) break;
        } catch (erro) {
          ultimoErro = erro;
        }
      }

      if (!response) {
        throw ultimoErro || new Error("Nao foi possivel salvar o endereco.");
      }

      // Endereço salvo com sucesso — atualiza os dados do usuário e redireciona
      await refreshUser?.();
      setSucesso("Endereco salvo com sucesso.");
      navigate("/meus-enderecos");
    } catch (erro) {
      console.error("Erro ao salvar endereco:", erro);
      setErroGeral(erro.response?.data?.message || "Nao foi possivel salvar o endereco. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return {
    cep,
    setCep,
    cepErro,
    validarCep,
    rua,
    setRua,
    ruaErro,
    validarRua,
    numero,
    setNumero,
    numeroErro,
    validarNumero,
    complemento,
    setComplemento,
    bairro,
    setBairro,
    bairroErro,
    validarBairro,
    cidade,
    setCidade,
    cidadeErro,
    validarCidade,
    estado,
    setEstado,
    estadoErro,
    validarEstado,
    handleSubmit,
    loading,
    erroGeral,
    sucesso,
  };
}
