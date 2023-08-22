import HomeComponent from '@/src/components/home/Home';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const robot = Roboto({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Easy Connect',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${robot.className} relative flex`}>
      <section className='relative hidden h-screen w-full flex-col items-center justify-start overflow-hidden bg-black md:flex md:w-5/12'>
        <HomeComponent />
      </section>
      <div className='phone fixed bottom-0 top-0 w-full md:w-7/12'>
        {children}
      </div>
    </main>
  );
}
