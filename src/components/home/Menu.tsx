import Image from 'next/image';
import shapes from '@/public/images/galaxy.jpg';
import ProfilePhoto from './ProfilePhoto';

export default function Menu() {
  return (
    <>
      <div className='relative left-0 top-0 flex h-1/4 w-full flex-col items-start justify-end pl-5'>
        <Image
          style={{
            objectFit: 'cover',
          }}
          fill
          src={shapes}
          alt='geometry shapes'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
        />
        <div className='relative mb-5'>
          <ProfilePhoto
            profilePhoto={''}
            name={'Parsa'}
            lastName={'Chavoshi'}
            size={'64px'}
          />
        </div>
        <h1 className='z-10 mb-0.5 font-bold text-white'>Parsa Chavoshi</h1>
        <h1 className='z-10 mb-5 text-sm text-slate-500'>
          parypary82@gmail.com
        </h1>
      </div>

      <ul className='flex flex-col items-start justify-center'>
        <li>Profile</li>
        <li>New Message</li>
        <li>Account</li>
        <li>Setting</li>
        <li>Send FeedBacks</li>
      </ul>
    </>
  );
}
