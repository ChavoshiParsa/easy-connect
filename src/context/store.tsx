'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

interface AlertContextType {
  alert: AlertProps | null;
  setAlert: ({ status, title, message }: AlertProps) => void;
}

const AlertContext = createContext<AlertContextType>({
  alert: null,
  setAlert: ({ status, title, message }: AlertProps) => {},
});

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  useEffect(() => {
    if (alert && alert.status !== 'pending') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useContextProvider = () => useContext(AlertContext);
