import ProfilePhoto from '../ProfilePhoto';

export interface UserItemProps {
  id: string;
  firstName: string;
  lastName: string | null;
  profileColor: string;
  profilePhoto: string | null;
  isOnline: boolean;
}

export default function UserItem(props: UserItemProps) {
  const { firstName, lastName, profileColor, profilePhoto, isOnline } = props;
  let statusColor = isOnline ? 'rgb(52,211,153)' : 'rgb(156,163,175)';

  return (
    <div className='link flex w-full flex-row items-center justify-start bg-[#101012] py-2 pl-2.5 pr-4 transition hover:bg-[#232327]'>
      <div className='mr-2.5'>
        <ProfilePhoto
          profileColor={profileColor}
          profilePhoto={profilePhoto}
          firstName={firstName}
          lastName={lastName}
          size={50}
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <span className='font-semibold text-white'>
          {firstName + (lastName ? ' ' + lastName : '')}
        </span>
        <span className='text-sm' style={{ color: statusColor }}>
          {isOnline ? 'online' : 'last seen recently'}
        </span>
      </div>
      <div className='mb-5 ml-auto flex flex-row items-center justify-center'></div>
    </div>
  );
}
