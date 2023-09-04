import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

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
  console.log(res);

  const mappedConnects = [];

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
      mappedConnects.push(user);
    })
  );

  return NextResponse.json(mappedConnects);
}
