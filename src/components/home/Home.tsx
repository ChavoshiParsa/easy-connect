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
        className='link absolute bottom-6 right-6 rounded-full bg-[#03A9F1] p-3'
        href='/all-users'
      >
        <Icon size='26px' name='pencil' />
      </Link>
    </>
  );
}
