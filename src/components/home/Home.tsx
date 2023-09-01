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

  let res = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      email: true,
      username: true,
      firstName: true,
      profileColor: true,
      profilePhoto: true,
      lastName: true,
      age: true,
    },
  });

  return (
    <>
      {res ? <MenuControl userData={res} /> : <Loading />}
      <div className='h-full w-full overflow-y-scroll bg-[#18181855]'>
        <Navbar />
        <ConnectList users={FakeApi} />
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

const FakeApi = [
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Noori',
    lastSender: 'I',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '8:13 AM',
    connectId: '5698',
  },
  {
    profilePhoto: '',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
    connectId: '8408',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Naderali',
    lastSender: 'Y',
    lastSenderMessage: 'He is great',
    lastMessageTime: '2:50 PM',
    connectId: '1292',
  },
];
