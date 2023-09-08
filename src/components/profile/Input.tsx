import { ChangeEvent, FocusEvent, MouseEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
  value: string;
  editable: boolean;
  type: string;
}

export default function Input(props: InputProps) {
  return (
    <div className='w-full' onClick={props.onClick}>
      <label className='ml-1 text-base text-slate-300 md:text-lg'>
        {props.label}
      </label>
      <input
        className='mt-0.5 w-full rounded-lg border border-[#c0c0c0] bg-[#101010f8] px-3 py-4 outline-0 md:mt-1 md:px-5'
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        onFocus={props.onFocus}
        autoComplete='off'
        disabled={!props.editable}
      />
    </div>
  );
}
