import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api } from "../shared/services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/api/usuarios/me");
      if (response.data) {
        setUser(response.data);
        localStorage.setItem("ecoCicloUser", JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      // Só limpa a sessão em caso de 401 (token inválido/expirado de verdade)
      // Erros de rede, 500, etc. NÃO devem derrubar o usuário logado
      if (error.response && error.response.status === 401) {
        setUser(null);
        localStorage.removeItem("ecoCicloUser");
        localStorage.removeItem("ecoCicloToken");
        localStorage.removeItem("token");
      }
      // Para qualquer outro erro, mantém o usuário do localStorage intacto
    }

    return null;
  }, []);

  // Carrega o usuário do localStorage imediatamente ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoCicloUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('ecoCicloUser');
      }
    }
    setLoading(false);
  }, []);

  // Após carregar, tenta atualizar os dados do usuário em background
  // mas SEM bloquear a renderização ou derrubar o usuário em caso de falha de rede
  useEffect(() => {
    if (loading) return; // Aguarda o carregamento inicial

    const token = localStorage.getItem("ecoCicloToken") || localStorage.getItem("token");
    const storedUser = localStorage.getItem("ecoCicloUser");

    if (token && storedUser) {
      // Roda em background sem bloquear nada
      refreshUser();
    }
  }, [loading, refreshUser]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ecoCicloUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecoCicloUser');
    localStorage.removeItem('ecoCicloToken');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
