import { useEffect, useState } from "react";
import { api } from "/src/shared/services/api.js";
import { supabase } from "/src/shared/services/supabase.js";
import { useAuth } from "/src/context/AuthContext.jsx";
import { toast } from "react-hot-toast"; 

function formatarEndereco(endereco) {
  if (!endereco) return null;

  if (typeof endereco === "string") {
    const texto = endereco.trim();
    return texto ? { id: "", logradouro: texto, bairro: "", cidade: "", completo: texto } : null;
  }

  const logradouro = endereco.logradouro || endereco.rua || "";
  const bairro = endereco.bairro || "";
  const cidade = endereco.cidade || endereco.municipio || "";
  const completo =
    endereco.completo ||
    endereco.enderecoCompleto ||
    endereco.endereco_completo ||
    [logradouro, endereco.numero, endereco.complemento, bairro, cidade, endereco.estado, endereco.cep]
      .filter(Boolean)
      .join(" - ");

  return {
    id: endereco.id || "",
    logradouro,
    bairro,
    cidade,
    completo,
  };
}

function extrairEnderecos(usuario) {
  if (!usuario) return [];

  const candidatos = [];

  if (Array.isArray(usuario.enderecos)) candidatos.push(...usuario.enderecos);
  if (Array.isArray(usuario.listaEnderecos)) candidatos.push(...usuario.listaEnderecos);
  if (Array.isArray(usuario.addresses)) candidatos.push(...usuario.addresses);

  if (usuario.endereco) candidatos.push(usuario.endereco);
  if (usuario.enderecoEntrega) candidatos.push(usuario.enderecoEntrega);
  if (usuario.enderecoPrincipal) candidatos.push(usuario.enderecoPrincipal);

  const unicos = new Map();

  candidatos.forEach((item, index) => {
    const normalizado = formatarEndereco(item);
    if (!normalizado) return;

    const chave = normalizado.id || `${normalizado.logradouro}-${normalizado.bairro}-${normalizado.cidade}-${index}`;
    if (!unicos.has(chave)) {
      unicos.set(chave, normalizado);
    }
  });

  return Array.from(unicos.values());
}

export default function useAgendarDoacao() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    tipoMaterial: "",
    pesoEstimado: "",
    data: "",
    horario: "",
    endereco: "",
    observacoes: "",
  });

  const [erros, setErros] = useState({});
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enderecos, setEnderecos] = useState([]);

  const tiposMaterial = ["Papel e Papelao", "Plastico", "Vidro", "Metal", "Eletronicos", "Organico"];

  useEffect(() => {
    async function carregarEnderecosDoUsuario() {
      if (!user?.id) {
        setEnderecos([]);
        return;
      }

      try {
        const rotas = ["/api/usuarios/me", `/api/usuarios/${user.id}`];
        let usuario = null;

        for (const rota of rotas) {
          try {
            const response = await api.get(rota);
            if (response.data) {
              usuario = response.data;
              break;
            }
          } catch {
            // tenta a proxima rota
          }
        }

        setEnderecos(extrairEnderecos(usuario || user));
      } catch (error) {
        console.error("Erro ao carregar enderecos reais do backend:", error);
        setEnderecos([]);
      }
    }

    carregarEnderecosDoUsuario();
  }, [user]);

  const validarCampo = (campo, value) => {
    switch (campo) {
      case "tipoMaterial":
        return value ? "" : "Selecione o tipo de material.";
      case "pesoEstimado":
        if (!value) return "Informe o peso estimado.";
        if (Number(value) <= 0) return "O peso deve ser maior que zero.";
        return "";
      case "data": {
        if (!value) return "Informe a data da coleta.";
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(value)) return "Digite uma data valida (dd/mm/aaaa).";
        return "";
      }
      case "horario": {
        if (!value) return "Informe o horario da coleta.";
        const regex = /^\d{2}:\d{2}$/;
        if (!regex.test(value)) return "Digite um horario valido (hh:mm).";
        return "";
      }
      case "endereco":
        return value ? "" : "Selecione o endereco de coleta.";
      default:
        return "";
    }
  };

  function handleChange(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");

    if (campo === "data") {
      let v = value.replace(/\D/g, "");
      if (v.length <= 4) {
        v = v.replace(/(\d{2})(\d{0,2})/, "$1/$2");
      } else {
        v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
      }
      setForm((prev) => ({ ...prev, data: v }));
      if (erros.data && v.length === 10) {
        setErros((prev) => ({ ...prev, data: "" }));
      }
      return;
    }

    if (campo === "horario") {
      let v = value.replace(/\D/g, "");
      v = v.replace(/(\d{2})(\d{0,2})/, "$1:$2");
      setForm((prev) => ({ ...prev, horario: v }));
      if (erros.horario && v.length === 5) {
        setErros((prev) => ({ ...prev, horario: "" }));
      }
      return;
    }

    setForm((prev) => ({ ...prev, [campo]: value }));
    if (erros[campo]) {
      setErros((prev) => ({ ...prev, [campo]: validarCampo(campo, value) }));
    }
  }

  function handleBlur(e) {
    const { id, value } = e.target;
    const campo = id.replace(/2$/, "");
    if (campo === "observacoes") return;
    const erro = validarCampo(campo, value);
    setErros((prev) => ({ ...prev, [campo]: erro }));
  }

  function handleFotosChange({ target }) {
    const novos = Array.from(target.files || target);
    setFotos((prev) => [...prev, ...novos].slice(0, 5));
  }

  function handleRemoverFoto(index) {
    setFotos((prev) => prev.filter((_, i) => i !== index));
  }

  function validar() {
    const campos = ["tipoMaterial", "pesoEstimado", "data", "horario", "endereco"];
    const novosErros = {};

    campos.forEach((campo) => {
      const erro = validarCampo(campo, form[campo]);
      if (erro) novosErros[campo] = erro;
    });

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit() {
    if (!validar()) return;
    if (!user?.id) {
      toast.error("Voce precisa estar logado para agendar uma doacao.");
      return;
    }

    setLoading(true);
    try {
      let urlImagemSalva = null;
      if (fotos.length > 0) {
        const imagemFisica = fotos[0];
        const fileExt = imagemFisica.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("doacoes").upload(fileName, imagemFisica);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from("doacoes").getPublicUrl(fileName);
        urlImagemSalva = publicUrlData.publicUrl;
      }

      const [dia, mes, ano] = form.data.split("/");
      const dataColetaFormatada = `${ano}-${mes}-${dia}T${form.horario}:00`;

      const payload = {
        doadorId: user.id,
        enderecoId: form.endereco,
        dataColeta: dataColetaFormatada,
        observacoes: form.observacoes,
        doacao: {
          nome: form.tipoMaterial,
          quantidade: 1,
          imagem: urlImagemSalva,
          peso: parseFloat(form.pesoEstimado),
        },
      };

      await api.post("/api/agendamentos", payload);
      toast.success("Coleta agendada com sucesso!");

      setForm({
        tipoMaterial: "",
        pesoEstimado: "",
        data: "",
        horario: "",
        endereco: "",
        observacoes: "",
      });
      setFotos([]);
    } catch (error) {
      console.error("Erro ao agendar:", error);
      toast.error("Ocorreu um erro ao agendar a doacao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    erros,
    fotos,
    loading,
    tiposMaterial,
    enderecos,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFotosChange,
    handleRemoverFoto,
  };
}
