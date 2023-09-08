import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data: { message: string; sender: string; connect: string } =
    await req.json();
  const { message, sender, connect } = data;

  let finder = await prisma.user.findUnique({
    where: { email: sender },
    select: { connects: true, id: true },
  });

  let c = finder?.connects.find((c) => c.connectTo === connect);

  if (typeof c === 'undefined') {
    let res = await prisma.user.update({
      where: { email: sender },
      data: {
        connects: {
          create: {
            connectTo: connect,
            messages: { create: { text: message } },
          },
        },
      },
    });
    await prisma.user.update({
      where: { id: connect },
      data: {
        connects: {
          create: {
            connectTo: res.id,
            newMessage: 1,
          },
        },
      },
    });
  } else {
    let res = await prisma.user.update({
      where: { email: sender },
      data: {
        connects: {
          update: {
            where: {
              id: c.id,
            },
            data: {
              messages: { create: { text: message } },
            },
          },
        },
      },
    });

    let newMessage = await prisma.connects.findUnique({
      where: { id: c.id },
      select: { newMessage: true },
    });

    let currentNewMessages = newMessage?.newMessage as number;
    let newMessageNum = currentNewMessages + 1;

    await prisma.connects.update({
      where: {
        id: c.id,
      },
      data: {
        newMessage: newMessageNum,
      },
    });
  }

  return NextResponse.json({ message: 'ok' });
}
