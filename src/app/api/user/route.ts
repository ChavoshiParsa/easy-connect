import { prisma } from '@/prisma/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email; // Extract email separately

  if (userEmail) {
    const res = await prisma.user.findUnique({
      where: {
        email: userEmail, // Use the extracted email
      },
    });

    return NextResponse.json(res);
  } else {
    return NextResponse.json({ error: 'not authenticated' });
  }
}
