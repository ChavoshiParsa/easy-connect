import { ChangeEvent } from 'react';

import { UploadFileResponse } from 'uploadthing/client';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/src/app/api/uploadthing/core';
import { UserData, useContextProvider } from '@/src/context/store';
import { updateProfile } from '@/src/app/actions/user-profile';
import Icon from '../ui/CustomIcon';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

let WIDTH = 128;

export default function Uploader({
  user,
  profile,
  setProfile,
}: {
  user: UserData;
  profile: string | null;
  setProfile: (url: string | null) => void;
}) {
  const { setAlert } = useContextProvider();

  const deleteFileHandler = async () => {
    setAlert({
      status: 'pending',
      title: 'Loading...',
      message: `Deleting your photo from server...`,
    });
    await updateProfile(user.email, null);
    setProfile(null);
    setAlert({
      status: 'success',
      title: 'Done',
      message: 'Your photo has deleted.',
    });
  };

  const { startUpload } = useUploadThing('imageUploader', {
    onUploadProgress: () => {
      setAlert({
        status: 'pending',
        title: 'Loading...',
        message: 'Seems like stuff is uploading',
      });
    },
    onClientUploadComplete: async (res: UploadFileResponse[] | undefined) => {
      if (profile) {
        await deleteFileHandler();
      }
      if (res && res.length > 0) {
        setAlert({
          status: 'pending',
          title: 'Loading...',
          message: 'Setting profile photo',
        });
        await updateProfile(user.email, res[0].key);
        setProfile(res[0].key);
      }

      setAlert({
        status: 'success',
        title: 'Success!',
        message: 'Upload Completed',
      });
    },
    onUploadError: (error: Error) => {
      setAlert({
        status: 'error',
        title: 'Error!',
        message: `${error.message}`,
      });
    },
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAlert({
      status: 'pending',
      title: 'Loading...',
      message: 'Resizing your file',
    });
    const imageFile: File | undefined = event.target.files?.[0];

    if (!imageFile) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = (readerE: ProgressEvent<FileReader>) => {
      const imageUrl: string | ArrayBuffer | null | undefined =
        readerE.target?.result;

      if (typeof imageUrl !== 'string' || !imageUrl) {
        return;
      }

      const imageTag = document.createElement('img');
      imageTag.src = imageUrl as string;

      imageTag.onload = (imageTagE: Event) => {
        let canvas = document.createElement('canvas');
        let ratio = WIDTH / (imageTagE.target as HTMLImageElement).width;
        canvas.width = WIDTH;
        canvas.height = (imageTagE.target as HTMLImageElement).height * ratio;

        const context = canvas.getContext('2d');
        if (!context) return;
        context.drawImage(
          imageTag as HTMLImageElement,
          0,
          0,
          canvas.width,
          canvas.height
        );
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], `${user.email}.jpg`, {
                type: 'image/jpg',
                lastModified: Date.now(),
              });
              startUpload([newFile]);
            }
          },
          'image/jpg',
          0.9
        );
      };
    };
  };

  return (
    <div className='flex flex-row items-center justify-center md:flex-col'>
      <label className='mr-3 flex cursor-pointer flex-row items-center justify-center rounded-xl border border-indigo-500 py-1 pl-3 pr-4 transition hover:bg-indigo-300 md:mb-2 md:mr-0 md:py-2.5 md:pl-6 md:pr-7'>
        <Icon name='change-photo' size='24px' />
        <input className='hidden' type='file' onChange={inputChangeHandler} />
        <span className=' text-sm font-bold text-indigo-500 sm:ml-3 sm:text-base'>
          {profile ? 'Change' : 'New photo'}
        </span>
      </label>
      <div>
        {profile && (
          <button
            className='flex flex-row items-center justify-center rounded-xl border border-rose-500 py-1 pl-3 pr-4 transition hover:bg-rose-300 md:py-2.5 md:pl-6 md:pr-7'
            onClick={deleteFileHandler}
          >
            <Icon name='remove-photo' size='24px' />
            <span className=' text-sm font-bold text-rose-500 sm:ml-3 sm:text-base'>
              Remove
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
