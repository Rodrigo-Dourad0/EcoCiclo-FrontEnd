import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'

export function useProfilePage() {
  const { user } = useAuth()
  
  const defaultUser = user || {
    nome: 'Carregando...',
    email: '',
    telefone: '',
    avatar: null,
    avaliacao: 0,
    coletas: 0,
    tipo: 'DOADOR'
  }

  const mapearTipo = (tipo) => {
    if (tipo === 'ADMIN') return 'Administrador';
    if (tipo === 'ASSOCIACAO') return 'Coletor';
    return 'Doador';
  };

  const [tipoUsuario, setTipoUsuario] = useState(mapearTipo(defaultUser.tipo))
  
  const [usuario, setUsuario] = useState({
    ...defaultUser,
    tipoUsuario: mapearTipo(defaultUser.tipo)
  })

  useEffect(() => {
    if (user) {
       const tipo = mapearTipo(user.tipo);
       setTipoUsuario(tipo);
       setUsuario({
         ...user,
         tipoUsuario: tipo,
         avaliacao: user.avaliacao || 0,
         coletas: user.coletas || 0
       });
    }
  }, [user])

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
      id: 'validar-coletores',
      label: 'Validar Coletores',
      icon: 'check',
      action: 'onValidarColetores'
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

  // Retorna as configurações baseado no tipo de usuário
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
