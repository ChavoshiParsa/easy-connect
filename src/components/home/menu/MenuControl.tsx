'use client';

import { UserData, useContextProvider } from '@/src/context/store';
import Menu from './Menu';
import { useEffect } from 'react';

export default function MenuControl({ userData }: { userData: UserData }) {
  const { isMenuShow, toggleIsMenuShow, setIsMenuShow, setUser } =
    useContextProvider();

  useEffect(() => {
    setUser(userData);
    setIsMenuShow(false);
  }, []);

  return (
    <>
      {isMenuShow && (
        <>
          <div
            className='absolute z-20 h-full w-full bg-black opacity-60'
            onClick={toggleIsMenuShow}
          />
          <div className='absolute left-0 top-0 z-30 h-full w-3/4 bg-zinc-900'>
            <Menu />
          </div>
        </>
      )}
    </>
  );
}
