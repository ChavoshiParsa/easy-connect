import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const res = await prisma.user.update({
    where: { email: data.email },
    data: {
      profilePhoto: data.photo,
    },
  });

  return NextResponse.json({ message: 'ok', data });
}
