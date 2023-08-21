import { Roboto_Flex } from 'next/font/google';
import Image from 'next/image';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '700',
});

export default function Navbar() {
  return (
    <div className='sticky top-0 z-10 flex w-full flex-row items-center justify-start bg-[#3e4b6d69] p-3 opacity-100 blur-0 backdrop-blur-lg'>
      <Image
        className='mr-8'
        src='/icons/open-menu.svg'
        alt='hamburger icon'
        width={20}
        height={20}
        sizes='100vw'
        style={{
          width: '22px',
          height: 'auto',
        }}
      />
      <h1 className={`${roboto.className} text-xl `}>Easy Connect</h1>
      <Image
        className='ml-auto'
        src='/icons/magnifier.svg'
        alt='magnifier icon'
        width={20}
        height={20}
        sizes='100vw'
        style={{
          width: '22px',
          height: 'auto',
        }}
      />
    </div>
  );
}
