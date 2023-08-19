'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AlertProps {
  status: string;
  title: string;
  message: string;
}

const Alert = (props: AlertProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  let statusColor;

  switch (props.status) {
    case 'success':
      statusColor = ' bg-emerald-300';
      break;
    case 'pending':
      statusColor = ' bg-blue-300';
      break;
    case 'error':
      statusColor = ' bg-rose-300';
      break;
    default:
      statusColor = ' bg-white';
  }

  return mounted
    ? createPortal(
        <div
          className={
            'absolute right-3 top-3 flex flex-col items-start justify-center rounded-md px-3 py-2 text-black' +
            statusColor
          }
        >
          <h1 className='text-lg'>{props.title}</h1>
          <p>{props.message}</p>
        </div>,
        document.body
      )
    : null;
};

export default Alert;
