import '#/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './provider';
import { ContextProvider } from '../context/store';
import Alert from '../components/ui/Alert';
import NextTopLoader from 'nextjs-toploader';

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
          <AuthProvider>
            <NextTopLoader color='rgb(79 70 229)' />
            {children}
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
