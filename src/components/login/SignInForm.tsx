'use client';

import Input from '@/src/components/UI/Input';
import Image from 'next/image';
import Link from 'next/link';
import DividerLine from '../UI/DividerLine';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContextProvider } from '@/src/context/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignInForm() {
  const { alert, setAlert } = useContextProvider();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Enter your email')
        .trim(),
      password: Yup.string().required('Enter your password').trim(),
    }),
    onSubmit: async (values) => {
      setAlert({
        status: 'pending',
        title: 'Please wait!',
        message: 'Data is sending...',
      });

      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!result?.error) {
        setAlert({
          status: 'success',
          title: 'Success!',
          message: 'Welcome back sir',
        });
        setTimeout(() => {
          router.push('/home');
        }, 500);
      } else {
        setAlert({
          status: 'error',
          title: 'Error!',
          message: result?.error,
        });
      }
    },
  });
  return (
    <form
      className='relative flex flex-col items-center justify-center'
      onSubmit={formik.handleSubmit}
    >
      <h1 className='text my-12 whitespace-nowrap text-2xl font-extrabold sm:text-3xl md:my-20 md:text-4xl'>
        Welcome back
      </h1>
      <div className='flex w-full flex-col items-center justify-center'>
        <Input
          name='email'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          label='Email'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='-mt-1 mb-2.5 self-start  pl-1.5 text-sm text-rose-500 md:-mt-4'>
            {formik.errors.email}
          </div>
        )}
        <Input
          name='password'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          label='Password'
        />
        {formik.touched.password && formik.errors.password && (
          <div className='-mt-1 self-start  pl-1.5 text-sm text-rose-500 md:-mt-4'>
            {formik.errors.password}
          </div>
        )}
      </div>
      <div className='mb-3 mt-7 flex w-full items-center justify-between px-1.5'>
        <RememberMe />
        <ForgetPassword />
      </div>
      <button
        className='link relative w-full rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600'
        type='submit'
        disabled={alert?.status === 'pending'}
      >
        {alert?.status !== 'pending' ? 'Sign In' : 'Sending data...'}
      </button>
      <DividerLine centralText='or' />
      <button className='link relative mb-3 flex w-full items-center justify-center rounded-lg bg-zinc-800 py-3.5 opacity-90 hover:opacity-75'>
        <Image
          className='mr-2 aspect-auto w-auto'
          src='/icons/google.svg'
          alt='google Logo'
          sizes='100vw'
          style={{
            width: '20px',
            height: 'auto',
          }}
          width={20}
          height={20}
        />
        <p className='text-sm text-white'>or sign in with Google</p>
      </button>

      <p className='text-sm'>
        Don't have an account?{' '}
        <Link
          className='font-bold text-indigo-500 hover:text-indigo-400'
          href='/signup'
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

const RememberMe = () => {
  return (
    <div className='flex items-center justify-center'>
      <input
        className='checkbox mr-2 h-3.5 w-3.5 appearance-none rounded-sm border border-white md:h-5 md:w-5'
        type='checkbox'
      />
      <p className='text-sm md:text-base'>Remember me</p>
    </div>
  );
};
const ForgetPassword = () => {
  return (
    <Link
      className='text-sm font-bold text-blue-600 hover:text-indigo-500 md:text-base'
      href='/'
    >
      Forget Password?
    </Link>
  );
};
