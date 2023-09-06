'use client';

import { useContextProvider } from '@/src/context/store';
import Menu from './Menu';
import { useEffect } from 'react';

export default function MenuControl() {
  const { isMenuShow, setIsMenuShow } = useContextProvider();

  useEffect(() => {
    setIsMenuShow(false);
  }, []);

  let display = 'none';
  let transform = 'translateX(-100%)';
  if (isMenuShow) {
    display = 'block';
    transform = 'translateX(0)';
  }

  return (
    <>
      <div
        className='absolute z-20 h-full w-full bg-black opacity-60'
        style={{ display }}
        onClick={() => setIsMenuShow(!isMenuShow)}
      />
      <div
        className='absolute left-0 top-0 z-30 h-full w-3/4 bg-zinc-900 transition-transform duration-500 ease-out'
        style={{ transform }}
      >
        <Menu />
      </div>
    </>
  );
}
