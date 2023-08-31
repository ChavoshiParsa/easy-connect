import ProfilePhoto from '../home/ProfilePhoto';
import { useContextProvider } from '@/src/context/store';
import Uploader from './custom-uploadthing';

export default function ChangeProfilePhoto() {
  const { user } = useContextProvider();
  if (!user) return;

  return (
    <div className='mb-5 flex flex-col items-center justify-center md:mb-9 md:flex-row md:space-x-7'>
      <div className='mb-5 md:mb-0'>
        <ProfilePhoto
          profilePhoto={user.profilePhoto}
          profileColor={user.profileColor}
          firstName={user.firstName}
          lastName={user.lastName}
          size={120}
        />
      </div>
      <Uploader />
    </div>
  );
}
