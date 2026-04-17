import React from 'react';
import { Home, Package, Gift, Clock, User } from 'lucide-react';
import './Navigation.css';

export function Navigation() {
  const navItems = [
    { icon: <Home size={22} />, label: 'Início', active: true },
    { icon: <Package size={22} />, label: 'Coletas', active: false },
    { icon: <Gift size={22} />, label: 'Recompensas', active: false },
    { icon: <Clock size={22} />, label: 'Histórico', active: false },
    { icon: <User size={22} />, label: 'Perfil', active: false }
  ];

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <h2>EcoCiclo</h2>
      </div>
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
            <a href="#" className="nav-link">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
