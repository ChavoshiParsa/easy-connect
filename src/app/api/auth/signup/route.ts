import { hashPassword, randomNumber } from '@/lib/auth';
import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

interface Data {
  firstName: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const data: Data = await req.json();
  const trimData: Data = {
    firstName: data.firstName.trim(),
    email: data.email.trim(),
    password: data.password.trim(),
  };

  const { firstName, email, password } = trimData;
  if (
    !firstName ||
    !email ||
    !password ||
    firstName.length < 3 ||
    firstName.length > 15 ||
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
  let username: string = firstName + randomNumber(1000, 9999);
  let anyUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (anyUsername) {
    username = await usernameGenerator(username, firstName);
  }

  const res = await prisma.user.create({
    data: { firstName, email, username, password: hashedPassword },
  });

  return NextResponse.json(res);
}

async function usernameGenerator(username: string, firstName: string) {
  let newUsername: string = firstName + randomNumber(1000, 9999);
  let anyUsername = await prisma.user.findUnique({
    where: { username: newUsername },
  });

  if (anyUsername) {
    newUsername = await usernameGenerator(username, firstName);
    return newUsername;
  } else return newUsername;
}
