import { useState } from 'react';

// ─── DADOS DAS COLETAS ────────────────────────────────────────────────────────
const coletasIniciais = [
  {
    id: '001',
    status: 'agendada',
    material: 'Papel e Papelão',
    icon: '📦',
    data: '30/01/2026 às 14:00',
    endereco: 'Rua das Flores, 123 - Centro',
    peso: '15 kg',
    observacoes: 'Materiais separados e limpos',
    pessoa: {
      tipo: 'coletor',
      nome: 'Maria Santos',
      rating: '4.8',
      telefone: '(11) 91234-5678',
    },
  },
  {
    id: '002',
    status: 'coletada',
    material: 'Plástico',
    icon: '♻️',
    data: '25/01/2026 às 10:00',
    endereco: 'Av. Principal, 456 - Jardins',
    peso: '8 kg',
    observacoes: 'Materiais separados e limpos',
    pontos: 80,
    pessoa: {
      tipo: 'coletor',
      nome: 'Carlos Oliveira',
      rating: '4.8',
      telefone: '(11) 91234-5678',
    },
  },
  {
    id: '003',
    status: 'agendada_coletor',
    material: 'Metal',
    icon: '🔩',
    data: '30/01/2026 às 16:00',
    endereco: 'Rua do Comércio, 789',
    peso: '20 kg',
    observacoes: 'Materiais já separados',
    pessoa: {
      tipo: 'doador',
      nome: 'Ana Costa',
      telefone: '(11) 99876-5432',
    },
  },
  {
    id: '101',
    status: 'disponivel',
    material: 'Papel e Papelão',
    icon: '📦',
    data: '31/01/2026 às 09:00',
    endereco: 'Rua Verde, 100 - Vila Nova',
    peso: '12 kg',
    observacoes: 'Materiais já separados',
    pessoa: {
      tipo: 'doador',
      nome: 'Pedro Santos',
      telefone: '(11) 99876-5432',
    },
  },
];

// ─── CONFIG DE STATUS ─────────────────────────────────────────────────────────
export const statusConfig = {
  agendada:         { label: 'Agendada',   badgeClass: 'dc-badge--agendada' },
  coletada:         { label: 'Coletada',   badgeClass: 'dc-badge--coletada' },
  agendada_coletor: { label: 'Agendada',   badgeClass: 'dc-badge--agendada_coletor' },
  disponivel:       { label: 'Disponível', badgeClass: 'dc-badge--disponivel' },
};

// ─── LABELS DAS TABS ──────────────────────────────────────────────────────────
export const tabLabels = [
  '#001 – Agendada',
  '#002 – Coletada',
  '#003 – Em rota',
  '#101 – Disponível',
];

// pontuação estimada por kg, usada ao finalizar uma coleta
const PONTOS_POR_KG = 6;

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export function useDetalhesColeta() {
  const [coletas, setColetas] = useState(coletasIniciais);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sheetAberto, setSheetAberto] = useState(false);

  const coletaAtiva = coletas[activeIndex];

  function irParaColeta(index) {
    setActiveIndex(index);
  }

  function abrirFinalizarColeta() {
    setSheetAberto(true);
  }

  function fecharFinalizarColeta() {
    setSheetAberto(false);
  }

  function finalizarColeta({ idColeta, pesoReal, observacoes, fotos }) {
    setColetas((prev) =>
      prev.map((c) =>
        c.id === idColeta
          ? {
              ...c,
              status: 'coletada',
              peso: `${pesoReal} kg`,
              observacoes: observacoes?.trim() ? observacoes : c.observacoes,
              pontos: Math.round(Number(pesoReal) * PONTOS_POR_KG),
              fotos,
            }
          : c
      )
    );
    setSheetAberto(false);
  }

  return {
    coletas,
    coletaAtiva,
    activeIndex,
    irParaColeta,
    sheetAberto,
    abrirFinalizarColeta,
    fecharFinalizarColeta,
    finalizarColeta,
  };
}