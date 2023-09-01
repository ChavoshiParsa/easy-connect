import { prisma } from '@/prisma/prisma';
import Loading from '@/src/app/loading';
import NewMessageNav from './NewMessageNav';
import UserList from './UserList';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/options';

export default async function AllUser() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signup');
  if (!session?.user?.email) return;

  let res = await prisma.user.findMany({
    where: {
      NOT: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileColor: true,
      profilePhoto: true,
      isOnline: true,
    },
  });

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <h1 className='mb-3 text-2xl text-slate-400'>Select some one to chat</h1>
      <div className='relative h-96 w-80 overflow-y-scroll rounded-xl bg-zinc-900'>
        <NewMessageNav />
        {res ? <UserList users={res} /> : <Loading />}
      </div>
    </div>
  );
}
