'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CustomIcon from '../../ui/CustomIcon';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { setIsTyping } from '@/src/app/actions/connect-status';
import { ActionType, useContextProvider } from '@/src/context/store';
// import useSound from 'use-sound';

export default function InputMessage() {
  const { dispatch } = useContextProvider();

  const [enteredMassage, setEnteredMassage] = useState<string>('');
  const { data, status } = useSession();
  const params = useParams();

  if (status === 'loading' || !data || !data.user) return;

  const email = data?.user?.email as string;
  const connect = params.connect as string;
  // const [playOn] = useSound('/sounds/bip3.wav', { volume: 0.2 });
  // const [sendOn] = useSound('/sounds/bip2.wav', { volume: 0.2 });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredMassage(e.target.value);
    // playOn();
  };

  useEffect(() => {
    let timer: any;
    timer = setTimeout(() => {
      if (enteredMassage !== '') setIsTyping(email, connect);
    }, 1000);

    return () => {
      if (enteredMassage !== '') setIsTyping(email, connect);
      clearTimeout(timer);
    };
  }, [enteredMassage]);

  const sendMessageHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = enteredMassage;

    if (typeof message !== 'string' || message.length === 0) {
      throw new Error('Invalid message');
    }

    const now = new Date();

    const messages = [
      {
        id: Date.now().toString(36),
        messageText: message,
        timeSent: `${now.getHours()}:${now.getMinutes()} ${
          now.getHours() >= 12 ? 'PM' : 'AM'
        }`,
        type: 'posted',
        messageStatus: 'load',
      },
    ];

    dispatch({
      type: ActionType.ADD_MESSAGES,
      payload: { connect: params.connect as string, messages },
    });

    // sendOn();
    setEnteredMassage('');
    await axios.post('/api/messages', {
      message,
      sender: email,
      connect: connect,
    });
  };

  return (
    <div className='absolute bottom-0 z-30 flex w-full items-center justify-start bg-[#171d2db9] px-2 py-1.5 backdrop-blur-xl md:px-4 lg:bottom-4 lg:w-9/12 lg:rounded-xl lg:py-2'>
      <button className='link cursor-pointer rounded-full p-1 transition hover:bg-slate-800'>
        <CustomIcon size='38px' name='emoji' />
      </button>
      <form
        className='flex w-full items-center justify-start'
        onSubmit={sendMessageHandler}
      >
        <div className='relative flex w-full items-center justify-center'>
          <input
            className='removeAutofill w-full bg-transparent px-2 py-2 text-lg outline-0'
            autoComplete='off'
            name='message'
            type='text'
            placeholder='Message'
            onChange={changeHandler}
            value={enteredMassage}
            required
          />
        </div>
        {enteredMassage && (
          <button
            className='link cursor-pointer rounded-full bg-[] p-1 transition hover:bg-slate-800'
            type='submit'
          >
            <CustomIcon size='40px' name='send' />
          </button>
        )}
      </form>
      {!enteredMassage && (
        <button className='link cursor-pointer rounded-full p-0 transition hover:bg-slate-800'>
          <CustomIcon size='48px' name='attach' />
        </button>
      )}
    </div>
  );
}
