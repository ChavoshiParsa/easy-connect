'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
    });
  };
  return (
    <div className='phone flex items-center justify-center'>
      <button
        className='rounded bg-rose-600 px-3.5 py-1.5 text-lg hover:bg-rose-500'
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
