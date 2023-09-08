import { hashPassword, randomNumber } from '@/lib/auth';
import { generateProf } from '@/lib/profileColor';
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

  const convertedData: Data = {
    firstName:
      data.firstName.trim()[0].toUpperCase() + data.firstName.trim().slice(1),
    email: data.email.trim().toLowerCase(),
    password: data.password.trim(),
  };

  const { firstName, email, password } = convertedData;

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

  const hashedPassword = await hashPassword(convertedData.password);

  // generating username base user and random numbers
  let username: string = 'user' + randomNumber(10000, 99999);
  let anyUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (anyUsername) {
    username = await usernameGenerator(username);
  }

  const res = await prisma.user.create({
    data: {
      firstName,
      email,
      username,
      password: hashedPassword,
      profileColor: generateProf(),
    },
  });

  return NextResponse.json(res);
}

async function usernameGenerator(username: string) {
  let newUsername: string = 'user' + randomNumber(10000, 99999);
  let anyUsername = await prisma.user.findUnique({
    where: { username: newUsername },
  });

  if (anyUsername) {
    newUsername = await usernameGenerator(username);
    return newUsername;
  } else return newUsername;
}
