import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const username = await prisma.user.findUnique({
    where: { username: data.enteredUsername },
  });

  if (username !== null) {
    return NextResponse.json(
      { message: 'This username is already taken.' },
      { status: 409 }
    );
  }

  return NextResponse.json({ message: 'ok' });
}
