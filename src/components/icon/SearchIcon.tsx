import Image from 'next/image';

export default function SearchIcon() {
  return (
    <Image
      className=''
      src='/icons/magnifier.svg'
      alt='magnifier icon'
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
