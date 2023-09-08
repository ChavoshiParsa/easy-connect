import Image from 'next/image';

interface Props {
  name: string;
  size: string;
}

export default function CustomIcon(props: Props) {
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
}
