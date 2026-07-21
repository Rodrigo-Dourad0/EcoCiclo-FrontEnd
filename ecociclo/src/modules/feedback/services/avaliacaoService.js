import { api } from "../../../shared/services/api";

const endpoints = {
  listar: "/api/avaliacoes",
  buscarPorId: (id) => `/api/avaliacoes/${id}`,
  criar: "/api/avaliacoes",
  atualizar: (id) => `/api/avaliacoes/${id}`,
  deletar: (id) => `/api/avaliacoes/${id}`,
};

const extrairLista = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export async function listarAvaliacoes() {
  const response = await api.get(endpoints.listar);
  return extrairLista(response.data);
}

export async function buscarAvaliacaoPorId(id) {
  const response = await api.get(endpoints.buscarPorId(id));
  return response.data;
}

export async function criarAvaliacao(payload) {
  const response = await api.post(endpoints.criar, payload);
  return response.data;
}

export async function atualizarAvaliacao(id, payload) {
  const response = await api.put(endpoints.atualizar(id), payload);
  return response.data;
}

export async function deletarAvaliacao(id) {
  await api.delete(endpoints.deletar(id));
}
