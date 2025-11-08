/**
 * Main App component with routing and theme initialization
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLumenStore } from './lib/store';
import { initTheme } from './lib/themeSwitch';
import { useDemoMode } from './hooks/useDemoMode';
import Layout from './components/Layout';
import Home from './pages/Home';
import HomeCinematic from './pages/HomeCinematic';
import Chat from './pages/Chat';
import Actions from './pages/Actions';
import Memory from './pages/Memory';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import CinematicDemo from './pages/CinematicDemo';
import './styles/tailwind.css';

function App() {
  const { theme, loadFromStorage } = useLumenStore();

  // Initialize theme and load data from storage
  useEffect(() => {
    loadFromStorage();
    initTheme(theme);
  }, []);

  // Apply theme changes
  useEffect(() => {
    initTheme(theme);
  }, [theme]);

  // Demo mode hook
  useDemoMode();

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Cinematic demo route (no layout) */}
          <Route path="/demo/cinematic" element={<CinematicDemo />} />

          {/* Main app routes with layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home-cinematic" element={<HomeCinematic />} />
            <Route path="chat" element={<Chat />} />
            <Route path="actions" element={<Actions />} />
            <Route path="memory" element={<Memory />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
