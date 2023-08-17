'use client';

import React, { RefObject } from 'react';

// import { ChangeEvent, FocusEvent } from 'react';

interface InputProps {
  name: string;
  type: string;
  // onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  // onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  // value: string;
  label: string;
  ref: RefObject<HTMLInputElement>;
}

const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className='relative flex w-full flex-col items-center justify-center'>
        <input
          className='removeAutofill peer w-full rounded-md border border-[#1a1a1a] bg-[#0d0d0df8] px-5 py-3 outline-0'
          name={props.name}
          type={props.type}
          // onChange={props.onChange}
          // onBlur={props.onBlur}
          // value={props.value}
          ref={ref}
          required
        />
        <span
          className='pointer-events-none absolute left-0 pl-5 text-slate-500 transition duration-200
        peer-valid:-translate-x-1 peer-valid:-translate-y-6 peer-valid:text-sm peer-valid:text-sky-500
        peer-focus:-translate-x-1 peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-sky-500
      '
        >
          {props.label}
        </span>
      </div>
    );
  }
);

export default Input;
