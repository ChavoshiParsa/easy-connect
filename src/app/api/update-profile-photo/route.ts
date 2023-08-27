import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { utapi } from 'uploadthing/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (data.photo === null) {
    const res = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (res?.profilePhoto) await utapi.deleteFiles(res.profilePhoto);
  }

  const res = await prisma.user.update({
    where: { email: data.email },
    data: {
      profilePhoto: data.photo,
    },
  });

  return NextResponse.json({ message: 'ok', data });
}
