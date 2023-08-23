import Link from 'next/link';
import ProfilePhoto from '../ProfilePhoto';
import Icon from '../../ui/Icon';

interface ChatScreenNavbarProps {
  profilePhoto: string;
  status: string;
  name: string;
  lastName: string;
}

export default function Navbar(props: ChatScreenNavbarProps) {
  const { profilePhoto, name, lastName, status } = props;
  return (
    <div className='absolute top-0 z-30 flex w-full items-center justify-start bg-[#171d2da4] px-1 py-2.5 backdrop-blur-lg'>
      <Link
        className='link mr-4 cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        href='/home'
      >
        <Icon size='18px' name='back' />
      </Link>
      <div className='mr-2.5'>
        <ProfilePhoto
          profilePhoto={profilePhoto}
          name={name}
          lastName={lastName}
          size={'46px'}
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <div className='flex flex-col items-start justify-center'>
          <span className='font-semibold text-white'>
            {name + ' ' + lastName}
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
