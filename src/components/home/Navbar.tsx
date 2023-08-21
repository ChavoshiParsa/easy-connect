import { Roboto, Roboto_Condensed, Roboto_Flex } from 'next/font/google';
import Image from 'next/image';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '700',
});

export default function Navbar() {
  return (
    <div className='flex w-full flex-row items-center justify-start bg-[#292F3F] p-3'>
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
