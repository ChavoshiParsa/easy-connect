import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

interface Data {
  firstName: string;
  lastName: string | undefined;
  username: string;
  age: number | undefined;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  // transformation
  let convertedLastName = data.lastName;
  if (typeof convertedLastName !== 'undefined') {
    convertedLastName =
      data.lastName.trim()[0].toUpperCase() + data.lastName.trim().slice(1);
  }
  console.log(data.lastName);
  const convertedData: Data = {
    firstName:
      data.firstName.trim()[0].toUpperCase() + data.firstName.trim().slice(1),
    lastName: convertedLastName || undefined,
    username: data.username.trim().toLowerCase(),
    age: data.age || undefined,
  };

  // validation

  const res = await prisma.user.update({
    where: { email: data.email },
    data: {
      firstName: convertedData.firstName,
      lastName: convertedData.lastName || undefined,
      age: convertedData.age || undefined,
      username: convertedData.username,
    },
  });

  return NextResponse.json({ message: 'ok', res });
}
