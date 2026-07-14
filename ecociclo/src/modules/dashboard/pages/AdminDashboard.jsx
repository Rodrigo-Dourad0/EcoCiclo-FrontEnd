import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Truck,
  Recycle,
  Gift,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  UserPlus,
  PackageCheck,
} from 'lucide-react';
import { Navigation } from '../../../shared/components/Navigation/Navigation.jsx';
import '../styles/AdminDashboard.css';

export function AdminDashboard() {
  const navigate = useNavigate();

  // ── KPIs gerais da plataforma (mock) ──
  const kpis = [
    {
      id: 1,
      label: 'Usuários ativos',
      value: '1.284',
      icon: <Users size={20} />,
      colorClass: 'blue',
    },
    {
      id: 2,
      label: 'Coletores licenciados',
      value: '37',
      icon: <Truck size={20} />,
      colorClass: 'green',
    },
    {
      id: 3,
      label: 'Doações no mês',
      value: '196',
      icon: <Recycle size={20} />,
      colorClass: 'yellow',
    },
    {
      id: 4,
      label: 'Recompensas resgatadas',
      value: '52',
      icon: <Gift size={20} />,
      colorClass: 'purple',
    },
  ];

  // ── Pendências de validação de coletores (mesma origem de dados de ValidarColetores) ──
  const pendentes = [
    { id: 1, nome: 'Carlos Eduardo Silva', dataPedido: '28/05/2025' },
    { id: 2, nome: 'Fernanda Oliveira Santos', dataPedido: '30/05/2025' },
    { id: 3, nome: 'Roberto Almeida Costa', dataPedido: '01/06/2025' },
  ];

  // ── Recompensas com estoque baixo (mesma origem de dados de GerenciarRecompensa) ──
  const estoqueBaixo = [
    { id: 1, nome: 'Ecobag EcoCiclo', estoque: 3 },
    { id: 2, nome: 'Garrafa Térmica EcoCiclo', estoque: 5 },
  ];

  // ── Atividade recente combinando doações, coletores e resgates ──
  const atividades = [
    {
      id: 1,
      tipo: 'doacao',
      texto: 'Nova doação de Papel e Papelão agendada por Maria Santos',
      tempo: 'há 12 min',
      icon: <Recycle size={15} />,
      colorClass: 'green',
    },
    {
      id: 2,
      tipo: 'coletor',
      texto: 'Carlos Eduardo Silva solicitou cadastro como coletor',
      tempo: 'há 40 min',
      icon: <UserPlus size={15} />,
      colorClass: 'blue',
    },
    {
      id: 3,
      tipo: 'resgate',
      texto: 'João Silva resgatou "Garrafa Térmica EcoCiclo"',
      tempo: 'há 1h',
      icon: <PackageCheck size={15} />,
      colorClass: 'purple',
    },
    {
      id: 4,
      tipo: 'coleta',
      texto: 'Coleta de Plástico concluída por Ana Beatriz',
      tempo: 'há 2h',
      icon: <CheckCircle2 size={15} />,
      colorClass: 'green',
    },
  ];

  return (
    <div className="app-container">
      <Navigation />

      <main className="ad-main">
        <div className="ad-container">

          {/* Cabeçalho */}
          <header className="ad-top-header">
            <div>
              <span className="ad-kicker">Administração</span>
              <h1 className="ad-titulo">Painel administrativo</h1>
              <p className="ad-subtitulo">Visão geral da plataforma e pendências do dia.</p>
            </div>
          </header>

          {/* KPIs */}
          <section className="ad-kpis">
            {kpis.map((kpi) => (
              <div key={kpi.id} className="ad-kpi-card">
                <div className={`ad-kpi-icon ${kpi.colorClass}`}>{kpi.icon}</div>
                <div className="ad-kpi-info">
                  <span className="ad-kpi-value">{kpi.value}</span>
                  <span className="ad-kpi-label">{kpi.label}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Cards de gestão rápida */}
          <section className="ad-grid">

            {/* Validação de coletores */}
            <div className="ad-card">
              <div className="ad-card-header">
                <div className="ad-card-header-text">
                  <span className="ad-card-eyebrow">
                    <Clock size={13} /> Aguardando validação
                  </span>
                  <h3>Coletores pendentes</h3>
                </div>
                <span className="ad-badge ad-badge--yellow">{pendentes.length}</span>
              </div>

              <ul className="ad-mini-list">
                {pendentes.map((p) => (
                  <li key={p.id} className="ad-mini-item">
                    <span className="ad-mini-avatar">
                      {p.nome.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                    </span>
                    <div className="ad-mini-item-info">
                      <span className="ad-mini-nome">{p.nome}</span>
                      <span className="ad-mini-meta">Pedido em {p.dataPedido}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="ad-card-btn" onClick={() => navigate('/validar-coletores')}>
                Validar coletores <ChevronRight size={16} />
              </button>
            </div>

            {/* Estoque de recompensas */}
            <div className="ad-card">
              <div className="ad-card-header">
                <div className="ad-card-header-text">
                  <span className="ad-card-eyebrow">
                    <AlertTriangle size={13} /> Estoque baixo
                  </span>
                  <h3>Recompensas</h3>
                </div>
                <span className="ad-badge ad-badge--red">{estoqueBaixo.length}</span>
              </div>

              <ul className="ad-mini-list">
                {estoqueBaixo.map((r) => (
                  <li key={r.id} className="ad-mini-item">
                    <span className="ad-mini-icon">
                      <Gift size={16} />
                    </span>
                    <div className="ad-mini-item-info">
                      <span className="ad-mini-nome">{r.nome}</span>
                      <span className="ad-mini-meta ad-mini-meta--alerta">
                        Apenas {r.estoque} em estoque
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="ad-card-btn" onClick={() => navigate('/gerenciar-recompensa')}>
                Gerenciar recompensas <ChevronRight size={16} />
              </button>
            </div>

          </section>

          {/* Atividade recente */}
          <section className="ad-atividade-section">
            <div className="ad-atividade-header">
              <h3>Atividade recente</h3>
            </div>

            <div className="ad-atividade-lista">
              {atividades.map((a) => (
                <div key={a.id} className="ad-atividade-item">
                  <span className={`ad-atividade-icon ${a.colorClass}`}>{a.icon}</span>
                  <p className="ad-atividade-texto">{a.texto}</p>
                  <span className="ad-atividade-tempo">{a.tempo}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}