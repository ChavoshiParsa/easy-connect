'use client';

import { prisma } from '@/prisma/prisma';
import ChatScreen from '@/src/components/home/chat/ChatScreen';
import useSWR from 'swr';
import axios from 'axios';
import Loading from '@/src/app/loading';

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default ({ params }: { params: { connect: string } }) => {
  const connect = params.connect;

  const { data: connectStatus, isLoading } = useSWR(
    `/api/connect-status?connectId=${connect}`,
    fetcher,
    { refreshInterval: 100 }
  );

  if (!connectStatus) return <Loading />;
  let isTyping = connectStatus.isTyping;

  if (typeof connectStatus.isTyping === 'undefined') {
    isTyping = false;
  }

  return <ChatScreen connect={connectStatus.info} isTyping={isTyping} />;
};
