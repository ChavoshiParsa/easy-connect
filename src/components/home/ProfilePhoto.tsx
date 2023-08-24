import { randomNumber } from '@/lib/auth';
import Image, { ImageLoader } from 'next/image';

interface ProfilePhotoProps {
  profilePhoto: string;
  firstName: string;
  lastName: string;
  size: number;
}

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://uploadthing.com/f/${src}?w=${width}&q=${quality || 25}`;
};

export default function ProfilePhoto(props: ProfilePhotoProps) {
  const { profilePhoto, firstName, lastName, size } = props;
  let strSiz = size + 'px';

  if (profilePhoto !== '') {
    return (
      <div
        className='relative flex items-center justify-center overflow-hidden rounded-full'
        style={{ width: strSiz, height: strSiz }}
      >
        <Image
          className='absolute'
          loader={imageLoader}
          src={profilePhoto}
          alt='Profile Photo'
          width={size}
          height={size}
        />
      </div>
    );
  }

  let firstLetter = Array.from(firstName)[0];
  if (lastName !== '') firstLetter += Array.from(lastName)[0];
  firstLetter = firstLetter.toUpperCase();

  const randomNum = randomNumber(0, colors.length - 1);
  const fromColor = 'from-' + colors[randomNum] + '-500';
  const toColor = 'to-' + colors[randomNum] + '-300';

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-t font-bold text-white ${fromColor} ${toColor}`}
      style={{ width: strSiz, height: strSiz }}
    >
      <span className='absolute'>{firstLetter}</span>
    </div>
  );
}

const colors = [
  'sky',
  'blue',
  'cyan',
  'emerald',
  'lime',
  'indigo',
  'violet',
  'pink',
  'rose',
  'orange',
  'amber',
  'red',
  'teal',
  'green',
  'purple',
];
