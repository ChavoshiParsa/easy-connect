'use client';

import Input from '@/src/components/ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import DividerLine from '../ui/DividerLine';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useContextProvider } from '@/src/context/store';
import * as Yup from 'yup';

export default function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { data: session, status } = useSession();
  console.log(session, status);

  const { alert, setAlert } = useContextProvider();

  const handleCheckBox = (isChecked: boolean): void => {
    setIsChecked(isChecked);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Full name must be at least 3 characters long')
        .max(15, 'Must be 15 characters or less')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .test('no-spaces', 'Password cannot contain spaces', (value) => {
          return value === undefined || !value.includes(' ');
        })
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsVisible(true);
      if (!isChecked) return;
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      setAlert({
        status: 'pending',
        title: 'Please wait!',
        message: 'Data is sending...',
      });
      try {
        const response = await axios.post('/api/auth/signup', formData);
        const result = await signIn('credentials', {
          redirect: false,
          email: response.data.email,
          password: response.data.password,
        });
        setAlert({
          status: 'success',
          title: 'Success!',
          message: 'Sign up was successful',
        });
      } catch (error: any) {
        setAlert({
          status: 'error',
          title: 'Error!',
          message: error.response.data.message,
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
        Create your account
      </h1>
      <div className='flex w-full flex-col items-center justify-center'>
        <Input
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          label='Name'
        />
        {formik.touched.name && formik.errors.name && (
          <div className='-mt-1 mb-2.5 self-start pl-1.5 text-sm text-rose-500 md:-mt-4'>
            {formik.errors.name}
          </div>
        )}
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
      <AgreementForm handleCheckBox={handleCheckBox} />
      {!isChecked && isVisible && (
        <div className='-mt-3 mb-1 self-start pl-1.5 text-sm text-rose-500'>
          Please agree with Privacy Policy
        </div>
      )}
      <button
        className='link relative w-full rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600'
        type='submit'
        disabled={alert?.status === 'pending'}
      >
        {alert?.status !== 'pending' ? 'Sign Up' : 'Sending data...'}
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
        <p className='text-sm text-white'>or sign up with Google</p>
      </button>

      <p className='text-sm'>
        Already have an account?{' '}
        <Link
          className='font-bold text-indigo-500 hover:text-indigo-400'
          href='/signin'
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}

interface AgreementFormProps {
  handleCheckBox: (isChecked: boolean) => void;
}

const AgreementForm: React.FC<AgreementFormProps> = ({ handleCheckBox }) => {
  return (
    <div className='mb-3 mt-4 flex items-center justify-center self-start pl-1.5'>
      <input
        className='checkbox mr-2 h-3.5 w-3.5 appearance-none rounded-sm border border-white md:h-5 md:w-5'
        type='checkbox'
        onChange={(e) => handleCheckBox(e.target.checked)}
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
