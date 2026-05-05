import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import PageTransition from '../components/PageTransition';
import Spinner from '../components/Spinner';
import { useTravel } from '../context/TravelContext';
import { fetchTravelImages } from '../services/unsplashService';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { itinerary, addDestination } = useTravel();
  const query = searchParams.get('q') || 'travel destination';

  useEffect(() => {
    let isMounted = true;

    async function loadDestinations() {
      setIsLoading(true);
      setError('');

      try {
        const results = await fetchTravelImages(query);
        if (isMounted) {
          setDestinations(results);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong while loading destinations.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDestinations();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <PageTransition>
      <section className="min-h-screen bg-dark px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-black uppercase tracking-[0.32em] text-primary">Explore</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none tracking-tight text-white sm:text-6xl">
              Curated <span className="text-accent">places</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-slate-300">
              Travel imagery is loaded from Unsplash when an API key is present, with polished fallback picks for local development.
            </p>
          </motion.div>

          {isLoading && <Spinner />}

          {error && (
            <div className="rounded-[28px] border border-accent/30 bg-accent/10 p-5 font-semibold text-orange-100">
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onAdd={addDestination}
                  isSaved={itinerary.some((item) => item.id === destination.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
