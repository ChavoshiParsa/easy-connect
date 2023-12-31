import SignInForm from '@/src/components/login/SignInForm';
import Image from 'next/image';
import shapes from '@/public/images/shapes-in.jpg';
import Logo from '&/logo/Logo';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/home');

  return (
    <main className='phone flex w-full flex-row-reverse items-center justify-center md:relative md:h-screen'>
      <div className='signinimage absolute -z-10 h-full w-full opacity-40 blur-sm transition md:relative md:z-10 md:w-1/2 md:opacity-100 md:blur-none'>
        <Image
          style={{
            objectFit: 'cover',
          }}
          fill
          src={shapes}
          alt='geometry shapes'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
          placeholder='blur'
        />
      </div>
      <div className='absolute left-1.5 top-1 block md:hidden'>
        <Logo />
      </div>
      <div className='signinform relative h-full w-full px-2.5 sm:px-8 md:w-1/2 md:px-10 lg:px-16 xl:px-28'>
        <div className='absolute left-2 top-1.5 hidden md:block'>
          <Logo />
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
