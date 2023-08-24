import Image from 'next/image';
import ProfilePhoto from '../ProfilePhoto';
import galaxy from '@/public/images/wallpaper4.jpg';

export default function MenuProfile() {
  return (
    <div className='relative flex h-1/4 w-full flex-col items-start justify-end pl-5'>
      <Image
        className='opacity-75'
        style={{
          objectFit: 'cover',
        }}
        fill
        src={galaxy}
        alt='galaxy and people'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
      />
      <div className='relative mb-3 mt-6'>
        <ProfilePhoto
          profilePhoto={''}
          firstName={'Parsa'}
          lastName={'Chavoshi'}
          size={'64px'}
        />
      </div>
      <h1 className='z-10 mb-0.5 font-bold text-white'>Parsa Chavoshi</h1>
      <h2 className='z-10 mb-5 text-sm text-slate-500'>parypary82@gmail.com</h2>
    </div>
  );
}
