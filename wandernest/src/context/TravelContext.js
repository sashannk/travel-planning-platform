import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TravelContext = createContext(null);

const loadStoredValue = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function TravelProvider({ children }) {
  const [itinerary, setItinerary] = useState(() => loadStoredValue('wandernest-itinerary', []));
  const [isDarkMode, setIsDarkMode] = useState(() => loadStoredValue('wandernest-dark-mode', false));

  useEffect(() => {
    localStorage.setItem('wandernest-itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem('wandernest-dark-mode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const addDestination = (destination) => {
    setItinerary((current) => {
      if (current.some((item) => item.id === destination.id)) {
        return current;
      }

      return [
        ...current,
        {
          ...destination,
          day: current.length % 2 === 0 ? 1 : 2,
          savedAt: Date.now(),
        },
      ];
    });
  };

  const removeDestination = (id) => {
    setItinerary((current) => current.filter((item) => item.id !== id));
  };

  const updateDestinationDay = (id, day) => {
    setItinerary((current) => current.map((item) => (item.id === id ? { ...item, day } : item)));
  };

  const value = useMemo(
    () => ({
      itinerary,
      isDarkMode,
      addDestination,
      removeDestination,
      updateDestinationDay,
      toggleDarkMode: () => setIsDarkMode((current) => !current),
    }),
    [itinerary, isDarkMode],
  );

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}

export function useTravel() {
  const context = useContext(TravelContext);

  if (!context) {
    throw new Error('useTravel must be used inside TravelProvider');
  }

  return context;
}
