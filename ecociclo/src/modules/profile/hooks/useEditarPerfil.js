// src/hooks/useEditarPerfil.js
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function formatarTelefone(valor) {
  let v = valor.replace(/\D/g, '')
  if (v.length > 11) v = v.slice(0, 11)
  if (v.length > 6) {
    v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
  } else if (v.length > 2) {
    v = `(${v.slice(0, 2)}) ${v.slice(2)}`
  } else if (v.length > 0) {
    v = `(${v}`
  }
  return v
}

export function useEditarPerfil() {
  const navigate = useNavigate()

  const [id, setId] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [avatar, setAvatar] = useState(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const getToken = () => localStorage.getItem('token')

  const carregarUsuario = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/usuarios/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })

      if (!response.ok) {
        throw new Error('Não foi possível carregar os dados do usuário.')
      }

      const data = await response.json()

      setId(data.id)
      setNome(data.nome || '')
      setEmail(data.email || '')
      setTelefone(data.telefone ? formatarTelefone(data.telefone) : '')
    } catch (err) {
      setError(err.message || 'Erro ao carregar perfil.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregarUsuario()
  }, [carregarUsuario])

  function handleTelefoneChange(valor) {
    setTelefone(formatarTelefone(valor))
  }

  function handleAvatarChange() {
    alert('Funcionalidade de upload em breve!')
  }

  function voltar() {
    navigate('/perfil')
  }

  async function handleSave(event) {
    if (event) event.preventDefault()

    if (!id) {
      setError('Usuário não identificado. Recarregue a página.')
      return
    }

    setSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          nome,
          telefone: telefone.replace(/\D/g, ''),
        }),
      })

      if (!response.ok) {
        throw new Error('Não foi possível salvar as alterações.')
      }

      const data = await response.json()

      setNome(data.nome || nome)
      setTelefone(data.telefone ? formatarTelefone(data.telefone) : telefone)
      setSuccessMessage('Perfil atualizado com sucesso!')

      // Dá um tempinho pro usuário ver a confirmação antes de voltar
      setTimeout(() => {
        navigate('/perfil')
      }, 1200)
    } catch (err) {
      setError(err.message || 'Erro ao salvar perfil.')
    } finally {
      setSaving(false)
    }
  }

  return {
    nome,
    setNome,
    email,
    telefone,
    setTelefone: handleTelefoneChange,
    avatar,
    setAvatar,
    loading,
    saving,
    error,
    successMessage,
    handleAvatarChange,
    handleSave,
    voltar,
  }
}