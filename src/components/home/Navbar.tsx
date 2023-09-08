'use client';

import { Roboto_Flex } from 'next/font/google';
import { useContextProvider } from '@/src/context/store';
import Link from 'next/link';
import Image from 'next/image';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '700',
});

export default function Navbar() {
  const { setIsMenuShow } = useContextProvider();

  return (
    <div className='sticky top-0 z-10 flex w-full flex-row items-center justify-start bg-[#3e4b6d69] p-3 opacity-100 blur-0 backdrop-blur-lg'>
      <div
        className='link mr-5 cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        onClick={() => setIsMenuShow(true)}
      >
        <CustomIcon size='24px' name='hamburger' />
      </div>
      <h1 className={`${roboto.className} text-xl`}>Easy Connect</h1>
      <Link
        className='link ml-auto cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        href='/search'
      >
        <CustomIcon size='24px' name='magnifier' />
      </Link>
    </div>
  );
}

const CustomIcon = (props: { name: string; size: string }) => {
  return (
    <Image
      src={`/icons/${props.name}.svg`}
      alt={`${props.name} icon`}
      width={20}
      height={20}
      sizes='100vw'
      style={{
        width: props.size,
        height: 'auto',
      }}
    />
  );
};
