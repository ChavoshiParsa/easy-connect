'use client';

import { useContextProvider } from '@/src/context/store';

const Alert: React.FC = () => {
  const { alert } = useContextProvider();
  let statusColor;

  switch (alert?.status) {
    case 'success':
      statusColor = ' bg-emerald-300';
      break;
    case 'pending':
      statusColor = ' bg-blue-300';
      break;
    case 'error':
      statusColor = ' bg-rose-300';
      break;
  }

  if (!alert) return;

  return (
    <div
      className={
        'absolute right-3 top-3 z-30 flex flex-col items-start justify-center rounded-md px-3 py-2 text-black' +
        statusColor
      }
    >
      <h1 className='text-lg'>{alert?.title}</h1>
      <p>{alert?.message}</p>
    </div>
  );
};

export default Alert;
