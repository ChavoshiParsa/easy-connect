import Link from 'next/link';
import ProfilePhoto from '../ProfilePhoto';
import CustomIcon from '../../ui/CustomIcon';

export interface ChatScreenNavbarProps {
  profileColor: string;
  profilePhoto: string | null;
  isOnline: boolean;
  firstName: string;
  lastName: string | null;
}

export default function Navbar({
  connect,
  isTyping,
}: {
  connect: ChatScreenNavbarProps;
  isTyping: boolean;
}) {
  const { firstName, isOnline, lastName, profileColor, profilePhoto } = connect;
  let status = isOnline ? 'online ' : 'last seen recently';
  let statusColor = isTyping
    ? 'rgb(14 165 233)'
    : isOnline
    ? 'rgb(16 185 129)'
    : 'rgb(100 116 139)';
  return (
    <div className='absolute top-0 z-30 flex w-full items-center justify-start bg-[#171d2da4] px-1 pb-2.5 pt-2 backdrop-blur-lg'>
      <Link
        className='link mr-4 cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        href='/home'
      >
        <CustomIcon size='18px' name='back' />
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
            {firstName + (lastName ? ' ' + lastName : '')}
          </span>
        </div>
        <div className='text-sm ' style={{ color: statusColor }}>
          {isTyping ? '...typing' : status}
        </div>
      </div>
      <button className='link ml-auto cursor-pointer rounded-full p-2 transition hover:bg-slate-700'>
        <CustomIcon size='22px' name='3dot' />
      </button>
    </div>
  );
}
