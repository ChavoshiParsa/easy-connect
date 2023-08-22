import Image from 'next/image';
import bridge from '@/public/images/bridge.jpg';
import Navbar from './Navbar';
import Input from './Input';

export default function ChatScreen() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-start'>
      <Image
        style={{
          objectFit: 'cover',
        }}
        fill
        src={bridge}
        alt='beautiful bridge'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        priority
      />
      <Navbar
        profilePhoto=''
        name='AmirHossein'
        lastName='Noori'
        status='last seen recently'
      />
      {/* chat zoon */}
      <div className='mt-auto'>
        <Input />
      </div>
    </div>
  );
}
