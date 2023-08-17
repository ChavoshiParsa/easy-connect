import Input from '&/UI/Input';
import { Saira } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const play = Saira({
  subsets: ['latin'],
  weight: '400',
});

export default function SignUp() {
  return (
    <div className='relative flex flex-col items-center justify-center rounded-md bg-[#101010c5] px-4 py-8 md:mx-4 md:bg-transparent md:p-0'>
      <h1
        className={
          'glow drop-shadow-3xl mb-16 animate-pulse text-5xl shadow-white md:mx-5 md:mb-16 lg:mx-2 lg:text-6xl xl:mx-6 xl:text-7xl ' +
          play.className
        }
      >
        Easy Connect
      </h1>
      <Input type='email' name='email' label='Email' />
      <Input type='password' name='password' label='Password' />
      <div className='mb-4 ml-2 mt-10 flex items-center justify-start self-start md:mt-8'>
        <input
          className='checkbox mr-2 h-3.5 w-3.5 appearance-none rounded-sm border border-white md:h-5 md:w-5'
          type='checkbox'
        />
        <p className='text-sm md:text-base'>
          I agree to the{' '}
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
      <button className='link relative w-full rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 hover:opacity-75'>
        Sign Up
      </button>
      <hr className='my-6 w-full border-t border-[#303030] md:my-8' />
      <button className='link relative mb-4 flex w-full items-center justify-center rounded-lg bg-zinc-800 py-3.5 hover:opacity-75'>
        <Image
          className='mr-2'
          src='/icons/google.svg'
          alt='shield Logo'
          width={20}
          height={20}
        />
        <p className='text-sm text-white'>Or sign up with Google</p>
      </button>

      <p className='ml-1.5 self-start text-sm'>
        Already have an account?{' '}
        <Link className='font-bold text-indigo-500' href='/login'>
          Login
        </Link>
      </p>
    </div>
  );
}
