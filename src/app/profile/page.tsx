'use client';

import ProfileForm from '@/src/components/profile/ProfileForm';
import Loading from '../loading';
import useSWR from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function ProfilePage() {
  const { status } = useSession();

  const { data: user, isLoading } = useSWR('/api/get-user', fetcher, {
    revalidateOnFocus: true,
  });

  if (isLoading || status === 'loading') return <Loading />;
  if (status === 'unauthenticated') redirect('/signup');

  return <ProfileForm userData={user} />;
}
