import React, { ChangeEvent, FocusEvent, ReactNode } from 'react';

interface InputProps {
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className='relative mb-3 flex w-full flex-col items-center justify-center md:mb-5'>
      <input
        className='removeAutofill peer w-full rounded-md border border-[#1a1a1a] bg-[#0d0d0df8] px-5 py-3 outline-0'
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
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
};
export default Input;
