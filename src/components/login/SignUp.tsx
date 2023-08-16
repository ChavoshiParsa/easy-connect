import Input from '&/UI/Input';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className='flex flex-col items-center justify-center rounded-md bg-[#101010] p-3'>
      <Input type='email' name='email' label='Email' />
      <Input type='password' name='password' label='Password' />
      <div className='mb-4 ml-2 mt-10 flex items-center justify-start self-start'>
        <input
          className='checkbox mr-2 h-3.5 w-3.5 appearance-none rounded-sm border border-white'
          type='checkbox'
        />
        <p className='text-sm'>
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
      <hr className='my-6 w-full border-t border-[#303030]' />
      <button className='link relative mb-4 flex w-full items-center justify-center rounded-lg bg-zinc-800 py-3 hover:opacity-75'>
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
