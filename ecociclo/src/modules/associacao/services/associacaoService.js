import { api } from "../../../shared/services/api";

const endpoints = {
  listar: "/api/associacoes",
  buscarPorId: (id) => `/api/associacoes/${id}`,
  criar: "/api/associacoes",
  atualizar: (id) => `/api/associacoes/${id}`,
  deletar: (id) => `/api/associacoes/${id}`,
  listarColetores: "/api/associacoes/coletores",
  listarMembros: (associacaoId) => `/api/associacoes/${associacaoId}/membros`,
  atribuirColetor: (associacaoId, coletorId) => `/api/associacoes/${associacaoId}/coletores/${coletorId}`,
};

const extrairLista = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export async function listarAssociacoes() {
  const response = await api.get(endpoints.listar);
  return extrairLista(response.data);
}

export async function buscarAssociacaoPorId(id) {
  const response = await api.get(endpoints.buscarPorId(id));
  return response.data;
}

export async function criarAssociacao(payload) {
  const response = await api.post(endpoints.criar, payload);
  return response.data;
}

export async function atualizarAssociacao(id, payload) {
  const response = await api.put(endpoints.atualizar(id), payload);
  return response.data;
}

export async function deletarAssociacao(id) {
  await api.delete(endpoints.deletar(id));
}

export async function listarColetores() {
  const response = await api.get(endpoints.listarColetores);
  return extrairLista(response.data);
}

export async function listarMembrosDaAssociacao(associacaoId) {
  const response = await api.get(endpoints.listarMembros(associacaoId));
  return extrairLista(response.data);
}

export async function atribuirColetorAssociacao(associacaoId, coletorId) {
  const response = await api.put(endpoints.atribuirColetor(associacaoId, coletorId));
  return response.data;
}
