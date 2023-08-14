import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = null;
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: 'random Text',
  pages: {
    signIn: '/',
  },
};
