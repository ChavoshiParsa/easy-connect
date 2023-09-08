'use client';

import MessageItem, { MessageProps } from './MessageItem';
import useSWR from 'swr';
import axios from 'axios';
import Loading from '@/src/app/loading';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ActionType, useContextProvider } from '@/src/context/store';
// import useSound from 'use-sound';
import { newMessageOff } from '@/src/app/actions/new-message';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function MessageContainer() {
  const { messages: messagesState, dispatch } = useContextProvider();
  const params = useParams();

  const {
    data: messages,
    isLoading,
  }: { data: MessageProps[]; isLoading: boolean } = useSWR(
    `/api/get-messages?connectId=${params.connect}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // const [playOn] = useSound<any>('/sounds/bip1.wav', { volume: 0.3 }) as any;

  useEffect(() => {
    dispatch({
      type: ActionType.SET_MESSAGES,
      payload: { connect: params.connect as string, messages },
    });
  }, [dispatch, messages, params.connect]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (
      messagesState.length !== 0 &&
      messagesState[messagesState.length - 1].type === 'received'
    ) {
      // playOn();
      newMessageOff(params.connect as string);
    }
  }, [messagesState, params.connect]);

  if (isLoading) return <Loading />;

  return (
    <div
      className='relative z-10 mb-14 flex w-full flex-col overflow-y-scroll px-2 pt-20 md:mb-20 md:w-9/12'
      ref={chatContainerRef}
    >
      {!messagesState ? (
        <p className='mb-72 flex w-auto animate-pulse flex-col items-center justify-center px-4 pb-0.5 pt-1 text-center text-xl text-white md:text-2xl'>
          send something to create a connection with
        </p>
      ) : (
        messagesState?.map((message) => (
          <MessageItem
            key={message.id}
            id={message.id}
            type={message.type}
            timeSent={message.timeSent}
            messageText={message.messageText}
            messageStatus={message.messageStatus}
          />
        ))
      )}
    </div>
  );
}
