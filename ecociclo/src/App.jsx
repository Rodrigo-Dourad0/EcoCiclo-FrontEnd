import './App.css';
import { Navigation } from './shared/components/Navigation/Navigation';
import { Dashboard } from './modules/dashboard/pages/Dashboard';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <Dashboard />
    </div>
  );
}

export default App;
