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

  const resPost = await prisma.user.findUnique({
    where: { email },
    select: {
      connects: { select: { messages: true, connectTo: true } },
      id: true,
    },
  });

  const postedMessages = resPost?.connects.find(
    (connect) => connect.connectTo === connectId
  )?.messages;

  const transformedPostedMessages = postedMessages.map((message) => {
    const { text, createdAt, id } = message;

    return {
      id,
      type: 'posted',
      timeSent: createdAt,
      messageText: text,
      messageStatus: 'sent',
    };
  });

  const resReceive = await prisma.user.findUnique({
    where: { id: connectId as string },
    select: { connects: { select: { messages: true, connectTo: true } } },
  });

  const receivedMessages = resReceive?.connects.find(
    (connect) => connect.connectTo === resPost?.id
  )?.messages;

  const transformedReceivedMessages = receivedMessages.map((message) => {
    const { text, createdAt, id } = message;

    return {
      id,
      type: 'received',
      timeSent: createdAt,
      messageText: text,
      messageStatus: 'sent',
    };
  });

  let mergedArray = transformedPostedMessages.concat(
    transformedReceivedMessages
  );

  const sortedArray = mergedArray.sort((a, b) => {
    const createdAtA = new Date(a.timeSent).getTime();
    const createdAtB = new Date(b.timeSent).getTime();
    return createdAtA - createdAtB;
  });

  let transformedSortedArray = [];
  transformedSortedArray = sortedArray.map((message) => {
    const { timeSent } = message;

    const createdAtDate = new Date(timeSent);

    return {
      ...message,
      timeSent: `${createdAtDate.getHours()}:${createdAtDate.getMinutes()} ${
        createdAtDate.getHours() >= 12 ? 'PM' : 'AM'
      }`,
    };
  });

  return NextResponse.json(transformedSortedArray);
}

// first my message loads in array with type mapped post and status sent --> find with (email from session) --> connects --> messages
// then sender message loads with array type mapped received and status sent --> find with (connectId of my email and match) --> message

// sort array in order to time

// return array
