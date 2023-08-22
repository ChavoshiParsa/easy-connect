import HomeComponent from '@/src/components/home/HomeComponent';
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
    <html lang='en'>
      <body className={`${robot.className} relative flex`}>
        <main className='relative hidden h-screen w-full flex-col items-center justify-start overflow-hidden bg-black md:flex md:w-5/12'>
          <HomeComponent />
        </main>
        <div className='h-screen w-full md:w-7/12'>{children}</div>
      </body>
    </html>
  );
}
