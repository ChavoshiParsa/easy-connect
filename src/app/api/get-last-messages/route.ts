import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  const userMessages = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      connects: {
        select: {
          messages: {
            select: {
              text: true,
              createdAt: true,
              messageTo: { select: { connectTo: true } },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      },
    },
  });

  const otherMessages = await prisma.connects.findMany({
    where: { connectTo: userMessages?.id },
    select: {
      messages: {
        select: {
          text: true,
          createdAt: true,
          messageTo: { select: { connectTo: true } },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  let myLastMessages = userMessages?.connects.map(
    (connect) => connect.messages[0]
  );

  console.log(otherMessages);

  return NextResponse.json('ok');
}
