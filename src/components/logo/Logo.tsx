import Image from 'next/image';
import logo from '#/app/favicon.ico';
import { Source_Code_Pro } from 'next/font/google';

const play = Source_Code_Pro({
  subsets: ['latin'],
  weight: '500',
});

export default function Logo() {
  return (
    <div className='flex items-center justify-between'>
      <div className='relative mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6'>
        <Image
          style={{
            objectFit: 'contain',
          }}
          fill
          src={logo}
          alt='logo of app'
        />
      </div>
      <h1
        className={
          'glow drop-shadow-3xl animate-pulse whitespace-nowrap text-base shadow-white md:text-xl ' +
          play.className
        }
      >
        Easy Connect
      </h1>
    </div>
  );
}
