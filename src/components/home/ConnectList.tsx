'use client';
import Loading from '@/src/app/loading';
import ConnectItem, { ConnectItemProps } from './ConnectItem';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function ConnectList() {
  const { data: connects, isLoading } = useSWR('/api/connects', fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
  });

  if (isLoading) return <Loading />;

  console.log(connects);

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
            connectId={`/home/${connect.id}`}
            profilePhoto={connect.profilePhoto}
            profileColor={connect.profileColor}
            firstName={connect.firstName}
            lastName={connect.lastName}
            lastSender={connect.lastSender}
            lastSenderMessage={connect.lastSenderMessage}
            lastMessageTime={connect.lastMessageTime}
          />
        ))
      )}
    </div>
  );
}
