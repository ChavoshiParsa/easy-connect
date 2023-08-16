import '#/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './provider';

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
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
