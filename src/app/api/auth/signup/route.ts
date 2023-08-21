import { hashPassword, randomNumber } from '@/lib/auth';
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

  // generating username base name and random numbers
  let username: string = name + randomNumber(1000, 9999);
  let anyUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (anyUsername) {
    username = await usernameGenerator(username, name);
  }

  const res = await prisma.user.create({
    data: { name, email, username, password: hashedPassword },
  });

  return NextResponse.json(res);
}

async function usernameGenerator(username: string, name: string) {
  let newUsername: string = name + randomNumber(1000, 9999);
  let anyUsername = await prisma.user.findUnique({
    where: { username: newUsername },
  });

  if (anyUsername) {
    newUsername = await usernameGenerator(username, name);
    return newUsername;
  } else return newUsername;
}
