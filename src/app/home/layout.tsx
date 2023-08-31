import Home from '@/src/components/home/Home';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import wallpaperLaptop from '@/public/images/wallpaper4.jpg';

const robot = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Easy Connect',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${robot.className} phone flex md:relative md:h-screen`}>
      <section className='relative hidden h-full w-full flex-col items-center justify-start overflow-hidden bg-black md:flex md:w-6/12 lg:w-5/12'>
        <Home />
      </section>
      <div className='h-full w-full md:w-6/12 lg:w-7/12'>
        <Image
          className='-z-20 hidden brightness-[.2] sm:block '
          style={{
            objectFit: 'cover',
          }}
          fill
          src={wallpaperLaptop}
          alt='beautiful bridge'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        {children}
      </div>
    </main>
  );
}
