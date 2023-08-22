import Image from 'next/image';

export default function PencilIcon() {
  return (
    <Image
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
  );
}
