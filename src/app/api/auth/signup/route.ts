import { hashPassword } from '@/lib/auth';
import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

interface Data {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const data: Data = await req.json();
  const trimData: Data = {
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
  };

  const { name, email, password } = trimData;
  if (
    !name ||
    !email ||
    !password ||
    name.length < 3 ||
    name.length > 15 ||
    !email.includes('@') ||
    password.length < 6 ||
    password.includes(' ')
  ) {
    return NextResponse.json({ message: 'Invalid inputs' }, { status: 422 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user !== null) {
    return NextResponse.json(
      { message: 'Email already exist!' },
      { status: 409 }
    );
  }

  const hashedPassword = await hashPassword(trimData.password);

  const res = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return NextResponse.json(res);
}
