import Home from '@/src/components/home/Home';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signup');

  return (
    <section className='relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-black md:hidden'>
      <Home />
    </section>
  );
};
