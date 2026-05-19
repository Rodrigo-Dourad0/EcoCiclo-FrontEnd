import { useState } from "react";

export default function useMinhasRecompensas() {
  const [recompensas] = useState([
    {
      id: 1,
      nome: "Vale-compras R$ 20",
      data: "15/01/2026",
      pontos: 200,
      status: "ativa",
      codigo: "ABC123XYZ",
    },
    {
      id: 2,
      nome: "Kit de Canudos Reutilizáveis",
      data: "10/01/2026",
      pontos: 150,
      status: "utilizada",
      codigo: null,
    },
  ]);

  return {
    recompensas,
  };
}
