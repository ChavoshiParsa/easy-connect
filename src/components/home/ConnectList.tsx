'use client';
import Loading from '@/src/app/loading';
import ConnectItem, { ConnectItemProps } from './ConnectItem';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function ConnectList() {
  const {
    data: connects,
    isLoading,
  }: { data: ConnectItemProps[]; isLoading: boolean } = useSWR(
    '/api/connects',
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <div className='relative flex w-full flex-col items-center justify-start space-y-px'>
      {connects.length === 0 ? (
        <p className='mx-6 mt-20 animate-pulse text-center text-2xl'>
          There is no chat here, click on pencil icon at bottom and select
          someone to chat with.
        </p>
      ) : (
        connects.map((connect) => (
          <ConnectItem
            key={connect.id}
            id={`/home/${connect.id}`}
            profilePhoto={connect.profilePhoto}
            profileColor={connect.profileColor}
            firstName={connect.firstName}
            lastName={connect.lastName}
            lastSender={connect.lastSender}
            lastMessage={connect.lastMessage}
            lastMessageTime={connect.lastMessageTime}
          />
        ))
      )}
    </div>
  );
}
