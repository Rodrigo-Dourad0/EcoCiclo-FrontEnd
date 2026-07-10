import { useMemo, useRef, useState } from "react";

const coletasDisponiveisMock = [
  {
    id: 1,
    material: "Papel e Papelão",
    categoria: "Papel",
    descricao: "Caixas de papelão, folhas e revistas separadas.",
    descricaoCompleta: "Aproximadamente 3 caixas grandes de papelão dobradas, além de jornais e revistas amarrados. Material seco, sem contaminação por resíduos orgânicos.",
    observacoes: "Deixar na portaria do prédio. Avisar antes de subir.",
    peso: "15 kg",
    endereco: "Rua das Flores, 123 - Centro",
    enderecoCompleto: "Rua das Flores, 123, Ap. 401 - Centro, São Paulo - SP, 01310-100",
    distancia: "2,3 km",
    horario: "Hoje às 14:00",
    dataHoraCompleta: "Quarta-feira, 22 de Janeiro de 2026 às 14:00",
    pontos: 150,
    doador: "Maria Santos",
    telefone: "(11) 98765-4321",
    status: "Disponível",
    codigoId: "COL-2026-0001",
    fotos: [],
    coordenadas: { lat: -23.5505, lng: -46.6333 },
  },
  {
    id: 2,
    material: "Plástico",
    categoria: "Plástico",
    descricao: "Garrafas PET e embalagens plásticas limpas.",
    descricaoCompleta: "Cerca de 40 garrafas PET de 2L, lavadas e amassadas. Também há tampinhas separadas em saco plástico.",
    observacoes: "Material ensacado e pronto para coleta. Portão sempre aberto.",
    peso: "8 kg",
    endereco: "Av. Principal, 456 - Jardins",
    enderecoCompleto: "Av. Principal, 456 - Jardins, São Paulo - SP, 01452-000",
    distancia: "1,8 km",
    horario: "Hoje às 16:30",
    dataHoraCompleta: "Quarta-feira, 22 de Janeiro de 2026 às 16:30",
    pontos: 80,
    doador: "Carlos Oliveira",
    telefone: "(11) 97654-3210",
    status: "Disponível",
    codigoId: "COL-2026-0002",
    fotos: [],
    coordenadas: { lat: -23.5605, lng: -46.6533 },
  },
  {
    id: 3,
    material: "Vidro",
    categoria: "Vidro",
    descricao: "Garrafas e potes de vidro separados em caixa.",
    descricaoCompleta: "Garrafas de vinho, potes de conserva e frascos de vidro. Todos limpos e sem tampas metálicas.",
    observacoes: "Material pesado, recomendável trazer caixas reforçadas.",
    peso: "10 kg",
    endereco: "Rua Bela Vista, 90 - São José",
    enderecoCompleto: "Rua Bela Vista, 90 - São José, São Paulo - SP, 01323-000",
    distancia: "3,1 km",
    horario: "Amanhã às 09:00",
    dataHoraCompleta: "Quinta-feira, 23 de Janeiro de 2026 às 09:00",
    pontos: 100,
    doador: "Ana Lima",
    telefone: "(11) 96543-2109",
    status: "Disponível",
    codigoId: "COL-2026-0003",
    fotos: [],
    coordenadas: { lat: -23.5405, lng: -46.6233 },
  },
  {
    id: 4,
    material: "Metal",
    categoria: "Metal",
    descricao: "Latas de alumínio e pequenos objetos metálicos.",
    descricaoCompleta: "Aproximadamente 200 latas de alumínio amassadas, mais sucata metálica pequena: pregos, arames e parafusos.",
    observacoes: "Disponível a partir das 8h. Interfone: 204.",
    peso: "6 kg",
    endereco: "Rua das Palmeiras, 77 - Vila Nova",
    enderecoCompleto: "Rua das Palmeiras, 77 - Vila Nova, São Paulo - SP, 02515-000",
    distancia: "2,7 km",
    horario: "Amanhã às 15:00",
    dataHoraCompleta: "Quinta-feira, 23 de Janeiro de 2026 às 15:00",
    pontos: 120,
    doador: "Pedro Costa",
    telefone: "(11) 95432-1098",
    status: "Disponível",
    codigoId: "COL-2026-0004",
    fotos: [],
    coordenadas: { lat: -23.5305, lng: -46.6433 },
  },
  {
    id: 5,
    material: "Eletrônicos",
    categoria: "Eletrônicos",
    descricao: "Carregadores antigos, cabos e pequenos eletrônicos.",
    descricaoCompleta: "Caixa com 2 smartphones quebrados, 5 carregadores antigos, vários cabos USB e um tablet com tela trincada.",
    observacoes: "Nenhum item com bateria inchada. Material em bom estado estrutural.",
    peso: "5 kg",
    endereco: "Rua Sete de Setembro, 210 - Centro",
    enderecoCompleto: "Rua Sete de Setembro, 210, Sala 12 - Centro, São Paulo - SP, 01311-000",
    distancia: "4,2 km",
    horario: "Sexta às 10:00",
    dataHoraCompleta: "Sexta-feira, 24 de Janeiro de 2026 às 10:00",
    pontos: 200,
    doador: "Juliana Rocha",
    telefone: "(11) 94321-0987",
    status: "Disponível",
    codigoId: "COL-2026-0005",
    fotos: [],
    coordenadas: { lat: -23.5505, lng: -46.6333 },
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

  // Total disponíveis = total do mock MENOS as já aceitas
  const totalDisponiveis = coletasDisponiveis.length - coletasAceitas.length;

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
      setIdsEmProcessamento((prev) => prev.filter((itemId) => itemId !== id));
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
    totalDisponiveis,
    aceitarColeta,
    idsEmProcessamento,
    coletasAceitas,
    toastVisivel: false,
    toastMensagem: "",
  };
}