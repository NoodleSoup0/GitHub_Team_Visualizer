import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Reviews from './pages/Reviews';
import Workload from './pages/Workload';
import Releases from './pages/Releases';


const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/workload" element={<Workload />} />
            <Route path="/releases" element={<Releases />} />
            
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
