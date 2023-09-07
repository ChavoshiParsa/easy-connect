import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';
import { ConnectItemProps } from '@/src/components/home/ConnectItem';

interface connect {
  id: string;
  profileColor: string;
  profilePhoto: string | null;
  firstName: string;
  lastName: string | null;
}

interface lastMessages {
  text: string;
  createdAt: Date;
  messageTo:
    | {
        ownerId: string;
      }
    | {
        connectTo: string;
      };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;

  let res = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      connects: true,
    },
  });

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

  const connectMessages = await prisma.connects.findMany({
    where: { connectTo: userMessages?.id },
    select: {
      messages: {
        select: {
          text: true,
          createdAt: true,
          messageTo: { select: { ownerId: true } },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  const mappedConnects: connect[] = [];
  let realLastMessage: lastMessages[] = [];
  let finalResult: ConnectItemProps[] = [];

  let myLastMessages = userMessages?.connects.map(
    (connect) => connect.messages[0]
  );

  let theirLastMessages = connectMessages
    .map((connect) => connect.messages)
    .map((connect) => connect[0]);

  if (myLastMessages && theirLastMessages) {
    for (let i = 0; i < myLastMessages.length; i++) {
      if (typeof myLastMessages[i] === 'undefined') {
        realLastMessage.push(theirLastMessages[i]);
        continue;
      }
      if (typeof theirLastMessages[i] === 'undefined') {
        realLastMessage.push(myLastMessages[i]);
        continue;
      }
      if (
        new Date(myLastMessages[i].createdAt).getTime() >
        new Date(theirLastMessages[i].createdAt).getTime()
      ) {
        realLastMessage.push(myLastMessages[i]);
      } else {
        realLastMessage.push(theirLastMessages[i]);
      }
    }
  }

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

  for (let i = 0; i < mappedConnects.length; i++) {
    let lastSender: string;

    if (
      realLastMessage[i].messageTo &&
      'ownerId' in realLastMessage[i].messageTo
    ) {
      lastSender = 'connect';
    } else {
      lastSender = 'user';
    }

    finalResult.push({
      id: mappedConnects[i].id,
      profilePhoto: mappedConnects[i].profilePhoto,
      profileColor: mappedConnects[i].profileColor,
      firstName: mappedConnects[i].firstName,
      lastName: mappedConnects[i].lastName,
      lastSender,
      lastMessage: realLastMessage[i].text,
      lastMessageTime: realLastMessage[i].createdAt,
    });
  }

  const sortedArray = finalResult.sort((a, b) => {
    const createdAtA = new Date(a.lastMessageTime).getTime();
    const createdAtB = new Date(b.lastMessageTime).getTime();
    return createdAtB - createdAtA;
  });

  return NextResponse.json(sortedArray);
}
