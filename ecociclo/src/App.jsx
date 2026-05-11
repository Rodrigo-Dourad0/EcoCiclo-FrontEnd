import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './modules/dashboard/pages/Dashboard.jsx';
import Login from './modules/auth/pages/login.jsx';
import CriarConta from './modules/auth/pages/CriarConta.jsx';
import ProfilePage from './modules/profile/pages/ProfilePage.jsx';
import AvaliarColetor from './modules/feedback/pages/Avaliarcoletor.jsx';
import RecuperarSenha from './modules/auth/pages/RecuperarSenha.jsx';
import NovoEndereco from './modules/profile/pages/NovoEndereco.jsx'; //
import AgendarColeta from './modules/collections/pages/AgendarColeta.jsx';
import FinalizarColeta from './modules/collections/pages/FinalizarColeta.jsx'
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
        <Route path="/agendar-coleta" element={<AgendarColeta />} />
        <Route path="/finalizar-coleta" element={<FinalizarColeta />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;