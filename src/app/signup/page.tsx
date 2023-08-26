import SignUpForm from '@/src/components/login/SignUpForm';
import Image from 'next/image';
import shapes from '@/public/images/shapes-up.jpg';
import Logo from '&/logo/Logo';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/home');
  return (
    <>
      <main className='phone flex items-center justify-center md:relative md:h-screen'>
        <div className='signupimage absolute -z-10 h-full w-full opacity-40 blur-sm md:relative md:z-10 md:w-1/2 md:opacity-100 md:blur-none'>
          <Image
            style={{
              objectFit: 'cover',
            }}
            fill
            src={shapes}
            alt='geometry shapes'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
          />
        </div>
        <div className='absolute left-1.5 top-1 block md:hidden'>
          <Logo />
        </div>
        <div className='signupform relative h-full w-full px-2.5 sm:px-8 md:w-1/2 md:px-10 lg:px-16 xl:px-28'>
          <div className='absolute left-2 top-1.5 hidden md:block'>
            <Logo />
          </div>
          <SignUpForm />
        </div>
      </main>
    </>
  );
};
