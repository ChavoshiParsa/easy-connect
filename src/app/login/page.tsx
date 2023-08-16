import { Saira } from 'next/font/google';
import SignUp from '@/src/components/login/SignUp';

const play = Saira({
  subsets: ['latin'],
  weight: '700',
});

export default () => {
  return (
    <>
      <div className='relative h-screen w-screen'>
        <div className='flex flex-col items-center px-3'>
          <h1
            className={
              play.className +
              ' glow my-10 text-5xl shadow-white drop-shadow-2xl'
            }
          >
            Easy Connect
          </h1>
          <SignUp />
        </div>
      </div>
    </>
  );
};

/*        
<Link
  className='absolute bottom-8 left-8 self-start rounded-full bg-blue-700 px-10 py-2 text-xl'
    href='..'
  >
  go back
</Link>
*/
