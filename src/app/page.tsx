import Image from 'next/image';
import Link from 'next/link';
import galaxy from '@/public/images/galaxy.jpg';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/home');

  return (
    <main className='phone flex h-full flex-col items-center md:relative md:h-screen md:justify-center'>
      <div className='relative -z-10 mb-14 flex h-80 w-full md:absolute md:mb-0 md:h-full'>
        <Image
          style={{
            objectFit: 'cover',
          }}
          fill
          src={galaxy}
          alt='Picture of Galaxy'
          priority
          sizes='100vw'
          placeholder='blur'
        />
      </div>
      <div className='z-20 mx-6 flex flex-col items-start justify-center md:-mt-10 md:items-center'>
        <p className='mb-4 text-[34px] font-bold leading-tight md:mb-10 md:text-center md:text-5xl md:leading-snug'>
          Stay connected with your friends and family
        </p>
        <div className='mb-10 flex md:mb-48'>
          <Image
            className='mr-2 aspect-auto w-auto animate-bounce md:mr-4 md:w-6'
            src='/icons/shield.svg'
            alt='shield Logo'
            width={20}
            height={20}
            sizes='100vw'
            style={{
              width: '20px',
              height: 'auto',
            }}
          />
          <p className='animate-pulse font-semibold md:text-3xl'>
            Secure, private messaging
          </p>
        </div>

        <Link
          className='link relative w-full overflow-hidden rounded-full bg-white py-4 text-center font-bold text-black opacity-90 hover:opacity-75 focus:outline-none md:w-5/12'
          href='/signup'
        >
          Get Started
          <div className='animate-cPuls absolute bottom-0 top-0 bg-indigo-600 px-20 opacity-90 blur-3xl' />
        </Link>
      </div>
      <h1 className='absolute left-1.5 top-1.5 z-10 text-xs md:bottom-2 md:left-2 md:top-auto md:text-sm'>
        Creator: Parsa Chavoshi
      </h1>
    </main>
  );
}
