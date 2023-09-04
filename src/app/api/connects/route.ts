import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

interface connect {
  id: string;
  profileColor: string;
  profilePhoto: string | null;
  firstName: string;
  lastName: string | null;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  let res = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      connects: true,
    },
  });

  const mappedConnects: connect[] = [];

  await Promise.all(
    (res?.connects || []).map(async (connect) => {
      let user = await prisma.user.findUnique({
        where: { id: connect.connectTo },
        select: {
          id: true,
          profileColor: true,
          profilePhoto: true,
          firstName: true,
          lastName: true,
        },
      });
      if (user) {
        mappedConnects.push(user);
      }
    })
  );

  return NextResponse.json(mappedConnects);
}
