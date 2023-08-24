'use client';

import { signOut, useSession } from 'next-auth/react';

export default async () => {
  const { data, status } = useSession();
  console.log(status);

  return (
    <>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};
