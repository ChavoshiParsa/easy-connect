import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

interface Data {
  firstName: string;
  lastName: string | null;
  username: string;
  age: number | null;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  // transformation
  let convertedLastName = data.lastName;
  if (convertedLastName !== '') {
    convertedLastName =
      data.lastName.trim()[0].toUpperCase() + data.lastName.trim().slice(1);
  } else {
    convertedLastName = null;
  }
  const convertedData: Data = {
    firstName:
      data.firstName.trim()[0].toUpperCase() + data.firstName.trim().slice(1),
    lastName: convertedLastName || null,
    username: data.username.trim().toLowerCase(),
    age: data.age || null,
  };

  // validation

  const res = await prisma.user.update({
    where: { email: data.email },
    data: {
      firstName: convertedData.firstName,
      lastName: convertedData.lastName,
      age: convertedData.age,
      username: convertedData.username,
    },
  });

  return NextResponse.json({ message: 'ok', res });
}
