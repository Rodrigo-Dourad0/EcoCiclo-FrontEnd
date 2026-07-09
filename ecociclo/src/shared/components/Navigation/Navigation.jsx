import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, HandHeart, Gift, Clock, User, LogIn, UserPlus } from 'lucide-react';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />,       label: 'Início',       to: '/dashboard' },
    { icon: <HandHeart size={22} />,  label: 'Doação',       to: '/agendar-coleta' },
    { icon: <Gift size={22} />,       label: 'Recompensas',  to: '/recompensas' },
    { icon: <Clock size={22} />,      label: 'Histórico',    to: '/historico' },
    { icon: <User size={22} />,       label: 'Perfil',       to: '/perfil' },
  ];

  const rotasRelacionadas = {
  "/dashboard": ["/dashboard"],
  "/agendar-coleta": ["/agendar-coleta", "/detalhes-coleta", "/visualizar-rota", "/finalizar-coleta"],
  "/recompensas": ["/recompensas", "/minhas-recompensas", "/detalhes-recompensas", "/gerenciar-recompensa"],
  "/historico": ["/historico"],
  "/perfil": ["/perfil", "/meus-enderecos", "/novo-endereco", "/editar-perfil", "/minhas-coletas", "/minhas-avaliacoes", "/validar-coletores"],
};

  return (
    <nav className="navigation">
      {/* Logo */}
      <div className="nav-logo">
        <div className="nav-logo-mark">
          <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
            <path d="M21 3C10 4 4 10 3 21c11-1 17-7 18-18z" />
          </svg>
        </div>
        <h2>EcoCiclo</h2>
      </div>

      {/* Itens */}
      <ul className="nav-list">
        {navItems.map((item, index) => {
          const normalize = (p) => (p === '/' ? '/' : p.replace(/\/+$/g, ''));
          const isActive = rotasRelacionadas[item.to]?.includes(normalize(location.pathname));
          return (
            <li key={index} className={`nav-item ${isActive ? 'active' : ''}`}>
              <Link to={item.to} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Botões de autenticação */}
      <div className="nav-auth">
        <Link to="/login" className="nav-auth-btn btn-login">
          <LogIn size={16} />
          <span>Login</span>
        </Link>
        <Link to="/criar-conta" className="nav-auth-btn btn-register">
          <UserPlus size={16} />
          <span>Criar Conta</span>
        </Link>
      </div>
    </nav>
  );
}