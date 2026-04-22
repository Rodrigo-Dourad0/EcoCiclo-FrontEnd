import React from 'react';
import { Leaf, Package, Star, Bell } from 'lucide-react';
import '../styles/Dashboard.css';
import { Navigation } from '../../../shared/components/Navigation/Navigation.jsx';

export function Dashboard() {
  const stats = [
    {
      id: 1,
      label: 'Pontos',
      value: '1250',
      icon: <Leaf className="stat-icon leaf" size={24} />,
      colorClass: 'green'
    },
    {
      id: 2,
      label: 'Coletas',
      value: '24',
      icon: <Package className="stat-icon package" size={24} />,
      colorClass: 'blue'
    },
    {
      id: 3,
      label: 'Impacto',
      value: 'Alto',
      icon: <Star className="stat-icon star" size={24} />,
      colorClass: 'yellow'
    }
  ];

  return (
    <>
      <Navigation />
      <main className="dashboard-main">
        <div className="dashboard-container">



        {/* Top Header - Mobile like */}
        <header className="top-header">
          <h2 className="top-title">Dashboard</h2>
          <button className="icon-button">
            <Bell size={20} />
          </button>
        </header>

        {/* Greeting Section */}
        <section className="greeting-section">
          <h1 className="greeting-title">Olá, João! 👏</h1>
          <p className="greeting-subtitle">Pronto para ajudar o meio ambiente?</p>
        </section>

        {/* Statistics Cards */}
        <section className="dashboard-stats">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className={`stat-icon-naked ${stat.colorClass}`}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
    </>
  );
}
