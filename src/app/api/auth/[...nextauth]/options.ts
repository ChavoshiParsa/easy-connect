import { verifyPassword } from '@/lib/auth';
import { generateProf } from '@/lib/profileColor';
import { prisma } from '@/prisma/prisma';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.trim().toLowerCase() },
        });

        if (!user) {
          throw new Error('No user found with this email!');
        }

        const isValid = await verifyPassword(
          credentials.password.trim(),
          user?.password.trim()
        );

        if (!isValid) {
          throw new Error('Password is wrong!');
        }

        let image = user.profileColor;
        if (user.profilePhoto) image = user.profilePhoto;

        return {
          name: user.firstName,
          email: user.email,
          image,
        } as any;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: 'random Text',
  callbacks: {
    async signIn() {
      return true;
    },
  },
};

// import { getServerSession } from 'next-auth';
// import { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import { authOptions } from '../[...nextauth]/options';

// export async function GET(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   if (session) {
//     // Signed in
//     return NextResponse.json({ message: 'signed in' }, { status: 200 });
//   } else {
//     // Not Signed in
//     return NextResponse.json({ message: 'not sign in' }, { status: 401 });
//   }
// }
