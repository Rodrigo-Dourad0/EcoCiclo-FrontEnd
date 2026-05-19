import { useState } from "react";

export function useMinhasColetas() {
  const [abaAtiva, setAbaAtiva] = useState("agendadas");

  const coletas = {
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
      {
        id: 2,
        tipo: "Vidro",
        data: "02/02/2026 às 09:00",
        endereco: "Av. Brasil, 500 - Centro",
        peso: "10 kg",
        coletor: "João Pereira",
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
      {
        id: 4,
        tipo: "Metal",
        data: "20/01/2026 às 15:00",
        endereco: "Rua das Palmeiras, 77 - Vila Nova",
        peso: "12 kg",
        pontos: 120,
        coletor: "Ana Lima",
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

  return {
    abaAtiva,
    setAbaAtiva,
    coletasFiltradas: coletas[abaAtiva],
  };
}