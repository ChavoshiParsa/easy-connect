'use client';

import useSWR from 'swr';
import UserItem, { UserItemProps } from './UserItem';
import axios from 'axios';
import Loading from '@/src/app/loading';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function UserList() {
  const {
    data: users,
    isLoading,
  }: { data: UserItemProps[]; isLoading: boolean } = useSWR(
    '/api/users',
    fetcher,
    { refreshInterval: 5000, revalidateOnFocus: true }
  );

  if (isLoading) return <Loading />;

  return (
    <div className='relative flex w-full flex-col items-center justify-start space-y-px'>
      {users.length === 0 ? (
        <p className='mx-6 mt-20 animate-pulse text-center text-2xl'>
          {"No one use Our app I'm so sad :("}
        </p>
      ) : (
        users.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            profileColor={user.profileColor}
            profilePhoto={user.profilePhoto}
            firstName={user.firstName}
            lastName={user.lastName}
            isOnline={user.isOnline}
          />
        ))
      )}
    </div>
  );
}
