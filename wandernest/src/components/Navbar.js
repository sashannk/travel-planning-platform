import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTravel } from '../context/TravelContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/my-nest', label: 'My Nest' },
  { to: '/budget', label: 'Budget' },
];

function linkClass({ isActive }) {
  return `rounded-full px-4 py-2 text-sm font-bold transition hover:bg-white/10 hover:text-white ${
    isActive ? 'bg-accent text-white shadow-lg shadow-orange-500/20' : 'text-slate-300'
  }`;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTravel();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/95 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-black shadow-lg shadow-sky-500/20">
            WN
          </span>
          WanderNest
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-white"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            aria-label="Open mobile menu"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 shadow-sm md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-dark px-4 pb-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 pt-3">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
