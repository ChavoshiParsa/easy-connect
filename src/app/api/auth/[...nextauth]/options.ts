import { verifyPassword } from '@/lib/auth';
import { prisma } from '@/prisma/prisma';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('No user found with this email!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user?.password
        );

        if (!isValid) {
          throw new Error('Password is wrong!');
        }

        return { email: user.email } as any;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: 'random Text',
  pages: {
    signOut: '/',
  },
};
