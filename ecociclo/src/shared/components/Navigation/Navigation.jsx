import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, HandHeart, Gift, Clock, User, LogIn, UserPlus, CheckCircle, Users } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  const { user } = useAuth();
  const tipo = user?.tipo;

  let navItems = [];

  if (tipo === 'ADMIN') {
    navItems = [
      { icon: <Home size={22} />, label: 'Dashboard', to: '/admin-dashboard' },
      { icon: <Gift size={22} />, label: 'Recompensas', to: '/gerenciar-recompensa' },
      { icon: <CheckCircle size={22} />, label: 'Validar', to: '/validar-coletores' },
      { icon: <Users size={22} />, label: 'Usuários', to: '#' },
      { icon: <User size={22} />, label: 'Perfil', to: '/perfil' },
    ];
  } else if (tipo === 'ASSOCIACAO') {
    navItems = [
      { icon: <Home size={22} />, label: 'Dashboard', to: '/dashboard-coletor' },
      { icon: <Clock size={22} />, label: 'Histórico', to: '/minhas-coletas' },
      { icon: <User size={22} />, label: 'Perfil', to: '/perfil' },
    ];
  } else {
    // DOADOR ou Default
    navItems = [
      { icon: <Home size={22} />, label: 'Início', to: '/dashboard' },
      { icon: <HandHeart size={22} />, label: 'Doação', to: '/agendar-doacao' },
      { icon: <Gift size={22} />, label: 'Recompensas', to: '/recompensas' },
      { icon: <Clock size={22} />, label: 'Histórico', to: '/historico' },
      { icon: <User size={22} />, label: 'Perfil', to: '/perfil' },
    ];
  }

  const rotasRelacionadas = {
    "/dashboard": ["/dashboard"],
    "/dashboard-coletor": ["/dashboard-coletor"],
    "/admin-dashboard": ["/admin-dashboard"],
    "/agendar-doacao": ["/agendar-doacao", "/detalhes-doacao"],
    "/recompensas": ["/recompensas", "/minhas-recompensas", "/detalhes-recompensas"],
    "/gerenciar-recompensa": ["/gerenciar-recompensa"],
    "/validar-coletores": ["/validar-coletores"],
    "/historico": ["/historico"],
    "/minhas-coletas": ["/minhas-coletas"],
    "/perfil": ["/perfil", "/meus-enderecos", "/novo-endereco", "/editar-perfil", "/minhas-avaliacoes"],
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

    </nav>
  );
}