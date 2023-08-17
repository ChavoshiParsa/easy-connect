import Input from '@/src/components/ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import DividerLine from '../ui/DividerLine';

export default function SignUpForm() {
  return (
    <div className='relative flex flex-col items-center justify-center'>
      <h1 className='text my-12 whitespace-nowrap text-2xl font-extrabold sm:text-3xl md:my-20 md:text-4xl'>
        Create your account
      </h1>
      <div className='flex w-full flex-col items-center justify-center space-y-2 md:space-y-5'>
        <Input type='text' name='name' label='Name' />
        <Input type='text' name='email' label='Email' />
        <Input type='password' name='password' label='Password' />
      </div>
      <AgreementForm />
      <button className='link relative w-full rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 hover:opacity-75'>
        Sign Up
      </button>
      <DividerLine centralText='or' />
      <button className='link relative mb-3 flex w-full items-center justify-center rounded-lg bg-zinc-800 py-3.5 opacity-90 hover:opacity-75'>
        <Image
          className='mr-2'
          src='/icons/google.svg'
          alt='google Logo'
          width={20}
          height={20}
        />
        <p className='text-sm text-white'>or sign up with Google</p>
      </button>

      <p className='text-sm'>
        Already have an account?{' '}
        <Link className='font-bold text-indigo-500' href='/signin'>
          Sign In
        </Link>
      </p>
    </div>
  );
}

const AgreementForm = () => {
  return (
    <div className='mb-3 mt-7 flex items-center justify-center self-start pl-1.5'>
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
  );
};
