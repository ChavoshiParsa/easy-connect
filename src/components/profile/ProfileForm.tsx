import Link from 'next/link';
import { useEffect, useState } from 'react';
import ChangeProfilePhoto from './ChangeProfilePhoto';
import Input from './Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserData, useContextProvider } from '@/src/context/store';
import axios from 'axios';

export default function ProfileForm({ userData }: { userData: UserData }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [enteredUsername, setEnteredUsername] = useState<string>(
    userData.username
  );
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(true);
  const [usernameIsTouched, setUsernameIsTouched] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameLoading, setUsernameLoading] = useState<boolean>(false);

  const { alert, setAlert } = useContextProvider();

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName,
      lastName: userData.lastName || undefined,
      age: userData.age || undefined,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Must be at least 3 characters long')
        .max(15, 'Must be 15 characters or less')
        .required('First name is required')
        .trim(),
      lastName: Yup.string()
        .min(3, 'Must be at least 3 characters long')
        .max(15, 'Must be 15 characters or less')
        .trim(),
      age: Yup.number()
        .min(14, 'Age must be at least 14')
        .max(99, 'Age must be at most 99'),
    }),
    onSubmit: async (values) => {
      if (!usernameIsValid) return;
      if (usernameLoading) return;
      setUsernameIsTouched(false);

      const formData = {
        email: userData.email,
        firstName: values.firstName,
        lastName: values.lastName || undefined,
        age: values.age || undefined,
        username: enteredUsername,
      };

      setAlert({
        status: 'pending',
        title: 'Please wait!',
        message: 'Data is sending...',
      });

      try {
        const result = await axios.post('/api/update-user', formData);
        setAlert({
          status: 'success',
          title: 'Success!',
          message: 'Profile changed successfully' + values.firstName,
        });

        formik.values.firstName = result.data.res.firstName;
        formik.values.lastName = result.data.res.lastName;
        formik.values.age = result.data.res.age;
        setEnteredUsername(result.data.res.username);

        setIsEditing(false);
      } catch (error: any) {
        setAlert({
          status: 'error',
          title: 'Error!',
          message: error.response.data.message,
        });
        setIsEditing(true);
      }
    },
  });

  const usernameSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Only letters and numbers')
      .min(4, 'Username must be at least 4 characters long')
      .max(20, 'Must be 20 characters or less'),
  });

  useEffect(() => {
    let timer: any;
    usernameSchema
      .validate({ username: enteredUsername })
      .then(() => {
        setUsernameIsValid(true);
        setUsernameLoading(true);
        timer = setTimeout(async () => {
          if (enteredUsername === userData.username) {
            setUsernameLoading(false);
            return;
          }
          try {
            await axios.post('/api/username-check', { enteredUsername });
          } catch (error: any) {
            setUsernameError(error.response.data.message);
            setUsernameIsValid(false);
          }
          setUsernameLoading(false);
        }, 600);
      })
      .catch((error) => {
        setUsernameError(error.message);
        setUsernameIsValid(false);
      });
    return () => {
      clearTimeout(timer);
    };
  }, [enteredUsername]);

  return (
    <div className='m-2 flex h-full flex-col items-center justify-center rounded-xl bg-zinc-900 px-3 py-4 sm:mx-8 sm:my-8 sm:p-6 md:items-start md:p-8 lg:mx-40 lg:my-12 lg:p-10 xl:mx-52'>
      <h1 className='mb-4 text-4xl font-bold sm:text-5xl md:mb-8'>
        Profile Page
      </h1>
      <ChangeProfilePhoto user={userData} />
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
              label='Username'
              name='username'
              type='text'
              onFocus={() => setUsernameIsTouched(true)}
              onChange={(e) => setEnteredUsername(e.target.value)}
              value={enteredUsername}
              editable={isEditing}
            />
            {!usernameIsValid && usernameError && usernameIsTouched && (
              <p className='absolute -bottom-5 text-sm text-rose-500'>
                {usernameError}
              </p>
            )}
            {usernameLoading && usernameIsTouched && usernameIsValid && (
              <p className='absolute -bottom-5 text-sm text-white '>
                Checking username...
              </p>
            )}
            {usernameIsValid &&
              !usernameLoading &&
              usernameIsTouched &&
              enteredUsername !== userData.username && (
                <p className='absolute -bottom-5 text-sm text-emerald-500 '>
                  {enteredUsername} is available.
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
              value={formik.values.lastName || ''}
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
              value={formik.values.age || ''}
              editable={isEditing}
            />
            {formik.touched.age && formik.errors.age && (
              <p className='absolute -bottom-5 text-sm text-rose-500 '>
                {formik.errors.age}
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

                  formik.values.firstName = formik.initialValues.firstName;
                  formik.values.lastName = formik.initialValues.lastName;
                  formik.values.age = formik.initialValues.age;

                  formik.errors.firstName = '';
                  formik.errors.lastName = '';
                  formik.errors.age = '';

                  setEnteredUsername(userData.username);
                  setUsernameError(null);
                  setUsernameIsTouched(false);
                }}
              >
                Cancel
              </button>
              <button
                className='link relative w-full rounded-lg bg-indigo-700 py-2.5 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-40'
                type='submit'
                disabled={alert?.status === 'pending'}
              >
                {alert?.status === 'pending'
                  ? 'Apply Changes...'
                  : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
