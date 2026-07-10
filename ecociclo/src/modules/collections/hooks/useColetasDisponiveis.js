import { useMemo, useRef, useState } from "react";

const coletasDisponiveisMock = [
  {
    id: 1,
    material: "Papel e Papelão",
    categoria: "Papel",
    descricao: "Caixas de papelão, folhas e revistas separadas.",
    peso: "15 kg",
    endereco: "Rua das Flores, 123 - Centro",
    distancia: "2,3 km",
    horario: "Hoje às 14:00",
    pontos: 150,
    doador: "Maria Santos",
    status: "Disponível",
  },
  {
    id: 2,
    material: "Plástico",
    categoria: "Plástico",
    descricao: "Garrafas PET e embalagens plásticas limpas.",
    peso: "8 kg",
    endereco: "Av. Principal, 456 - Jardins",
    distancia: "1,8 km",
    horario: "Hoje às 16:30",
    pontos: 80,
    doador: "Carlos Oliveira",
    status: "Disponível",
  },
  {
    id: 3,
    material: "Vidro",
    categoria: "Vidro",
    descricao: "Garrafas e potes de vidro separados em caixa.",
    peso: "10 kg",
    endereco: "Rua Bela Vista, 90 - São José",
    distancia: "3,1 km",
    horario: "Amanhã às 09:00",
    pontos: 100,
    doador: "Ana Lima",
    status: "Disponível",
  },
  {
    id: 4,
    material: "Metal",
    categoria: "Metal",
    descricao: "Latas de alumínio e pequenos objetos metálicos.",
    peso: "6 kg",
    endereco: "Rua das Palmeiras, 77 - Vila Nova",
    distancia: "2,7 km",
    horario: "Amanhã às 15:00",
    pontos: 120,
    doador: "Pedro Costa",
    status: "Disponível",
  },
  {
    id: 5,
    material: "Eletrônicos",
    categoria: "Eletrônicos",
    descricao: "Carregadores antigos, cabos e pequenos eletrônicos.",
    peso: "5 kg",
    endereco: "Rua Sete de Setembro, 210 - Centro",
    distancia: "4,2 km",
    horario: "Sexta às 10:00",
    pontos: 200,
    doador: "Juliana Rocha",
    status: "Disponível",
  },
];

const categorias = ["Todas", "Papel", "Plástico", "Vidro", "Metal", "Eletrônicos"];

export default function useColetasDisponiveis() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [coletasDisponiveis, setColetasDisponiveis] = useState(coletasDisponiveisMock);
  const [coletasAceitas, setColetasAceitas] = useState([]);
  const [idsEmProcessamento, setIdsEmProcessamento] = useState([]);

  const idsBloqueadosRef = useRef(new Set());

  const limiteColetas = 2;
  const coletasAtivas = coletasAceitas.length;
  const limiteAtingido = coletasAtivas >= limiteColetas;

  // Pontuação atual do coletor — dado mockado enquanto não há integração.
    const pontosColetor = 2350;

  function aceitarColeta(id) {
    if (limiteAtingido || idsBloqueadosRef.current.has(id)) return;

    const coletaSelecionada = coletasDisponiveis.find((coleta) => coleta.id === id);
    if (!coletaSelecionada) return;

    idsBloqueadosRef.current.add(id);
    setIdsEmProcessamento((prev) => [...prev, id]);

    setTimeout(() => {
      setColetasAceitas((prev) => {
        const jaAceita = prev.some((coleta) => coleta.id === id);
        if (jaAceita || prev.length >= limiteColetas) return prev;
        return [...prev, coletaSelecionada];
      });


      setIdsEmProcessamento((prev) =>
        prev.filter((itemId) => itemId !== id)
      );
    }, 700);
  }

  const coletasFiltradas = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase();

    return coletasDisponiveis.filter((coleta) => {
      const passaCategoria =
        categoriaAtiva === "Todas" || coleta.categoria === categoriaAtiva;

      const passaBusca =
        coleta.material.toLowerCase().includes(buscaNormalizada) ||
        coleta.endereco.toLowerCase().includes(buscaNormalizada) ||
        coleta.doador.toLowerCase().includes(buscaNormalizada);

      return passaCategoria && passaBusca;
    });
  }, [busca, categoriaAtiva, coletasDisponiveis]);

  return {
    busca,
    setBusca,
    categoriaAtiva,
    setCategoriaAtiva,
    categorias,
    coletasFiltradas,
    coletasAtivas,
    limiteColetas,
    limiteAtingido,
    totalDisponiveis: coletasDisponiveis.length,
    pontosColetor,
    aceitarColeta,
    idsEmProcessamento,
    coletasAceitas,
  };
}