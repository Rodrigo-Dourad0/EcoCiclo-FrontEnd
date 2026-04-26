import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, Gift, Clock, User, LogIn, UserPlus } from 'lucide-react';
import './Navigation.css';

export function Navigation() {
  const navItems = [
    { icon: <Home size={22} />, label: 'Início', to: '/', active: true },
    { icon: <Package size={22} />, label: 'Coletas', to: '/avaliar-coletor', active: false },
    { icon: <Gift size={22} />, label: 'Recompensas', to: '#', active: false },
    { icon: <Clock size={22} />, label: 'Histórico', to: '#', active: false },
    { icon: <User size={22} />, label: 'Perfil', to: '/perfil', active: false },
  ];

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <h2>EcoCiclo</h2>
      </div>

      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
            <Link to={item.to} className="nav-link">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Botões de autenticação — visíveis apenas na sidebar (desktop) */}
      <div className="nav-auth">
        <Link to="/login" className="nav-auth-btn btn-login">
          <LogIn size={18} />
          <span>Login</span>
        </Link>
        <Link to="/criar-conta" className="nav-auth-btn btn-register">
          <UserPlus size={18} />
          <span>Criar Conta</span>
        </Link>
      </div>
    </nav>
  );
}
