'use server';

import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export const newMessageOff = async (connect: string) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email as string;
  console.log('\n\n\n\n\n' + email);
  console.log(connect);

  let res = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  let finder = await prisma.user.findUnique({
    where: { id: connect },
    select: { connects: { select: { id: true, connectTo: true } } },
  });

  let idFinder = finder?.connects.find((c) => c.connectTo === res?.id);

  await prisma.connects.update({
    where: {
      id: idFinder?.id,
      ownerId: connect,
      connectTo: res?.id,
    },
    data: {
      newMessage: 0,
    },
  });
};
