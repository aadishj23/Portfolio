import { createContext, useContext, useState, ReactNode } from 'react';

interface BootContextType {
  bootingComplete: boolean;
  setBootingComplete: (complete: boolean) => void;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

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
  const [bootingComplete, setBootingComplete] = useState(false);

  return (
    <BootContext.Provider value={{ bootingComplete, setBootingComplete }}>
      {children}
    </BootContext.Provider>
  );
};
