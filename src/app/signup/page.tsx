import SignUp from '@/src/components/login/SignUp';
import Image from 'next/image';
import shapes from '@/public/images/shapes.jpg';

export default () => {
  return (
    <main className='relative flex h-screen w-screen items-start justify-center md:justify-between'>
      <div className='absolute -z-10 h-full w-full opacity-50 md:relative md:w-7/12 md:opacity-90'>
        <Image
          style={{
            objectFit: 'cover',
          }}
          fill
          src={shapes}
          alt='geometry shapes'
        />
      </div>
      <div className='mt-10 items-center justify-center md:mt-0 md:flex md:h-full md:w-5/12'>
        <SignUp />
      </div>
    </main>
  );
};
