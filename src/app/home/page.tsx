import Navbar from '&/home/Navbar';
import ChatsContainer from '@/src/components/home/ChatsContainer';
import PencilIcon from '@/src/components/home/PencilIcon';

export default () => {
  return (
    <main className='relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-black md:w-5/12'>
      <div className='h-full w-full overflow-y-scroll bg-[#18181855]'>
        <Navbar />
        <ChatsContainer />
      </div>
      <PencilIcon />
    </main>
  );
};
