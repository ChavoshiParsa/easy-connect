import Navbar from '&/home/Navbar';
import ChatsContainer from '@/src/components/home/ChatsContainer';
import Image from 'next/image';

export default () => {
  return (
    <main className='relative flex h-screen w-full flex-col items-center justify-start bg-black'>
      <div className='absolute bottom-3 right-3 rounded-full bg-[#03A9F1] p-3'>
        <Image
          className=''
          src='/icons/pencil.svg'
          alt='pencil icon'
          width={30}
          height={30}
          sizes='100vw'
          style={{
            width: '32px',
            height: 'auto',
          }}
        />
      </div>
      <Navbar />
      <ChatsContainer />
    </main>
  );
};
