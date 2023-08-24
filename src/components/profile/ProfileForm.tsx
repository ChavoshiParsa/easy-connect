'use client';
import Link from 'next/link';
import { useState } from 'react';

import ChangeProfilePhoto from './ChangeProfilePhoto';

interface FormValues {
  profilePhoto: string;
  firstName: string;
  lastName: string;
  username: string;
  age: number | undefined;
}

// data comes from server

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  const values: FormValues = {
    profilePhoto: '',
    firstName: 'Parsa',
    lastName: 'Chavoshi',
    username: 'Parsa5485',
    age: 18,
  };

  return (
    <div className='m-2.5 flex h-full flex-col items-center justify-center rounded-2xl bg-zinc-900 px-2 py-6 sm:mx-8 sm:my-8 sm:p-6 md:items-start md:p-8 lg:mx-40 lg:my-12 lg:p-10 xl:mx-52'>
      <h1 className='mb-4 text-4xl font-bold md:mb-8'>Profile Page</h1>
      <ChangeProfilePhoto
        profilePhoto={values.profilePhoto}
        name={values.firstName}
        lastName={values.lastName}
        size='120px'
      />
      <form className='mb-8 flex w-full flex-col items-center justify-center space-y-3 md:mb-12 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-4 md:space-y-0'>
        <div className='w-full'>
          <label className='ml-1 w-full  text-base text-slate-300 md:text-lg'>
            First name
          </label>
          <input
            className='mt-0.5 w-full rounded-lg border border-[#c0c0c0] bg-[#101010f8] px-3 py-4 outline-0 md:mt-1 md:px-5'
            name='firstName'
            type='text'
            value={values.firstName}
            autoComplete='off'
          />
        </div>
        <div className='w-full'>
          <label className='ml-1 w-full text-base text-slate-300 md:text-lg'>
            Last name
          </label>
          <input
            className='mt-0.5 w-full rounded-lg border border-[#c0c0c0] bg-[#101010f8] px-3 py-4 outline-0 md:mt-1 md:px-5'
            name='firstName'
            type='text'
            value={values.lastName}
            autoComplete='off'
          />
        </div>
        <div className='w-full'>
          <label className='ml-1 w-full text-base text-slate-300 md:text-lg'>
            Age
          </label>
          <input
            className='mt-0.5 w-full rounded-lg border border-[#c0c0c0] bg-[#101010f8] px-3 py-4 outline-0 md:mt-1 md:px-5'
            name='firstName'
            type='text'
            value={values.age}
            autoComplete='off'
          />
        </div>
        <div className='w-full'>
          <label className='ml-1 w-full text-base text-slate-300 md:text-lg'>
            Username
          </label>
          <input
            className='mt-0.5 w-full rounded-lg border border-[#c0c0c0] bg-[#101010f8] px-3 py-4 outline-0 md:mt-1 md:px-5'
            name='firstName'
            type='text'
            value={values.username}
            autoComplete='off'
          />
        </div>
      </form>

      <div className='flex w-full flex-row items-center justify-between'>
        {isEditing ? (
          <>
            <Link
              className='link relative w-32 rounded-lg border border-indigo-500 py-3 text-center font-bold text-indigo-500 opacity-90 transition hover:bg-indigo-500 hover:text-slate-100 sm:w-40'
              href='/home'
            >
              Back
            </Link>
            <button
              className='link relative w-36 rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-48'
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <Link
              className='link relative w-32 rounded-lg border border-rose-500 py-3 text-center font-bold text-rose-500 opacity-90 transition hover:bg-rose-500 hover:text-slate-100 sm:w-40'
              href='/home'
            >
              Cancel
            </Link>
            <button className='link relative w-36 rounded-lg bg-indigo-700 py-3 text-center font-bold text-white opacity-90 transition hover:bg-indigo-600 sm:w-48'>
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// const [editable, setEditable] = useState(false);

// const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = event.target;
//   setFormValues((prevValues) => ({
//     ...prevValues,
//     [name]: value,
//   }));
// };

// const handleSubmit = (event: React.FormEvent) => {
//   event.preventDefault();
// You can add logic here to submit the form data to a backend, if needed
//   setEditable(false);
// };

//

// return (
//   <div className=''>
//     <h1 className=''>Profile</h1>
//     <form className='form'>
//       <div className='form-group'>
//         <label className='form-label'>Profile Photo:</label>
//         <input
//           type='text'
//           name='profilePhoto'
//           value={formValues.profilePhoto}
//           onChange={handleInputChange}
//           disabled={!editable}
//           className='form-input'
//         />
//       </div>
//       {/* ... Other form fields */}
//       <button
//         type='button'
//         onClick={() => setEditable(!editable)}
//         className='edit-button'
//       >
//         {editable ? 'Cancel' : 'Edit'}
//       </button>
//       {editable && (
//         <button type='submit' className='save-button'>
//           Save
//         </button>
//       )}
//     </form>
//   </div>
// );
