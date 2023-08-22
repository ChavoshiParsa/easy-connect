import Image from 'next/image';

export default function OpenMenuIcon() {
  return (
    <Image
      src='/icons/hamburger.svg'
      alt='hamburger icon'
      width={20}
      height={20}
      sizes='100vw'
      style={{
        width: '22px',
        height: 'auto',
      }}
    />
  );
}
