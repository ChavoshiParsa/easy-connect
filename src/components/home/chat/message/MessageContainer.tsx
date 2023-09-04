'use client';

import MessageItem from './MessageItem';
import useSWR from 'swr';
import axios from 'axios';
import Loading from '@/src/app/loading';
import { useParams } from 'next/navigation';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function MessageContainer() {
  const params = useParams();

  const { data: users, isLoading } = useSWR(
    `/api/get-messages?connectId=${params.connect}`,
    fetcher,
    {
      refreshInterval: 100,
      revalidateOnFocus: true,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <div className='relative z-10 mb-14 flex w-full flex-col overflow-y-scroll px-2 pt-20 md:mb-20 md:w-9/12'>
      {/*
      messages.map((message) => (
        <MessageItem
          key={message.id}
          type={message.type}
          timeSent={message.createdAt}
          messageText={message.text}
          messageStatus={message.status}
        />
      ))
      */}
    </div>
  );
}

// const messages = []; --> server realtime
