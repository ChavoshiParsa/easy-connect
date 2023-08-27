import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  // transformation
  // validation

  const res = await prisma.user.update({
    where: { email: data.email },
    data: {
      firstName: data.firstName,
      lastName: data.lastName || undefined,
      age: data.age || undefined,
      username: data.username,
    },
  });

  return NextResponse.json({ message: 'ok', res });
}
