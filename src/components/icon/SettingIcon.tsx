import Image from 'next/image';

interface Props {
  size: string;
}

export default function OpenMenuIcon(props: Props) {
  return (
    <Image
      src='/icons/setting.svg'
      alt='hamburger icon'
      width={20}
      height={20}
      sizes='100vw'
      style={{
        width: props.size,
        height: 'auto',
      }}
    />
  );
}
