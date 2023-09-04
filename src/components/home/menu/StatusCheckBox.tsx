import { reverseStatus } from '@/src/app/actions/user-status';
import { useState } from 'react';

export default function StatusCheckBox({
  email,
  status,
}: {
  email: string;
  status: string;
}) {
  const [isOnline, setIsOnline] = useState<boolean>(status === 'online');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let statusText = isOnline ? 'Online :)' : 'Offline :(';
  let translate = isOnline ? 'translateX(20px)' : 'translateX(0)';
  let color = isOnline ? 'rgb(100 250 100)' : 'rgb(10 10 10)';
  let opacity = isLoading ? '0.4' : '1';

  const statusHandler = async () => {
    if (isLoading) return;
    setIsOnline((prev) => !prev);
    setIsLoading(true);
    try {
      const res = await reverseStatus(email);
    } catch (error) {
      console.log(error);
      setIsOnline((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='z-50 flex items-center justify-center space-x-2'>
      <span className='text-lg font-bold text-slate-400'>
        {isLoading ? 'wait ...' : statusText}
      </span>
      <div
        className='flex h-5 w-10 translate-x-0 cursor-pointer items-center justify-start rounded-full bg-zinc-950 px-0.5 transition duration-500'
        style={{ backgroundColor: color, opacity }}
        onClick={statusHandler}
      >
        <div
          className='h-4 w-4 rounded-full bg-zinc-700 transition duration-500'
          style={{ transform: translate }}
        />
      </div>
    </div>
  );
}
