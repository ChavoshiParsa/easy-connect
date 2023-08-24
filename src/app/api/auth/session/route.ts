import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/options';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) {
    // Signed in
    return NextResponse.json({ message: 'signed in' }, { status: 200 });
  } else {
    // Not Signed in
    return NextResponse.json({ message: 'not sign in' }, { status: 401 });
  }
}
