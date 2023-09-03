import NewMessageNav from './NewMessageNav';
import UserList from './UserList';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/options';

export default async function AllUser() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signup');

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <h1 className='mb-3 text-2xl text-slate-400'>Select some one to chat</h1>
      <div className='relative h-[410px] w-72 overflow-y-scroll rounded-xl bg-zinc-900 md:w-80 lg:w-96'>
        <NewMessageNav />
        <UserList />
      </div>
    </div>
  );
}
