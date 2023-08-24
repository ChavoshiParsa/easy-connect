'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

interface ContextType {
  alert: AlertProps | null;
  setAlert: ({ status, title, message }: AlertProps) => void;
  isMenuShow: boolean | null;
  toggleIsMenuShow: () => void;
  setIsMenuShow: (value: boolean) => void;
}

const Context = createContext<ContextType>({
  alert: null,
  setAlert: ({ status, title, message }: AlertProps) => {},
  isMenuShow: null,
  toggleIsMenuShow: () => {},
  setIsMenuShow: (value: boolean) => {},
});

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isMenuShow, setIsMenuShow] = useState<boolean | null>(false);

  const toggleIsMenuShow = () => {
    setIsMenuShow((prev) => !prev);
  };

  useEffect(() => {
    if (alert && alert.status !== 'pending') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  return (
    <Context.Provider
      value={{ alert, setAlert, isMenuShow, toggleIsMenuShow, setIsMenuShow }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);
