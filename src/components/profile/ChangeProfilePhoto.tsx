import ProfilePhoto from '../home/ProfilePhoto';
import Icon from '../ui/Icon';

interface ProfilePhotoProps {
  profilePhoto: string;
  name: string;
  lastName: string;
  size: string;
}

export default function ChangeProfilePhoto(props: ProfilePhotoProps) {
  const { profilePhoto, name, lastName, size } = props;

  return (
    <div className='mb-5 flex flex-col items-center justify-center md:mb-9 md:flex-row md:space-x-7'>
      <div className='mb-5 md:mb-0'>
        <ProfilePhoto
          profilePhoto={profilePhoto}
          name={name}
          lastName={lastName}
          size={size}
        />
      </div>
      <div className='flex flex-row items-center justify-center md:flex-col'>
        <button className='mr-2 flex flex-row items-center justify-center rounded-xl border border-indigo-500 py-1 pl-3 pr-4 md:mb-4 md:mr-0 md:py-2.5 md:pl-6 md:pr-7'>
          <Icon name='change-photo' size='24px' />
          <span className='text-md ml-1.5 font-bold text-indigo-500 md:ml-3 md:text-base'>
            Change
          </span>
        </button>
        <button className='flex flex-row items-center justify-center rounded-xl border border-rose-500 py-1 pl-3 pr-4 md:py-2.5 md:pl-6 md:pr-7'>
          <Icon name='remove-photo' size='24px' />
          <span className='ml-1.5 text-sm font-bold text-rose-500 sm:ml-3 sm:text-base'>
            Remove
          </span>
        </button>
      </div>
    </div>
  );
}
