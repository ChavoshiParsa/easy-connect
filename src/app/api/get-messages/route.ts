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

  return NextResponse.json('good');
}

/*
type='received'
timeSent='8:58 PM'
messageText="I'm not Ok bro :("
messageStatus='sent'
*/

// first my message loads in array with type mapped post and status sent --> find with (email from session) --> connects --> messages
// then sender message loads with array type mapped received and status sent --> find with (connectId of my email and match) --> message

// sort array in order to time

// return array

// let res = await prisma.user.findUnique({
//   where: {
//     email: session?.user?.email as string,
//   },
//   select: {
//     connects: true,
//   },
// });
