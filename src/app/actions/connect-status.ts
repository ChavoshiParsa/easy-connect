'use server';

import { prisma } from '@/prisma/prisma';

export const setIsTyping = async (email: string, connectTo: string) => {
  let finder = await prisma.user.findUnique({
    where: { email },
    select: { connects: true },
  });
  let c = finder?.connects.find((c) => c.connectTo === connectTo);

  const updateIsTyping = async (value: boolean) => {
    await prisma.user.update({
      where: { email },
      data: {
        connects: {
          update: { where: { id: c?.id }, data: { isTyping: value } },
        },
      },
    });
  };

  await updateIsTyping(true);
  await updateIsTyping(false);
};
