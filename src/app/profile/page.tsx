import ProfileForm from '@/src/components/profile/ProfileForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/prisma';
import Loading from '../loading';

export default async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signup');

  const userEmail = session?.user?.email;

  if (!userEmail) return;

  let res = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      profileColor: true,
      profilePhoto: true,
      lastName: true,
      age: true,
    },
  });

  return <>{res ? <ProfileForm userData={res} /> : <Loading />}</>;
};
