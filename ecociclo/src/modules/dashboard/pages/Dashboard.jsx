import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Package, Star, Bell, Plus, Calendar, MapPin, Weight, ChevronRight, Recycle } from 'lucide-react';
import '../styles/Dashboard.css';
import { Navigation } from '../../../shared/components/Navigation/Navigation.jsx';

export function Dashboard() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  // Fecha o popover ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dados de estatísticas mockados
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

  // Dados de coletas mockados
  const coletas = [
    {
      id: 1,
      tipo: 'Papel e Papelão',
      status: 'Agendada',
      statusClass: 'status-agendada',
      data: '30/01/2026 às 14:00',
      endereco: 'Rua das Flores, 123 - Centro',
      peso: '15 kg',
      pontos: '+150 pontos',
      coletor: 'Maria Santos'
    },
    {
      id: 2,
      tipo: 'Plástico',
      status: 'Coletada',
      statusClass: 'status-coletada',
      data: '25/01/2026 às 10:00',
      endereco: 'Av. Principal, 456 - Jardins',
      peso: '8 kg',
      pontos: '+80 pontos',
      coletor: null
    }
  ];

  return (
    <div className="app-container">
        <Navigation />
      
      <main className="dashboard-main">
        <div className="dashboard-container">

          {/* Cabeçalho superior */}
          <header className="top-header">
            <h2 className="top-title">Dashboard</h2>
            <div className="notification-wrapper" ref={notifRef}>
              <button
                className="icon-button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notificações"
              >
                <Bell size={20} />
              </button>

              {/* Popover de notificações */}
              {showNotifications && (
                <div className="notification-popover">
                  <div className="notification-popover-header">
                    <span className="notification-popover-title">Notificações</span>
                  </div>
                  <div className="notification-popover-body">
                    <div className="notification-empty">
                      <Bell size={32} className="notification-empty-icon" />
                      <p>Nenhuma notificação no momento</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Seção de saudação */}
          <section className="greeting-section">
            <h1 className="greeting-title">Olá, João! 👏</h1>
            <p className="greeting-subtitle">Pronto para ajudar o meio ambiente?</p>
          </section>

          {/* Cards de estatísticas */}
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

          {/* Botão de agendar nova coleta */}
          <button
            className="btn-agendar-coleta"
            onClick={() => navigate('/agendar-coleta')}
          >
            <Plus size={20} />
            <span>Agendar nova coleta</span>
          </button>

          {/* Seção de minhas coletas */}
          <section className="minhas-coletas-section">
            <div className="minhas-coletas-header">
              <h3 className="minhas-coletas-title">Minhas coletas</h3>
              <button
                className="ver-todas-btn"
                onClick={() => navigate('/minhas-coletas')}
              >
                Ver todas <ChevronRight size={16} />
              </button>
            </div>

            <div className="coletas-list">
              {coletas.map((coleta) => (
                <div key={coleta.id} className="coleta-card">
                  <div className="coleta-card-top">
                    <div className="coleta-tipo">
                      <Recycle size={18} className="coleta-tipo-icon" />
                      <span className="coleta-tipo-text">{coleta.tipo}</span>
                    </div>
                    <span className={`coleta-status ${coleta.statusClass}`}>
                      {coleta.status}
                    </span>
                  </div>

                  <div className="coleta-detalhes">
                    <div className="coleta-detalhe-item">
                      <Calendar size={14} />
                      <span>{coleta.data}</span>
                    </div>
                    <div className="coleta-detalhe-item">
                      <MapPin size={14} />
                      <span>{coleta.endereco}</span>
                    </div>
                    <div className="coleta-detalhe-item">
                      <Weight size={14} />
                      <span>Peso estimado: {coleta.peso}</span>
                    </div>
                  </div>

                  <div className="coleta-card-bottom">
                    <span className="coleta-pontos">{coleta.pontos}</span>
                    {coleta.coletor && (
                      <span className="coleta-coletor">Coletor: {coleta.coletor}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
