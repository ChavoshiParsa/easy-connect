'use client';

import { ChangeEvent, useState } from 'react';
import Icon from '../../ui/Icon';
import { sendMessage } from '@/src/app/actions/message-action';

export default function InputMessage() {
  const [enteredMassage, setEnteredMassage] = useState<string>('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredMassage(e.target.value);
    // set server he is typing... with useEffect and more
  };

  return (
    <div className='absolute bottom-0 z-30 flex w-full items-center justify-start bg-[#171d2db9] px-2 py-1.5 backdrop-blur-xl md:px-4 lg:bottom-4 lg:w-9/12 lg:rounded-xl lg:py-2'>
      <button className='link cursor-pointer rounded-full p-1 transition hover:bg-slate-800'>
        <Icon size='38px' name='emoji' />
      </button>
      <form
        className='flex w-full items-center justify-start'
        action={sendMessage}
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
            <Icon size='40px' name='send' />
          </button>
        )}
      </form>
      {!enteredMassage && (
        <button className='link cursor-pointer rounded-full p-0 transition hover:bg-slate-800'>
          <Icon size='48px' name='attach' />
        </button>
      )}
    </div>
  );
}
