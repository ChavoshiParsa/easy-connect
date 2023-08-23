import Navbar from '&/home/Navbar';
import ChatsContainer from '@/src/components/home/ChatsContainer';
import MenuControl from '@/src/components/home/menu/MenuControl';
import Link from 'next/link';
import Icon from '../ui/Icon';

export default function Home() {
  return (
    <>
      <MenuControl />
      <div className='h-full w-full overflow-y-scroll bg-[#18181855]'>
        <Navbar />
        <ChatsContainer />
      </div>
      <Link
        className='link absolute bottom-4 right-4 rounded-full bg-sky-500 bg-gradient-to-tr p-4 transition hover:bg-sky-400'
        href='/all-users'
      >
        <Icon size='26px' name='pencil' />
      </Link>
    </>
  );
}
