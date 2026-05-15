import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './modules/dashboard/pages/Dashboard.jsx';
import Login from './modules/auth/pages/login.jsx';
import CriarConta from './modules/auth/pages/CriarConta.jsx';
import ProfilePage from './modules/profile/pages/ProfilePage.jsx';
import AvaliarColetor from './modules/feedback/pages/Avaliarcoletor.jsx';
import RecuperarSenha from './modules/auth/pages/RecuperarSenha.jsx';
import NovoEndereco from './modules/profile/pages/NovoEndereco.jsx';
import EditarPerfil from './modules/profile/pages/EditarPerfil.jsx';
import AgendarColeta from './modules/collections/pages/AgendarColeta.jsx';
import FinalizarColeta from './modules/collections/pages/FinalizarColeta.jsx';
import MinhasAvaliacoes from './modules/feedback/pages/MinhasAvaliacoes.jsx';
import Recompensas from './modules/rewards/pages/Recompensas.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/avaliar-coletor" element={<AvaliarColetor />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/novo-endereco" element={<NovoEndereco />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/agendar-coleta" element={<AgendarColeta />} />
        <Route path="/finalizar-coleta" element={<FinalizarColeta />} />
        <Route path="/minhas-avaliacoes" element={<MinhasAvaliacoes />} />
        <Route path="/recompensas" element={<Recompensas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;