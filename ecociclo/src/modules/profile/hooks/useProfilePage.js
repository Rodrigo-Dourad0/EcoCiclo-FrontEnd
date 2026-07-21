import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { listarAvaliacoes } from '../../feedback/services/avaliacaoService'

export function useProfilePage() {
  const { user } = useAuth()

  const normalizarAssociacao = (associacao) => {
    if (!associacao) return null

    if (typeof associacao === 'string') {
      return {
        id: '',
        nome: associacao,
        cnpj: '',
      }
    }

    return {
      id: associacao.id || '',
      nome: associacao.nome || associacao.razaoSocial || 'Associacao nao informada',
      cnpj: associacao.cnpj || '',
    }
  }
  
 
  const defaultUser = user || {
    nome: 'Carregando...',
    email: '',
    telefone: '',
    avatar: null,
    avaliacao: 0,
    coletas: 0,
    perfil: 'DOADOR',
    associacao: null
  }

  const mapearTipo = (tipo) => {
    if (tipo === 'ADMINISTRADOR') return 'Administrador';
    if (tipo === 'COLETOR') return 'Coletor';
    return 'Doador';
  };

 
  const [tipoUsuario, setTipoUsuario] = useState(mapearTipo(defaultUser.perfil))
  
  const [usuario, setUsuario] = useState({
    ...defaultUser,
    tipoUsuario: mapearTipo(defaultUser.perfil) 
  })

  useEffect(() => {
    if (user) {
       const tipo = mapearTipo(user.perfil);
       setTipoUsuario(tipo);
       setUsuario({
         ...user,
         tipoUsuario: tipo,
         avaliacao: user.avaliacao || 0,
         coletas: user.coletas || 0,
         totalAvaliacoes: user.totalAvaliacoes || 0,
         ultimaAvaliacao: user.ultimaAvaliacao || null,
         associacao: normalizarAssociacao(user.associacao || user.associacaoDto || user.coletor?.associacao)
       });
    }
  }, [user])

  useEffect(() => {
    let ativo = true;

    async function carregarAvaliacoesDoColetor() {
      if (!user?.id || mapearTipo(user.perfil) !== 'Coletor') {
        return;
      }

      try {
        const avaliacoes = await listarAvaliacoes();
        const filtradas = avaliacoes.filter((avaliacao) => String(avaliacao?.coletorId) === String(user.id));

        const total = filtradas.length;
        const media = total > 0
          ? filtradas.reduce((acc, item) => acc + Number(item.nota || 0), 0) / total
          : 0;

        const ultimaAvaliacao = filtradas
          .slice()
          .sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))[0] || null;

        if (ativo) {
          setUsuario((prev) => ({
            ...prev,
            avaliacao: Number(media.toFixed(1)),
            totalAvaliacoes: total,
            ultimaAvaliacao: ultimaAvaliacao
              ? {
                  comentario: ultimaAvaliacao.comentario || '',
                  nota: Number(ultimaAvaliacao.nota || 0),
                  data: ultimaAvaliacao.data || '',
                }
              : null,
          }));
        }
      } catch {
        // Mantém os valores já carregados do usuário caso a API falhe.
      }
    }

    carregarAvaliacoesDoColetor();

    return () => {
      ativo = false;
    };
  }, [user?.id, user?.perfil]);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  // Configurações para Coletor
  const configracoesColetor = [
    {
      id: 'meus-enderecos',
      label: 'Gerenciar endereços',
      icon: 'map',
      action: 'onMeusEnderecos'
    },
    {
      id: 'novo-endereco',
      label: 'Adicionar novo endereço',
      icon: 'plus',
      action: 'onNovoEndereco'
    },
    {
      id: 'minhas-coletas',
      label: 'Minhas coletas',
      icon: 'box',
      action: 'onMinhasColetas'
    },
    {
      id: 'minhas-avaliacoes',
      label: 'Minhas avaliações',
      icon: 'star',
      action: 'onMinhasAvaliacoes'
    }
  ]

  // Configurações para Administrador
  const configuracoesAdministrador = [
    {
      id: 'gerenciar-recompensas',
      label: 'Gerenciar Recompensas',
      icon: 'star',
      action: 'onGerenciarRecompensas'
    },
    {
      id: 'gerenciar-usuarios',
      label: 'Gerenciar Usuários',
      icon: 'users',
      action: 'onGerenciarUsuarios'
    },
    {
      id: 'gerenciar-associacoes',
      label: 'Gerenciar Associações',
      icon: 'users',
      action: 'onGerenciarAssociacoes'
    }
  ]

  // Configurações para Doador
  const configuracoesDoador = [
    {
      id: 'meus-enderecos',
      label: 'Gerenciar endereços',
      icon: 'map',
      action: 'onMeusEnderecos'
    },
    {
      id: 'novo-endereco',
      label: 'Adicionar novo endereço',
      icon: 'plus',
      action: 'onNovoEndereco'
    }
  ]

  
  const getConfiguracoes = () => {
    if (tipoUsuario === 'Administrador') return configuracoesAdministrador;
    if (tipoUsuario === 'Coletor') return configracoesColetor;
    return configuracoesDoador;
  }

  return {
    usuario,
    setUsuario,
    tipoUsuario,
    isDesktop,
    setIsDesktop,
    configuracoes: getConfiguracoes(),
    configracoesColetor,
    configuracoesAdministrador,
    configuracoesDoador
  }
}
