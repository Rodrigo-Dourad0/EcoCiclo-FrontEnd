import axios from 'axios';

// 1. Cria a configuração da API e exporta para o resto do projeto
export const api = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor Inteligente
api.interceptors.request.use((config) => {
  // BUSCA DUPLA: Tenta pegar 'ecoCicloToken', se não achar, pega o 'token' antigo.
  // Isso garante que o código nunca fique sem o token por erro de nome!
  const token = localStorage.getItem('ecoCicloToken') || localStorage.getItem('token');
  
  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});