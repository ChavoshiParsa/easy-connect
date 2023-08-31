import Image from 'next/image';
import ProfilePhoto from '../ProfilePhoto';
import galaxy from '@/public/images/wallpaper4.jpg';
import { useContextProvider } from '@/src/context/store';
import Loading from '@/src/app/loading';

export default function MenuProfile() {
  const { user } = useContextProvider();

  if (!user) return <Loading />;

  return (
    <div className='relative flex h-1/4 w-full flex-col items-start justify-end pl-5'>
      <Image
        className='opacity-50'
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
          profilePhoto={user.profilePhoto}
          profileColor={user.profileColor}
          firstName={user.firstName}
          lastName={user.lastName}
          size={64}
        />
      </div>
      <h1 className='z-10 mb-0.5 font-bold text-white'>
        {user.firstName} {user.lastName}
      </h1>
      <h2 className='z-10 mb-5 text-sm text-slate-500'>{user.email}</h2>
    </div>
  );
}
