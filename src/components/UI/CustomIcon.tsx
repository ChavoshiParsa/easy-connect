import Image from 'next/image';

interface IconProps {
  name: string;
  size: string;
}

const CustomIcon = (props: IconProps) => {
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

export default CustomIcon;
