import Image from 'next/image';
import ProfilePhoto from './ProfilePhoto';

export default function ChatItem(props) {
  const {
    profilePhoto,
    name,
    lastName,
    lastSender,
    lastSenderMessage,
    lastMessageTime,
  } = props;

  return (
    <div className='flex w-full flex-row items-center justify-start bg-[#101012] py-2 pl-2.5 pr-4 hover:bg-[#1a1a1b]'>
      <div className='mr-2.5'>
        <ProfilePhoto
          profilePhoto={profilePhoto}
          name={name}
          lastName={lastName}
          size={'50px'}
        />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <span className='font-semibold text-white'>
          {name + ' ' + lastName}
        </span>
        <span className='text-sm text-gray-400'>{lastSenderMessage}</span>
      </div>
      <div className='mb-5 ml-auto flex flex-row items-center justify-center'>
        {lastSender === 'I' && (
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

        <div className='text-sm text-gray-400'>{lastMessageTime}</div>
      </div>
    </div>
  );
}
