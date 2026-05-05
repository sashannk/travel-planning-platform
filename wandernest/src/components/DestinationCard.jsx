import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DestinationCard({ destination, onAdd, isSaved }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl shadow-black/20"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-accent">{destination.location}</p>
          <h3 className="mt-2 text-xl font-black text-white">{destination.title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onAdd(destination)}
          disabled={isSaved}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-bold text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5 hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
        >
          <Plus size={18} />
          {isSaved ? 'Added to My Nest' : 'Add to itinerary'}
        </button>
      </div>
    </motion.article>
  );
}
