import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  let res = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      email: true,
      username: true,
      firstName: true,
      profileColor: true,
      profilePhoto: true,
      lastName: true,
      age: true,
      isOnline: true,
    },
  });

  return NextResponse.json(res);
}
