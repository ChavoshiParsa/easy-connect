import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='relative flex w-screen flex-col items-center md:h-screen md:flex-row md:justify-center'>
      <div className='relative mb-10 flex h-80 w-full items-center justify-center overflow-hidden md:absolute md:mb-0 md:h-full'>
        <Image
          style={{
            objectFit: 'cover',
            // objectPosition: 'center',
          }}
          fill
          src={'/galaxy.jpg'}
          alt='Picture of Galaxy'
        />
      </div>
      <div className='z-10 mx-6 flex flex-col items-start justify-center md:-mt-10 md:items-center'>
        <p className='mb-4 text-[34px] font-bold leading-tight md:mb-10 md:text-5xl'>
          Stay connected with your friends and family
        </p>
        <div className='mb-12 flex md:mb-48'>
          <Image
            className='mr-2.5 animate-bounce md:w-6'
            src='/icons/shield.svg'
            alt='shield Logo'
            width={16}
            height={16}
          />
          <p className='animate-pulse font-semibold md:text-3xl'>
            Secure, private messaging
          </p>
        </div>
        <Link
          className='w-full rounded-full bg-white py-4 text-center font-bold text-black opacity-90 hover:opacity-75 md:w-5/12'
          href='/login'
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}

{
  /* 
  <div className='flex items-start'>
    <input className='mr-2 h-4 w-4' type='checkbox' />
    <p className='text-sm'>
        I agree to the Easy-Connect{' '}
      <a
        className='text-indigo-500'
        href='https://telegram.org/privacy'
        target='_blank'
        rel='noopener noreferrer'
      >
        Privacy Policy
      </a>
    </p>
  </div> 
  */
}
