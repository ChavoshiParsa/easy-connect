import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { utapi } from 'uploadthing/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log(data);

  return NextResponse.json({ message: 'ok', data });
}
