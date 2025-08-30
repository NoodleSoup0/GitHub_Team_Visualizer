import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RepoProvider } from "./components/RepoContext";
import Releases from "./pages/Releases";
import Reviews from "./pages/Reviews";
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import './App.css';

export default function App() {
  return (
    <RepoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/team" element={<Team />} />
          <Route path="/releases" element={<Releases />} />
        </Routes>
      </Router>
    </RepoProvider>
  );
}
