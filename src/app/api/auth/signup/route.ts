import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, password } = data;

  const res = await prisma.user.create({
    data: { name, email, password, isOnline: true, username: email },
  });

  console.log(res);

  return NextResponse.json({ data });
}
