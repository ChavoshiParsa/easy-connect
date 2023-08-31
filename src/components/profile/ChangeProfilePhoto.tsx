import ProfilePhoto from '../home/ProfilePhoto';
import { useContextProvider } from '@/src/context/store';
import Icon from '../ui/Icon';
import axios from 'axios';
import Uploader from './custom-uploadthing';
import { useEffect } from 'react';

interface ProfilePhotoProps {
  email: string;
  firstName: string;
  lastName: string | null;
  profilePhoto: string | null;
  profileColor: string;
}

export default function ChangeProfilePhoto(props: ProfilePhotoProps) {
  const { email, firstName, lastName, profileColor, profilePhoto } = props;

  return (
    <div className='mb-5 flex flex-col items-center justify-center md:mb-9 md:flex-row md:space-x-7'>
      <div className='mb-5 md:mb-0'>
        <ProfilePhoto
          profilePhoto={profilePhoto}
          profileColor={profileColor}
          firstName={firstName}
          lastName={lastName}
          size={120}
        />
      </div>
      <Uploader email={email} photo={profilePhoto} />
    </div>
  );
}
