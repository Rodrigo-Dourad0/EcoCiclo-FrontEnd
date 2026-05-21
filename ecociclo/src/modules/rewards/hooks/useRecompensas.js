import { useState } from 'react';

export function useRecompensas() {
  const [pontosAtuais] = useState(1250);
  const [proximoNivel] = useState(1500);
  const progresso = Math.round((pontosAtuais / proximoNivel) * 100);

  const recompensas = [
    {
      id: 1,
      nome: 'Desconto 10% — Loja Eco',
      desc: 'Válido em produtos sustentáveis',
      emoji: '🛍️',
      cor: 'verde',
      custo: 500,
      status: 'resgatado',
    },
    {
      id: 2,
      nome: 'Sacola Ecológica',
      desc: 'Sacola reutilizável personalizada',
      emoji: '🌿',
      cor: 'azul',
      custo: 800,
      status: 'disponivel',
    },
    {
      id: 3,
      nome: 'Copo Térmico 350ml',
      desc: 'Aço inoxidável, livre de BPA',
      emoji: '☕',
      cor: 'amarelo',
      custo: 1200,
      status: 'disponivel',
    },
    {
      id: 4,
      nome: 'Kit Composteira Doméstica',
      desc: 'Transforme resíduos em adubo',
      emoji: '🌱',
      cor: 'roxo',
      custo: 2000,
      status: 'bloqueado',
    },
    {
      id: 5,
      nome: 'Voucher Restaurante Orgânico',
      desc: 'R$50 em refeições orgânicas',
      emoji: '🥗',
      cor: 'rosa',
      custo: 2500,
      status: 'bloqueado',
    },
  ];

  const historico = [
    { id: 1, nome: 'Desconto 10% — Loja Eco', data: '12 Mai 2026', pontos: -500, emoji: '🛍️' },
    { id: 2, nome: 'Coleta #22 completada', data: '08 Mai 2026', pontos: +120, emoji: '♻️' },
    { id: 3, nome: 'Coleta #21 completada', data: '02 Mai 2026', pontos: +95, emoji: '♻️' },
    { id: 4, nome: 'Bônus semanal', data: '28 Abr 2026', pontos: +50, emoji: '🎁' },
  ];

  return { pontosAtuais, proximoNivel, progresso, recompensas, historico };
}