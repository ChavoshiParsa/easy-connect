'use client';

import MessageItem, { MessageProps } from './MessageItem';
import useSWR from 'swr';
import axios from 'axios';
import Loading from '@/src/app/loading';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function MessageContainer() {
  const params = useParams();

  const {
    data: messages,
    isLoading,
  }: { data: MessageProps[]; isLoading: boolean } = useSWR(
    `/api/get-messages?connectId=${params.connect}`,
    fetcher,
    { refreshInterval: 100 }
  );

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) return <Loading />;

  return (
    <div
      className='relative z-10 mb-14 flex w-full flex-col overflow-y-scroll px-2 pt-20 md:mb-20 md:w-9/12'
      ref={chatContainerRef}
    >
      {messages?.map((message) => (
        <MessageItem
          key={message.id}
          id={message.id}
          type={message.type}
          timeSent={message.timeSent}
          messageText={message.messageText}
          messageStatus={message.messageStatus}
        />
      ))}
    </div>
  );
}

// const messages = []; --> server realtime
