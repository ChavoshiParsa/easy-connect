'use client';

import { useContextProvider } from '@/src/context/store';
import Menu from './Menu';

export default function MenuControl() {
  const { isMenuShow, toggleIsMenuShow } = useContextProvider();

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

// profile --> changing profile: name,photo,age...
// new message --> pencil icon
// account --> signing out, deleting account,
// setting --> light mode, dark mode, wallpaper
// send feedback --> direct to my pv
