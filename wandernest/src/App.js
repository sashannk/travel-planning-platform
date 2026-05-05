import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { TravelProvider } from './context/TravelContext';
import Budget from './pages/Budget';
import Explore from './pages/Explore';
import Home from './pages/Home';
import MyNest from './pages/MyNest';

function App() {
  // Apply saved dark mode preference to <html> on initial load
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <TravelProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* dark: classes work because TravelContext toggles class on <html> */}
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/my-nest" element={<MyNest />} />
              <Route path="/budget" element={<Budget />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </BrowserRouter>
    </TravelProvider>
  );
}

export default App;