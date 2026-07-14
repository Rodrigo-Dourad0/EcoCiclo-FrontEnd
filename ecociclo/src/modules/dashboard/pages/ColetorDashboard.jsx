import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, Package, Star, Bell, Weight, Calendar, MapPin, User, ChevronRight, Search } from 'lucide-react';
import '../styles/ColetorDashboard.css';
import { Navigation } from '../../../shared/components/Navigation/Navigation.jsx';

export function ColetorDashboard() {
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

  // Dados de estatísticas mockados (perspectiva do coletor)
  const stats = [
    {
      id: 1,
      label: 'Coletas feitas',
      value: '38',
      icon: <Package className="stat-icon package" size={24} />,
      colorClass: 'blue'
    },
    {
      id: 2,
      label: 'Peso total',
      value: '312 kg',
      icon: <Weight className="stat-icon weight" size={24} />,
      colorClass: 'green'
    },
    {
      id: 3,
      label: 'Avaliação',
      value: '4.9',
      icon: <Star className="stat-icon star" size={24} />,
      colorClass: 'yellow'
    }
  ];

  // Dados de coletas mockados (perspectiva do coletor)
  const coletas = [
    {
      id: 1,
      tipo: 'Papel e Papelão',
      status: 'Agendada',
      statusClass: 'status-agendada',
      data: '30/01/2026 às 14:00',
      endereco: 'Rua das Flores, 123 - Centro',
      peso: '15 kg',
      doador: 'Maria Santos'
    },
    {
      id: 2,
      tipo: 'Plástico',
      status: 'Coletada',
      statusClass: 'status-coletada',
      data: '25/01/2026 às 10:00',
      endereco: 'Av. Principal, 456 - Jardins',
      peso: '8 kg',
      doador: 'Carlos Oliveira'
    }
  ];

  return (
    <div className="app-container">
        <Navigation />

      <main className="collector-dashboard-main">
        <div className="collector-dashboard-container">

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
            <h1 className="greeting-title">Olá, Coletor! 👏</h1>
            <p className="greeting-subtitle">Pronto para coletar hoje?</p>
          </section>

          {/* Cards de estatísticas */}
          <section className="collector-dashboard-stats">
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

          {/* Botão de buscar novas coletas */}
          <button
            className="btn-buscar-coletas"
            onClick={() => navigate('/coletas-disponiveis')}
          >
            <Search size={20} />
            <span>Ver coletas disponíveis</span>
          </button>

          {/* Acesso provisório à tela do doador */}
          <button
            type="button"
            className="btn-acesso-doador"
            onClick={() => navigate('/dashboard')}
          >
            <Recycle size={17} />
            <span>Painel do doador</span>
            <ChevronRight size={16} />
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
                    <span className="coleta-doador">
                      <User size={12} /> Doador: {coleta.doador}
                    </span>
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