import SignInForm from '@/src/components/login/SignInForm';
import Image from 'next/image';
import shapes from '@/public/images/shapes-in.jpg';
import Logo from '&/logo/Logo';

export default () => {
  return (
    <main className='relative flex h-screen w-screen flex-row-reverse items-center justify-center'>
      <div className='absolute -z-10 h-full w-full opacity-30 blur-sm md:relative md:w-1/2'>
        <Image
          style={{
            objectFit: 'cover',
          }}
          fill
          src={shapes}
          alt='geometry shapes'
        />
      </div>
      <div className='absolute left-1.5 top-1 block md:hidden'>
        <Logo />
      </div>
      <div className='relative h-full w-full px-2.5 sm:px-8 md:w-1/2 md:px-10 lg:px-16 xl:px-28'>
        <div className='absolute left-2 top-1.5 hidden md:block'>
          <Logo />
        </div>
        <SignInForm />
      </div>
    </main>
  );
};
