import { Saira } from 'next/font/google';
import SignUp from '@/src/components/login/SignUp';

const play = Saira({
  subsets: ['latin'],
  weight: '700',
});

export default () => {
  return (
    <div className='relative flex flex-col items-center'>
      <h1
        className={
          'glow my-10 animate-pulse text-4xl shadow-white drop-shadow-2xl ' +
          play.className
        }
      >
        Easy Connect
      </h1>
      <SignUp />
    </div>
  );
};
