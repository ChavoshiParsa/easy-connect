import Navbar from '&/home/Navbar';
import ConnectList from '@/src/components/home/ConnectList';
import MenuControl from '@/src/components/home/menu/MenuControl';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/prisma';
import Loading from '@/src/app/loading';

// use swr

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) return;

  return (
    <>
      <MenuControl />
      <div className='h-full w-full overflow-y-scroll bg-[#18181855]'>
        <Navbar />
        <ConnectList />
      </div>
      <Link
        className='link absolute bottom-4 right-4 rounded-full bg-sky-500 bg-gradient-to-tr p-4 transition hover:bg-sky-400'
        href='/home/new-message'
      >
        <Icon size='26px' name='pencil' />
      </Link>
    </>
  );
}
