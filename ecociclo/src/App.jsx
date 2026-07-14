import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './modules/dashboard/pages/Dashboard.jsx';
import { ColetorDashboard }  from './modules/dashboard/pages/ColetorDashboard.jsx';
import Login from './modules/auth/pages/login.jsx';
import CriarConta from './modules/auth/pages/CriarConta.jsx';
import ProfilePage from './modules/profile/pages/ProfilePage.jsx';
import AvaliarColetor from './modules/feedback/pages/Avaliarcoletor.jsx';
import RecuperarSenha from './modules/auth/pages/RecuperarSenha.jsx';
import NovoEndereco from './modules/profile/pages/NovoEndereco.jsx';
import EditarPerfil from './modules/profile/pages/EditarPerfil.jsx';
import AgendarDoacao from './modules/collections/pages/AgendarDoacao.jsx';
import MinhasAvaliacoes from './modules/feedback/pages/MinhasAvaliacoes.jsx';
import Recompensas from './modules/rewards/pages/Recompensas.jsx';
import MinhasDoacoes from './modules/collections/pages/MinhasDoacoes.jsx';
import Historico from './modules/collections/pages/Historico.jsx';
import DetalhesColeta from './modules/collections/pages/DetalhesColeta.jsx';
import VisualizarRota from './modules/maps/pages/VisualizarRota.jsx';
import MinhasRecompensas from './modules/rewards/pages/MinhasRecompensas.jsx'
import DetalhesRecompensa from './modules/rewards/pages/DetalhesRecompensa.jsx';
import MeusEnderecos from './modules/profile/pages/MeusEnderecos.jsx';
import GerenciarRecompensa from './modules/rewards/pages/GerenciarRecompensa.jsx';
import ValidarColetores from "./modules/auth/pages/ValidarColetores.jsx";
import ColetasDisponiveis from "./modules/collections/pages/ColetasDisponiveis.jsx";
import { AdminDashboard } from './modules/dashboard/pages/AdminDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-coletor" element={<ColetorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/avaliar-coletor" element={<AvaliarColetor />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/novo-endereco" element={<NovoEndereco />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/agendar-doacao" element={<AgendarDoacao />} />
        <Route path="/minhas-avaliacoes" element={<MinhasAvaliacoes />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/minhas-doacoes" element={<MinhasDoacoes />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/detalhes-coleta" element={<DetalhesColeta />} />
        <Route path="/visualizar-rota" element={<VisualizarRota />} />
        <Route path="/minhas-recompensas" element={<MinhasRecompensas />} />
        <Route path="/detalhes-recompensas" element={<DetalhesRecompensa />} />
        <Route path="/meus-enderecos" element={<MeusEnderecos />} />
        <Route path="/gerenciar-recompensa" element={<GerenciarRecompensa />} />
        <Route path="/validar-coletores" element={<ValidarColetores />} />
        <Route path="/coletas-disponiveis" element={<ColetasDisponiveis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;