'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  ReactNode,
} from 'react';

interface BootContextType {
  bootingComplete: boolean;
  setBootingComplete: (complete: boolean) => void;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

// Persisted per tab session: survives refreshes and client-side navigation
// (e.g. visiting /experience/pw and coming back), but is cleared when the tab
// is closed — so the boot sequence plays once per tab, not on every load.
const BOOT_KEY = 'portfolio-booted';

// useLayoutEffect on the client (runs before paint -> no flash of the boot
// screen on an already-booted refresh), useEffect on the server (no-op).
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useBootContext = () => {
  const context = useContext(BootContext);
  if (context === undefined) {
    throw new Error('useBootContext must be used within a BootProvider');
  }
  return context;
};

interface BootProviderProps {
  children: ReactNode;
}

export const BootProvider = ({ children }: BootProviderProps) => {
  // Always start false so SSR and the first client render match (no hydration
  // mismatch); the layout effect below flips it before paint when appropriate.
  const [bootingComplete, setBootingCompleteState] = useState(false);

  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(BOOT_KEY) === '1') {
        setBootingCompleteState(true);
      }
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — fall back to playing
      // the boot sequence.
    }
  }, []);

  const setBootingComplete = useCallback((complete: boolean) => {
    setBootingCompleteState(complete);
    if (complete) {
      try {
        sessionStorage.setItem(BOOT_KEY, '1');
      } catch {
        // ignore persistence failures
      }
    }
  }, []);

  return (
    <BootContext.Provider value={{ bootingComplete, setBootingComplete }}>
      {children}
    </BootContext.Provider>
  );
};
