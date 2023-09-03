'use server';

import { prisma } from '@/prisma/prisma';

export const reverseStatus = async (email: string) => {
  let res1 = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      isOnline: true,
    },
  });

  let res2 = await prisma.user.update({
    where: { email },
    select: {
      isOnline: true,
    },
    data: {
      isOnline: !res1?.isOnline,
    },
  });
  return res2.isOnline;
};
