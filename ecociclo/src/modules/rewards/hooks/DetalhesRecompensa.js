import { useState } from "react";

export function useDetalhesRecompensa() {
  const recompensa = {
    titulo: "Vale-compras R$ 50",
    tipo: "Voucher",
    descricao: "Desconto de R$ 50 em lojas parceiras",
    pontosNecessarios: 500,
    pontosUsuario: 1250,
    sobre: "Use este voucher em nossas lojas parceiras e economize R$ 50 na sua próxima compra.",
    validade: "31/03/2026",
    observacao: "Válido apenas para compras acima de R$ 100. Não cumulativo com outras promoções.",
  };

  const [resgatado, setResgatado] = useState(false);

  const handleResgatar = () => {
    if (recompensa.pontosUsuario >= recompensa.pontosNecessarios) {
      setResgatado(true);
    }
  };

  const podeResgatar = recompensa.pontosUsuario >= recompensa.pontosNecessarios;

  return {
    recompensa,
    resgatado,
    podeResgatar,
    handleResgatar,
  };
}