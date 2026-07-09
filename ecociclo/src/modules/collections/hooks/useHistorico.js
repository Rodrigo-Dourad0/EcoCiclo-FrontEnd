// useHistorico.js

export const STATUS = {
  AGENDADA: "Agendada",
  COLETADA: "Coletada",
  CANCELADA: "Cancelada",
};

export const PERIODOS = {
  TODOS: "Todos os períodos",
  ULTIMO_MES: "Último mês",
  ULTIMOS_3_MESES: "Últimos 3 meses",
  ESTE_ANO: "Este ano",
};


export const doacoes = [
  {
    id: "001",
    tipo: "Papel e Papelão",
    status: STATUS.AGENDADA,
    data: "30/01/2026",
    horario: "14:00",
    endereco: "Rua das Flores, 123 - Centro",
    pesoEstimado: 15,
    coletor: "Maria Santos",
    pontos: null,
  },
  {
    id: "002",
    tipo: "Plástico",
    status: STATUS.COLETADA,
    data: "25/01/2026",
    horario: "10:00",
    endereco: "Av. Principal, 456 - Jardins",
    pesoEstimado: 8,
    coletor: "Carlos Oliveira",
    pontos: 80,
  },
];