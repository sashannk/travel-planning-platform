import { Trash2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useTravel } from '../context/TravelContext';

export default function MyNest() {
  const { itinerary, removeDestination, updateDestinationDay } = useTravel();
  const days = [1, 2];

  return (
    <PageTransition>
      <section className="min-h-screen bg-dark px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-primary">My Nest</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl">
              Saved <span className="text-accent">itinerary</span>
            </h1>
          </div>

          {itinerary.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-primary/40 bg-slate-900 p-12 text-center shadow-2xl shadow-black/20">
              <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent" />
              <h2 className="font-serif text-3xl font-black text-white">No destinations saved yet.</h2>
              <p className="mt-3 text-lg font-semibold text-slate-300">Add places from Explore and they will appear here by day.</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {days.map((day) => (
                <div key={day} className="rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/20">
                  <h2 className="mb-5 font-serif text-3xl font-black text-white">Day {day}</h2>
                  <div className="space-y-4">
                    {itinerary
                      .filter((item) => item.day === day)
                      .map((item) => (
                        <article key={item.id} className="flex gap-4 rounded-2xl border border-white/10 bg-dark p-3 shadow-sm">
                          <img src={item.image} alt={item.title} className="h-24 w-24 rounded-2xl object-cover" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-black text-white">{item.title}</h3>
                            <p className="text-sm font-semibold text-accent">{item.location}</p>
                            <select
                              value={item.day}
                              onChange={(event) => updateDestinationDay(item.id, Number(event.target.value))}
                              className="mt-3 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm font-bold text-slate-100"
                            >
                              <option value={1}>Day 1</option>
                              <option value={2}>Day 2</option>
                            </select>
                          </div>
                          <button
                            aria-label={`Remove ${item.title}`}
                            onClick={() => removeDestination(item.id)}
                            className="h-10 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-accent"
                          >
                            <Trash2 size={18} />
                          </button>
                        </article>
                      ))}
                    {itinerary.filter((item) => item.day === day).length === 0 && (
                      <p className="rounded-2xl border border-white/10 bg-dark p-5 text-sm font-semibold text-slate-400">
                        Move a saved destination here when this day is ready.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
