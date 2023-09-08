import Image from 'next/image';
import Link from 'next/link';

export default function NewMessageNav() {
  return (
    <div className='sticky top-0 z-30 flex w-full items-center justify-start rounded-t-lg bg-[#171d2dc4] px-2 py-1.5 backdrop-blur-lg'>
      <Link
        className='link mr-4 cursor-pointer rounded-full p-2 transition hover:bg-slate-700'
        href='/home'
      >
        <CustomIcon size='16px' name='back' />
      </Link>
      <span className='text-lg font-bold text-slate-300'>New Message</span>
      <button className='link ml-auto cursor-pointer rounded-full p-2 transition hover:bg-slate-700'>
        <CustomIcon size='22px' name='magnifier' />
      </button>
    </div>
  );
}

const CustomIcon = (props: { name: string; size: string }) => {
  return (
    <Image
      src={`/icons/${props.name}.svg`}
      alt={`${props.name} icon`}
      width={20}
      height={20}
      sizes='100vw'
      style={{
        width: props.size,
        height: 'auto',
      }}
    />
  );
};
