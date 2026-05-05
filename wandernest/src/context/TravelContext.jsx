import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TravelContext = createContext(null);

const prefersDarkMode = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

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

  // Read from 'theme' key so it stays in sync with App.jsx initialization
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    // Fall back to OS preference if no saved value
    return prefersDarkMode();
  });

  useEffect(() => {
    localStorage.setItem('wandernest-itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    // Apply dark class to <html> so Tailwind dark: classes work globally
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Save under 'theme' key so App.jsx reads the same preference on initial load
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
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
    setItinerary((current) =>
      current.map((item) => (item.id === id ? { ...item, day } : item))
    );
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
    [itinerary, isDarkMode]
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
