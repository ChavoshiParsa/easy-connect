'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

export interface UserData {
  email: string;
  username: string;
  firstName: string;
  profileColor: string;
  profilePhoto: string | null;
  lastName: string | null;
  age: number | null;
  isOnline: boolean;
}

interface ContextType {
  alert: AlertProps | null;
  setAlert: ({ status, title, message }: AlertProps) => void;
  isMenuShow: boolean | null;
  setIsMenuShow: (value: boolean) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

const Context = createContext<ContextType>({
  alert: null,
  setAlert: ({ status, title, message }: AlertProps) => {},
  isMenuShow: null,
  setIsMenuShow: (value: boolean) => {},
  user: null,
  setUser: (value: UserData | null) => {},
});

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isMenuShow, setIsMenuShow] = useState<boolean | null>(false);
  const [user, setUser] = useState<UserData | null>(null);

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
