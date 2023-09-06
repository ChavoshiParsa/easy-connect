import { UserData } from '@/src/context/store';
import ProfilePhoto from '../home/ProfilePhoto';
import Uploader from './custom-uploadthing';
import { useState } from 'react';

export default function ChangeProfilePhoto({ user }: { user: UserData }) {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(
    user.profilePhoto
  );

  const setProfile = (url: string | null): void => {
    setProfilePhoto(url);
  };

  return (
    <div className='mb-5 flex flex-col items-center justify-center md:mb-9 md:flex-row md:space-x-7'>
      <div className='mb-5 md:mb-0'>
        <ProfilePhoto
          profilePhoto={profilePhoto}
          profileColor={user.profileColor}
          firstName={user.firstName}
          lastName={user.lastName}
          size={120}
        />
      </div>
      <Uploader user={user} profile={profilePhoto} setProfile={setProfile} />
    </div>
  );
}
