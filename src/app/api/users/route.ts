import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  let res = await prisma.user.findMany({
    where: {
      NOT: {
        email: session?.user?.email as string,
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

  return NextResponse.json(res);
}
