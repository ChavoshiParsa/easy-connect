import '#/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './provider';
import { ContextProvider } from '../context/store';
import Alert from '../components/ui/Alert';
import { authOptions } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Easy Connect',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} relative w-screen`}>
        <ContextProvider>
          <Alert />
          <AuthProvider>{children}</AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
