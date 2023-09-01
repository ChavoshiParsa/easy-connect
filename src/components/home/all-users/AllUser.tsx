import { prisma } from '@/prisma/prisma';
import UserList from '../UserList';

export default async function AllUser() {
  let res = await prisma.user.findMany();
  console.log(res);

  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <h1 className=''>Select some one to chat.</h1>
      <UserList />
    </div>
  );
}
