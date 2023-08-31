import { ChangeEvent, useState } from 'react';

import type { OurFileRouter } from '@/src/app/api/uploadthing/core';

import { generateReactHelpers } from '@uploadthing/react/hooks';
import { useContextProvider } from '@/src/context/store';
import { UploadFileResponse } from 'uploadthing/client';
import axios from 'axios';
import Icon from '../ui/Icon';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function Uploader({
  email,
  photo,
}: {
  email: string;
  photo: string | null;
}) {
  const { setPhoto, setAlert } = useContextProvider();

  const deleteFileHandler = async () => {
    setAlert({
      status: 'pending',
      title: 'Loading...',
      message: `Deleting your photo from server...`,
    });
    await axios.post('/api/update-profile-photo', {
      email,
      photo: null,
    });
    setPhoto(null);
    setAlert({
      status: 'success',
      title: 'Done',
      message: 'Your photo has deleted.',
    });
  };

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res: UploadFileResponse[] | undefined) => {
      if (photo) {
        await deleteFileHandler();
      }
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
    },
    onUploadProgress: () => {
      setAlert({
        status: 'pending',
        title: 'Loading...',
        message: 'Seems like stuff is uploading',
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
        let ratio = 512 / (imageTagE.target as HTMLImageElement).width;
        canvas.width = 512;
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
              const newFile = new File([blob], `${email}.jpg`, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              startUpload([newFile]);
            }
          },
          'image/jpeg',
          0.9
        );
      };
    };
  };

  return (
    <div className='flex flex-row items-center justify-center md:flex-col'>
      <div className='md:mb-2'>
        <label>Upload file</label>
        <input type='file' onChange={inputChangeHandler} />
      </div>
      <div>
        {photo && (
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
