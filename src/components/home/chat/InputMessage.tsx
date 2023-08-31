'use client';

import { ChangeEvent, useState } from 'react';
import Icon from '../../ui/Icon';

export default function InputMessage() {
  const [enteredMassage, setEnteredMassage] = useState<string>('');

  return (
    <div className='absolute bottom-0 z-30 flex w-full items-center justify-start bg-[#171d2db9] px-2 py-1.5 backdrop-blur-xl md:px-4 lg:bottom-4 lg:w-9/12 lg:rounded-xl lg:py-2'>
      <button className='link cursor-pointer rounded-full p-1 transition hover:bg-slate-800'>
        <Icon size='38px' name='emoji' />
      </button>
      <form className='relative flex w-full flex-col items-center justify-center'>
        <input
          className='removeAutofill w-full bg-transparent px-2 py-2 text-lg outline-0'
          autoComplete='off'
          name='message'
          type='text'
          placeholder='Message'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEnteredMassage(e.target.value)
          }
          value={enteredMassage}
          required
        />
      </form>
      {enteredMassage && (
        <button className='link cursor-pointer rounded-full bg-[] p-1 transition hover:bg-slate-800 '>
          <Icon size='42px' name='send' />
        </button>
      )}
      {!enteredMassage && (
        <button className='link cursor-pointer rounded-full p-0 transition hover:bg-slate-800'>
          <Icon size='48px' name='attach' />
        </button>
      )}
    </div>
  );
}
