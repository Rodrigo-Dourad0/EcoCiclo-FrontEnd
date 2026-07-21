import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Package,
  Star,
  Bell,
  Plus,
  Calendar,
  MapPin,
  Weight,
  ChevronRight,
  Recycle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Navigation } from "../../../shared/components/Navigation/Navigation.jsx";
import { useDashboard } from "../hooks/useDashboard.js";
import "../styles/Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const {
    showNotifications,
    setShowNotifications,
    stats,
    doacoesRecentes,
    loading,
    error,
    saudacao,
    recarregar,
  } = useDashboard();

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowNotifications]);

  return (
    <div className="app-container">
      <Navigation />

      <main className="dashboard-main">
        <div className="dashboard-container">
          <header className="top-header">
            <div className="top-title-wrapper">
              <h2 className="top-title">Dashboard</h2>
            </div>

            <div className="notification-wrapper" ref={notifRef}>
              <button
                className="icon-button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notificações"
              >
                <Bell size={20} />
              </button>

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

          <section className="greeting-section">
            <h1 className="greeting-title">Olá, {saudacao}!</h1>
            <p className="greeting-subtitle">Acompanhe seus pontos e suas doações em um só lugar.</p>
          </section>

          {error && (
            <div className="dashboard-error">
              <AlertCircle size={16} />
              <span>{error}</span>
              <button type="button" className="dashboard-error-btn" onClick={recarregar}>
                <RefreshCw size={14} />
                Tentar novamente
              </button>
            </div>
          )}

          <section className="dashboard-stats">
            {stats.map((stat) => {
              const icon =
                stat.label === "Pontos" ? (
                  <Leaf className="stat-icon leaf" size={24} />
                ) : stat.label === "Doações" ? (
                  <Package className="stat-icon package" size={24} />
                ) : stat.label === "Concluídas" ? (
                  <Star className="stat-icon star" size={24} />
                ) : (
                  <Recycle className="stat-icon recycle" size={24} />
                );

              return (
                <div key={stat.id} className="stat-card">
                  <div className={`stat-icon-naked ${stat.colorClass}`}>{icon}</div>
                  <div className="stat-info">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value">
                      {loading ? "..." : stat.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>

          <button className="btn-agendar-coleta" onClick={() => navigate("/agendar-doacao")}>
            <Plus size={20} />
            <span>Agendar nova doação</span>
          </button>

          <section className="minhas-coletas-section">
            <div className="minhas-coletas-header">
              <h3 className="minhas-coletas-title">Minhas doações recentes</h3>
              <button className="ver-todas-btn" onClick={() => navigate("/minhas-doacoes")}>
                Ver todas <ChevronRight size={16} />
              </button>
            </div>

            <div className="coletas-list">
              {loading ? (
                <div className="dashboard-loading">
                  <RefreshCw size={18} className="dashboard-loading-icon" />
                  <span>Carregando suas doações...</span>
                </div>
              ) : doacoesRecentes.length === 0 ? (
                <div className="dashboard-empty">
                  <Package size={34} />
                  <p>Você ainda não tem doações cadastradas.</p>
                  <span>Use o botão acima para agendar a sua primeira doação.</span>
                </div>
              ) : (
                doacoesRecentes.map((doacao) => (
                  <div key={doacao.id} className="coleta-card">
                    <div className="coleta-card-top">
                      <div className="coleta-tipo">
                        <Recycle size={18} className="coleta-tipo-icon" />
                        <span className="coleta-tipo-text">{doacao.nome}</span>
                      </div>

                      <span className={`coleta-status ${doacao.statusClass}`}>
                        {doacao.statusLabel}
                      </span>
                    </div>

                    <div className="coleta-detalhes">
                      <div className="coleta-detalhe-item">
                        <Calendar size={14} />
                        <span>{doacao.data}</span>
                      </div>

                      <div className="coleta-detalhe-item">
                        <MapPin size={14} />
                        <span>{doacao.endereco}</span>
                      </div>

                      <div className="coleta-detalhe-item">
                        <Weight size={14} />
                        <span>Peso estimado: {doacao.peso}</span>
                      </div>
                    </div>

                    <div className="coleta-card-bottom">
                      {doacao.pontos ? (
                        <span className="coleta-pontos">{doacao.pontos}</span>
                      ) : (
                        <span className="coleta-pontos">Pontos serão liberados após a conclusão</span>
                      )}

                      {doacao.coletor && (
                        <span className="coleta-coletor">Coletor: {doacao.coletor}</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
