import { useState } from 'react'

export function useProfilePage() {
  const [tipoUsuario, setTipoUsuario] = useState('Coletor')
  
  const [usuario, setUsuario] = useState({
    nome: 'João Silva',
    email: 'joao.silva@gmail.com',
    telefone: '(11) 98765-4321',
    avatar: null,
    avaliacao: 4.8,
    coletas: 24,
    tipoUsuario: 'Coletor',
  })

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

  // Função para alternar tipo de usuário
  const alternarTipoUsuario = () => {
    const novoTipo = tipoUsuario === 'Coletor' ? 'Administrador' : 'Coletor'
    setTipoUsuario(novoTipo)
    setUsuario(prev => ({
      ...prev,
      tipoUsuario: novoTipo
    }))
  }

  // Retorna as configurações baseado no tipo de usuário
  const getConfiguracoes = () => {
    return tipoUsuario === 'Coletor' ? configracoesColetor : configuracoesAdministrador
  }

  return {
    usuario,
    setUsuario,
    tipoUsuario,
    alternarTipoUsuario,
    isDesktop,
    setIsDesktop,
    configuracoes: getConfiguracoes(),
    configracoesColetor,
    configuracoesAdministrador
  }
}
