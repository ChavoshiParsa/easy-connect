import Image from 'next/image';
import wallpaperPhone from '@/public/images/wallpaper3.jpg';
import wallpaperLaptop from '@/public/images/wallpaper4.jpg';
import Navbar from './Navbar';
import InputMessage from './InputMessage';
import MessageContainer from './message/MessageContainer';

interface connectProps {}

export default function ChatScreen(connect: connectProps) {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-end'>
      <Image
        className='hidden brightness-50 sm:block'
        style={{
          objectFit: 'cover',
        }}
        fill
        src={wallpaperLaptop}
        alt='beautiful bridge'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <Image
        className='block brightness-50 sm:hidden'
        style={{
          objectFit: 'cover',
        }}
        fill
        src={wallpaperPhone}
        alt='beautiful bridge'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <Navbar
        profilePhoto=''
        firstName='AmirHossein'
        lastName='Noori'
        status='last seen recently'
      />
      <MessageContainer />
      <InputMessage />
    </div>
  );
}
