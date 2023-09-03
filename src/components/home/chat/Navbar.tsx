import Link from 'next/link';
import ProfilePhoto from '../ProfilePhoto';
import Icon from '../../ui/Icon';

export interface ChatScreenNavbarProps {
  profileColor: string;
  profilePhoto: string;
  status: boolean;
  firstName: string;
  lastName: string;
}

export default function Navbar(props: ChatScreenNavbarProps) {
  const { profileColor, profilePhoto, firstName, lastName, status } = props;
  return (
    <div className='absolute top-0 z-30 flex w-full items-center justify-start bg-[#171d2da4] px-1 pb-2.5 pt-2 backdrop-blur-lg'>
      <Link
        className='link mr-4 cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        href='/home'
      >
        <Icon size='18px' name='back' />
      </Link>
      <div className='mr-2.5'>
        <ProfilePhoto
          profileColor={profileColor}
          profilePhoto={profilePhoto}
          firstName={firstName}
          lastName={lastName}
          size={46}
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <div className='flex flex-col items-start justify-center'>
          <span className='font-semibold text-white'>
            {firstName + ' ' + lastName}
          </span>
        </div>
        <div className='text-sm text-gray-400'>{status}</div>
      </div>
      <button className='link ml-auto cursor-pointer rounded-full p-2 transition hover:bg-slate-700'>
        <Icon size='22px' name='3dot' />
      </button>
    </div>
  );
}
