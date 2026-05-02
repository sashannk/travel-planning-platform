import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/explore${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <PageTransition>
      <section className="hero-image relative flex min-h-screen items-center bg-cover bg-center px-4 py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/10" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-4xl text-center text-white"
        >
          <p className="mb-4 inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm font-black uppercase tracking-[0.28em] text-sky-100 backdrop-blur">
            Modern travel planning
          </p>
          <h1 className="font-serif text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl">
            Wander<span className="text-accent">Nest</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-medium text-sky-50 sm:text-2xl">
            Find your journey. Build your nest.
          </p>

          <form onSubmit={handleSubmit} className="glass-panel mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-3xl p-3 shadow-premium sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <Search className="text-primary" size={22} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search beaches, cities, mountain stays..."
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
              />
            </label>
            <button className="rounded-2xl bg-accent px-7 py-4 font-black text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-600">
              Search
            </button>
          </form>
        </motion.div>
      </section>
    </PageTransition>
  );
}
