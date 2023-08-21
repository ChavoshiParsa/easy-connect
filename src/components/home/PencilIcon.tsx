import Image from 'next/image';

export default function PencilIcon() {
  return (
    <div className='absolute bottom-6 right-6 rounded-full bg-[#03A9F1] p-3'>
      <Image
        className=''
        src='/icons/pencil.svg'
        alt='pencil icon'
        width={30}
        height={30}
        sizes='100vw'
        style={{
          width: '26px',
          height: 'auto',
        }}
      />
    </div>
  );
}
