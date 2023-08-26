import Navbar from '&/home/Navbar';
import ChatsContainer from '@/src/components/home/ChatsContainer';
import MenuControl from '@/src/components/home/menu/MenuControl';
import Link from 'next/link';
import Icon from '../ui/Icon';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { prisma } from '@/prisma/prisma';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;
  let res;
  if (userEmail) {
    res = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
  }

  return (
    <>
      <MenuControl user={res} />
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
