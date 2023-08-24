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
      lastName: 'Chavoshi',
      age: '18',
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
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          'Username must contain only letters and numbers'
        )
        .min(4, 'Username must be at least 3 characters long')
        .required('Username is required'),
    }),
    onSubmit: (values) => {
      setIsEditing(false);
      console.log('Form submitted:', values);
    },
  });

  return (
    <div className='m-2 flex h-full flex-col items-center justify-center rounded-xl bg-zinc-900 px-3 py-4 sm:mx-8 sm:my-8 sm:p-6 md:items-start md:p-8 lg:mx-40 lg:my-12 lg:p-10 xl:mx-52'>
      <h1 className='mb-4 text-4xl font-bold md:mb-8'>Profile Page</h1>
      <ChangeProfilePhoto
        firstName={formik.values.firstName}
        lastName={formik.values.lastName}
        size={120}
      />
      <form className='' onSubmit={formik.handleSubmit}>
        <div className='mb-4 flex w-full flex-col items-center justify-center space-y-3 md:mb-12 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4 md:space-y-0'>
          <Input
            label='First Name'
            name='firstName'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            editable={isEditing}
          />
          <Input
            label='Last Name'
            name='lastName'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            editable={isEditing}
          />
          <Input
            label='Age'
            name='age'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.age}
            editable={isEditing}
          />
          <Input
            label='Username'
            name='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            editable={isEditing}
          />
        </div>
        <div className='flex w-full flex-row items-center justify-between'>
          {!isEditing ? (
            <>
              <Link
                className='link relative mr-3 w-full rounded-lg border border-indigo-500 py-3 text-center font-bold text-indigo-500 opacity-90 transition hover:bg-indigo-500 hover:text-slate-100 sm:w-40'
                href='/home'
              >
                Back
              </Link>
              <input
                className='link relative w-full cursor-pointer rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-48'
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
                className='link relative ml-auto mr-3 w-full rounded-lg border border-rose-500 py-3 text-center font-bold text-rose-500 opacity-90 transition hover:bg-rose-500 hover:text-slate-100 sm:w-40'
                onClick={() => {
                  setIsEditing(false);
                  // initial value will back
                  formik.values.firstName = 'Parsa';
                  formik.values.lastName = 'Chavoshi';
                  formik.values.age = '18';
                  formik.values.username = 'Parsa5485';
                }}
              >
                Cancel
              </button>
              <button
                className='link relative w-full rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-48'
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
