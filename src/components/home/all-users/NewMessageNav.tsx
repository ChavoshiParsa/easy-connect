import Link from 'next/link';
import Icon from '../../UI/CustomIcon';

export default function NewMessageNav() {
  return (
    <div className='sticky top-0 z-30 flex w-full items-center justify-start rounded-t-lg bg-[#171d2dc4] px-2 py-1.5 backdrop-blur-lg'>
      <Link
        className='link mr-4 cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        href='/home'
      >
        <Icon size='16px' name='back' />
      </Link>
      <span className='text-lg font-bold text-slate-300'>New Message</span>
      <button className='link ml-auto cursor-pointer rounded-full p-2 transition hover:bg-slate-700'>
        <Icon size='22px' name='magnifier' />
      </button>
    </div>
  );
}
