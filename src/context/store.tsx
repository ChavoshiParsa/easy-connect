'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { date, string } from 'yup';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  isOnline: boolean;
  firstName: string;
  password: string;
  profileColor: string;
  profilePhoto: string | null;
  lastName: string | null;
  age: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ContextType {
  alert: AlertProps | null;
  setAlert: ({ status, title, message }: AlertProps) => void;
  isMenuShow: boolean | null;
  toggleIsMenuShow: () => void;
  setIsMenuShow: (value: boolean) => void;
  user: User | null;
  setUser: (user: User) => void;
}

const Context = createContext<ContextType>({
  alert: null,
  setAlert: ({ status, title, message }: AlertProps) => {},
  isMenuShow: null,
  toggleIsMenuShow: () => {},
  setIsMenuShow: (value: boolean) => {},
  user: null,
  setUser: (user: User) => {},
});

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isMenuShow, setIsMenuShow] = useState<boolean | null>(false);
  const [user, setUser] = useState<User | null>(null);

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
      value={{
        alert,
        setAlert,
        isMenuShow,
        toggleIsMenuShow,
        setIsMenuShow,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);
