import { UploadButton } from '@/lib/uploadthing';
import ProfilePhoto from '../home/ProfilePhoto';
import Icon from '../ui/Icon';
import { useContextProvider } from '@/src/context/store';
import { useState } from 'react';
import { UploadFileResponse } from 'uploadthing/client';
import axios from 'axios';

interface ProfilePhotoProps {
  email: string;
  firstName: string;
  lastName: string | null;
  profilePhoto: string | null;
  profileColor: string;
}

export default function ChangeProfilePhoto(props: ProfilePhotoProps) {
  const { email, firstName, lastName, profilePhoto, profileColor } = props;

  const { setAlert } = useContextProvider();
  const [photo, setPhoto] = useState<string | null>(profilePhoto);
  const deleteFileHandler = async () => {
    // await utapi.deleteFiles(profilePhoto);
    setPhoto(null);
  };

  return (
    <div className='mb-5 flex flex-col items-center justify-center md:mb-9 md:flex-row md:space-x-7'>
      <div className='mb-5 md:mb-0'>
        <ProfilePhoto
          profilePhoto={photo}
          profileColor={profileColor}
          firstName={firstName}
          lastName={lastName}
          size={120}
        />
      </div>
      <div className='flex flex-row items-center justify-center md:flex-col'>
        <UploadButton
          content={{
            button({ ready }) {
              let contentText = 'Get ready';

              if (ready) {
                contentText = 'Change';
              }
              return (
                <div className='mr-2 flex flex-row items-center justify-center rounded-xl border border-indigo-500 py-1 pl-3 pr-4 transition hover:bg-indigo-300 md:mb-4 md:mr-0 md:py-2.5 md:pl-6 md:pr-7'>
                  <Icon name='change-photo' size='24px' />
                  <span className=' text-sm font-bold text-indigo-500 sm:ml-3 sm:text-base'>
                    {contentText}
                  </span>
                </div>
              );
            },
            allowedContent({ isUploading }) {
              if (isUploading)
                return (
                  <div className='absolute right-3 top-3 z-30 flex flex-col items-start justify-center rounded-md bg-blue-300 px-3 py-2 text-black'>
                    <h1 className='text-lg'>Loading...</h1>
                    <p className='text-base'>Seems like stuff is uploading</p>
                  </div>
                );
              return '';
            },
          }}
          endpoint='imageUploader'
          onClientUploadComplete={async (
            res: UploadFileResponse[] | undefined
          ) => {
            if (res && res.length > 0) {
              setPhoto(res[0].key);
              setAlert({
                status: 'pending',
                title: 'Loading...',
                message: 'Setting profile photo',
              });
              await axios.post('/api/update-profile-photo', {
                email,
                photo: res[0].key,
              });
            }

            setAlert({
              status: 'success',
              title: 'Success!',
              message: 'Upload Completed',
            });
          }}
          onUploadError={(error: Error) => {
            setAlert({
              status: 'error',
              title: 'Error!',
              message: `${error.message}`,
            });
          }}
        />
        <button
          className='flex flex-row items-center justify-center rounded-xl border border-rose-500 py-1 pl-3 pr-4 transition hover:bg-rose-300 md:py-2.5 md:pl-6 md:pr-7'
          onClick={deleteFileHandler}
        >
          <Icon name='remove-photo' size='24px' />
          <span className=' text-sm font-bold text-rose-500 sm:ml-3 sm:text-base'>
            Remove
          </span>
        </button>
      </div>
    </div>
  );
}
