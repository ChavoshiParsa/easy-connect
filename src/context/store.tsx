'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

export interface UserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  profileColor: string;
  profilePhoto: string | null;
  lastName: string | null;
  age: number | null;
}

interface ContextType {
  alert: AlertProps | null;
  setAlert: ({ status, title, message }: AlertProps) => void;
  isMenuShow: boolean | null;
  toggleIsMenuShow: () => void;
  setIsMenuShow: (value: boolean) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  photo: string | null;
  setPhoto: (photo: string | null) => void;
}

const Context = createContext<ContextType>({
  alert: null,
  setAlert: ({ status, title, message }: AlertProps) => {},
  isMenuShow: null,
  toggleIsMenuShow: () => {},
  setIsMenuShow: (value: boolean) => {},
  user: null,
  setUser: () => {},
  photo: null,
  setPhoto: () => {},
});

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isMenuShow, setIsMenuShow] = useState<boolean | null>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

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
        isMenuShow,
        user,
        photo,
        setAlert,
        setIsMenuShow,
        toggleIsMenuShow,
        setUser,
        setPhoto,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextProvider = () => useContext(Context);
