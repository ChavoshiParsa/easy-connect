import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const url = new URL(req.url);
  const email = session?.user?.email as string;
  const connectId = url.searchParams.get('connectId');

  if (!connectId || !email) return;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  const info = await prisma.user.findUnique({
    where: { id: connectId },
    select: {
      profileColor: true,
      profilePhoto: true,
      isOnline: true,
      firstName: true,
      lastName: true,
    },
  });

  const res = await prisma.user.findUnique({
    where: { id: connectId },
    select: {
      connects: {
        where: { connectTo: user?.id },
        select: { isTyping: true, connectTo: true },
      },
    },
  });

  const isTyping = res?.connects.find((c) => c.connectTo === user?.id)
    ?.isTyping;

  return NextResponse.json({ info, isTyping });
}
