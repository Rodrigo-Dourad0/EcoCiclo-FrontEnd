import { api } from "../../../shared/services/api";

export const recompensaEndpoints = {
  listar: "/api/recompensas",
  buscarPorId: (id) => `/api/recompensas/${id}`,
  criar: "/api/recompensas",
  atualizar: (id) => `/api/recompensas/${id}`,
  deletar: (id) => `/api/recompensas/${id}`,
  resgatar: (id) => `/api/recompensas/${id}/resgatar`,
  confirmarRetirada: (resgateId) => `/api/recompensas/resgates/${resgateId}/confirmar-retirada`,
  listarResgates: "/api/resgates",
  listarResgatesPendentes: "/api/resgates/pendentes",
  listarResgatesAlternativo: "/api/recompensas/resgates",
  listarResgatesPendentesAlternativo: "/api/recompensas/resgates/pendentes",
};

const extrairLista = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.content)) {
    return payload.content;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

export async function listarRecompensas() {
  const response = await api.get(recompensaEndpoints.listar);
  return extrairLista(response.data);
}

export async function buscarRecompensaPorId(id) {
  const response = await api.get(recompensaEndpoints.buscarPorId(id));
  return response.data;
}

export async function criarRecompensa(payload) {
  const response = await api.post(recompensaEndpoints.criar, payload);
  return response.data;
}

export async function atualizarRecompensa(id, payload) {
  const response = await api.put(recompensaEndpoints.atualizar(id), payload);
  return response.data;
}

export async function deletarRecompensa(id) {
  await api.delete(recompensaEndpoints.deletar(id));
}

export async function resgatarRecompensa(id, payload) {
  const response = await api.post(recompensaEndpoints.resgatar(id), payload);
  return response.data;
}

export async function confirmarRetiradaRecompensa(resgateId) {
  const response = await api.patch(recompensaEndpoints.confirmarRetirada(resgateId));
  return response.data;
}

export async function listarResgates(filtros = {}) {
  const rotas = [
    recompensaEndpoints.listarResgates,
    recompensaEndpoints.listarResgatesAlternativo,
  ];

  let ultimoErro = null;

  for (const rota of rotas) {
    try {
      const response = await api.get(rota, { params: filtros });
      return extrairLista(response.data);
    } catch (erro) {
      ultimoErro = erro;
      if (erro?.response?.status !== 404) {
        throw erro;
      }
    }
  }

  if (ultimoErro?.response?.status === 404) {
    return [];
  }

  throw ultimoErro || new Error("Nao foi possivel carregar os resgates.");
}

export async function listarResgatesPendentes() {
  const rotas = [
    recompensaEndpoints.listarResgatesPendentes,
    recompensaEndpoints.listarResgatesPendentesAlternativo,
  ];

  let ultimoErro = null;

  for (const rota of rotas) {
    try {
      const response = await api.get(rota);
      return extrairLista(response.data);
    } catch (erro) {
      ultimoErro = erro;
      if (erro?.response?.status !== 404) {
        throw erro;
      }
    }
  }

  if (ultimoErro?.response?.status === 404) {
    return [];
  }

  throw ultimoErro || new Error("Nao foi possivel carregar os resgates pendentes.");
}
