'use server';

import { prisma } from '@/prisma/prisma';
import { utapi } from 'uploadthing/server';

export const updateProfile = async (email: string, photo: string | null) => {
  if (photo === null) {
    const res = await prisma.user.findUnique({
      where: { email },
    });
    if (res?.profilePhoto) await utapi.deleteFiles(res.profilePhoto);
  }

  await prisma.user.update({
    where: { email },
    data: {
      profilePhoto: photo,
    },
  });
};
