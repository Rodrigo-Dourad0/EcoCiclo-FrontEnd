import { useState } from "react";

const doacoes = {
  agendadas: [
    {
      id: 1,
      tipo: "Papel e Papelão",
      data: "30/01/2026 às 14:00",
      endereco: "Rua das Flores, 123 - Centro",
      peso: "15 kg",
      coletor: "Maria Santos",
      status: "Agendada",
    },
  ],
  coletadas: [
    {
      id: 3,
      tipo: "Plástico",
      data: "25/01/2026 às 10:00",
      endereco: "Av. Principal, 456 - Jardins",
      peso: "8 kg",
      pontos: 80,
      coletor: "Carlos Oliveira",
      status: "Coletada",
    },
  ],
  canceladas: [
    {
      id: 5,
      tipo: "Eletrônicos",
      data: "15/01/2026 às 11:00",
      endereco: "Rua Sete, 90 - Bela Vista",
      peso: "5 kg",
      coletor: "Pedro Costa",
      status: "Cancelada",
    },
  ],
};

export function useMinhasDoacoes() {
  const [abaAtiva, setAbaAtiva] = useState("agendadas");

  const contagens = {
    agendadas: doacoes.agendadas.length,
    coletadas: doacoes.coletadas.length,
    canceladas: doacoes.canceladas.length,
  };

  return {
    abaAtiva,
    setAbaAtiva,
    doacoesFiltradas: doacoes[abaAtiva],
    contagens,
  };
}