import Image from 'next/image';
import ProfilePhoto from './ProfilePhoto';
import Link from 'next/link';

export interface ConnectItemProps {
  id: string;
  profileColor: string;
  profilePhoto: string | null;
  firstName: string;
  lastName: string | null;
  lastSender: string;
  lastMessage: string;
  lastMessageTime: Date;
  newMessage: number;
}

export default function ConnectItem(props: ConnectItemProps) {
  const {
    profileColor,
    profilePhoto,
    firstName,
    lastName,
    lastSender,
    lastMessage,
    lastMessageTime,
    id,
    newMessage,
  } = props;

  const createdAtDate = new Date(lastMessageTime);

  let min = createdAtDate.getMinutes().toString();
  if (createdAtDate.getMinutes() < 10) {
    min = '0' + createdAtDate.getMinutes();
  }
  let convertedTime = `${createdAtDate.getHours()}:${min} ${
    createdAtDate.getHours() >= 12 ? 'PM' : 'AM'
  }`;

  return (
    <Link
      className='link relative flex w-full translate-y-0 flex-row items-center justify-start bg-[#101012] py-2 pl-2.5 pr-4 transition hover:bg-[#232327]'
      href={id}
    >
      {newMessage !== 0 && (
        <div className='absolute bottom-2.5 right-4 z-40 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500'>
          <span className='text-xs font-bold'>{newMessage}</span>
        </div>
      )}
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
        <span className='text-sm text-gray-400'>{lastMessage}</span>
      </div>
      <div className='mb-5 ml-auto flex flex-row items-center justify-center'>
        {lastSender === 'user' && (
          <Image
            className='pb-0.5'
            src='/icons/single-tick.svg'
            alt='tick icon'
            width={20}
            height={20}
            sizes='100vw'
            style={{
              width: '20px',
              height: 'auto',
            }}
          />
        )}

        <div className='text-sm text-gray-400'>{convertedTime}</div>
      </div>
    </Link>
  );
}
