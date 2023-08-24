'use client';

import Link from 'next/link';
import { useState } from 'react';

import ChangeProfilePhoto from './ChangeProfilePhoto';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formik = useFormik({
    // server
    initialValues: {
      firstName: 'Parsa',
      lastName: '',
      age: '',
      username: 'Parsa5485',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'First Name must be at least 3 characters long')
        .max(15, 'Must be 15 characters or less')
        .required('First Name is required'),
      lastName: Yup.string()
        .min(3, 'Last Name must be at least 3 characters long')
        .max(15, 'Must be 15 characters or less'),
      age: Yup.number()
        .min(14, 'Age must be at least 14')
        .max(99, 'Age must be at most 99'),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          'Username must contain only letters and numbers'
        )
        .min(4, 'Username must be at least 4 characters long')
        .max(20, 'Must be 20 characters or less')
        .required('Username is required'),
    }),
    onSubmit: (values) => {
      setIsEditing(false);
      console.log('Form submitted:', values);
    },
  });

  return (
    <div className='m-2 flex h-full flex-col items-center justify-center rounded-xl bg-zinc-900 px-3 py-4 sm:mx-8 sm:my-8 sm:p-6 md:items-start md:p-8 lg:mx-40 lg:my-12 lg:p-10 xl:mx-52'>
      <h1 className='mb-4 text-4xl font-bold sm:text-5xl md:mb-8'>
        Profile Page
      </h1>
      <ChangeProfilePhoto
        firstName={formik.values.firstName}
        lastName={formik.values.lastName}
        size={120}
      />
      <form className='w-full' onSubmit={formik.handleSubmit}>
        <div className='mb-6 flex w-full flex-col items-center justify-center space-y-5 md:mb-12 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4 md:space-y-0'>
          <div className='relative flex w-full items-center justify-center'>
            <Input
              label='First Name'
              name='firstName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              editable={isEditing}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className='absolute -bottom-5 text-sm text-rose-500 '>
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div className='relative flex w-full items-center justify-center'>
            <Input
              label='Last Name'
              name='lastName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              editable={isEditing}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className='absolute -bottom-5 text-sm text-rose-500 '>
                {formik.errors.lastName}
              </p>
            )}
          </div>
          <div className='relative flex w-full items-center justify-center'>
            <Input
              label='Age'
              name='age'
              type='number'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.age}
              editable={isEditing}
            />
            {formik.touched.age && formik.errors.age && (
              <p className='absolute -bottom-5 text-sm text-rose-500 '>
                {formik.errors.age}
              </p>
            )}
          </div>
          <div className='relative flex w-full items-center justify-center'>
            <Input
              label='Username'
              name='username'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              editable={isEditing}
            />
            {formik.touched.username && formik.errors.username && (
              <p className='absolute -bottom-5 text-sm text-rose-500 '>
                {formik.errors.username}
              </p>
            )}
          </div>
        </div>
        <div className='flex w-full flex-row items-center justify-between'>
          {!isEditing ? (
            <>
              <Link
                className='link relative mr-3 w-full rounded-lg border border-indigo-500 py-2.5 text-center font-bold text-indigo-500 opacity-90 transition hover:bg-indigo-500 hover:text-slate-100 sm:w-40'
                href='/home'
              >
                Back
              </Link>
              <input
                className='link relative w-full cursor-pointer rounded-lg bg-indigo-700 py-2.5 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-40'
                onClick={() => {
                  setIsEditing(true);
                }}
                value='Edit Profile'
                type='button'
              />
            </>
          ) : (
            <>
              <button
                className='link relative ml-auto mr-3 w-full rounded-lg border border-rose-500 py-2.5 text-center font-bold text-rose-500 opacity-90 transition hover:bg-rose-500 hover:text-slate-100 sm:w-40'
                onClick={() => {
                  setIsEditing(false);
                  // initial value will back
                  formik.values.firstName = 'Parsa';
                  formik.values.lastName = '';
                  formik.values.age = '';
                  formik.values.username = 'Parsa5485';

                  formik.errors.firstName = '';
                  formik.errors.lastName = '';
                  formik.errors.age = '';
                  formik.errors.username = '';
                }}
              >
                Cancel
              </button>
              <button
                className='link relative w-full rounded-lg bg-indigo-700 py-2.5 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-40'
                type='submit'
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
