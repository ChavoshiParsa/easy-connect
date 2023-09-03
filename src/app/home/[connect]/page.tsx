// get user detail from id generated and chat details

import { prisma } from '@/prisma/prisma';
import ChatScreen from '@/src/components/home/chat/ChatScreen';
import Loading from '../../loading';

export default async ({ params }: { params: { connect: string } }) => {
  const connect = params.connect;
  const res = await prisma.user.findUnique({
    where: { id: connect },
    select: {
      profileColor: true,
      profilePhoto: true,
      isOnline: true,
      firstName: true,
      lastName: true,
    },
  });
  if (!res) return <Loading />;

  return <ChatScreen connect={res} />;
};
