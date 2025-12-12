import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ExplorerMode from './pages/ExplorerMode';
import { User } from 'lucide-react';

// Placeholders
const Wanderer = () => <div className="pt-24 text-center font-bold text-brand-dark">🗺️ Wanderer Mode Loading...</div>;
const Profile = () => <div className="pt-24 text-center font-bold text-brand-dark">👤 Profile Loading...</div>;

function TopNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Navigation Pill Styles
  const navItemClass = (path) => 
    `px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
      isActive(path) 
        ? 'bg-brand-dark text-brand-bg shadow-md' 
        : 'text-brand-dark hover:bg-brand-dark/10'
    }`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      {/* Glass Container */}
      <div className="flex justify-between items-center bg-white/30 backdrop-blur-md border border-white/40 rounded-full p-2 shadow-lg mx-auto max-w-md">
        
        {/* Nav Pills Center */}
        <nav className="flex space-x-1">
          <Link to="/" className={navItemClass('/')}>Explore</Link>
          <Link to="/wanderer" className={navItemClass('/wanderer')}>Wanderer</Link>
        </nav>

        {/* Profile Icon (Right) */}
        <Link to="/profile" className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition">
          <User size={20} />
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-bg text-brand-dark font-sans">
        <TopNav />
        <Routes>
          <Route path="/" element={<ExplorerMode />} />
          <Route path="/wanderer" element={<Wanderer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}