import { useState } from "react";

export function useNovoEndereco() {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [principal, setPrincipal] = useState(false);

  const [cepErro, setCepErro] = useState("");
  const [ruaErro, setRuaErro] = useState("");
  const [numeroErro, setNumeroErro] = useState("");
  const [bairroErro, setBairroErro] = useState("");
  const [cidadeErro, setCidadeErro] = useState("");
  const [estadoErro, setEstadoErro] = useState("");

  const validarCep = (valor) => {
    const regex = /^\d{5}-?\d{3}$/;
    if (!valor) {
      setCepErro("O CEP é obrigatório.");
    } else if (!regex.test(valor)) {
      setCepErro("Digite um CEP válido (ex: 00000-000).");
    } else {
      setCepErro("");
    }
  };

  const validarRua = (valor) => {
    if (!valor) setRuaErro("A rua é obrigatória.");
    else setRuaErro("");
  };

  const validarNumero = (valor) => {
    if (!valor) setNumeroErro("O número é obrigatório.");
    else setNumeroErro("");
  };

  const validarBairro = (valor) => {
    if (!valor) setBairroErro("O bairro é obrigatório.");
    else setBairroErro("");
  };

  const validarCidade = (valor) => {
    if (!valor) setCidadeErro("A cidade é obrigatória.");
    else setCidadeErro("");
  };

  const validarEstado = (valor) => {
    if (!valor) setEstadoErro("O estado é obrigatório.");
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
  };

  return {
    cep, setCep, cepErro, validarCep,
    rua, setRua, ruaErro, validarRua,
    numero, setNumero, numeroErro, validarNumero,
    complemento, setComplemento,
    bairro, setBairro, bairroErro, validarBairro,
    cidade, setCidade, cidadeErro, validarCidade,
    estado, setEstado, estadoErro, validarEstado,
    principal, setPrincipal,
    handleSubmit,
  };
}