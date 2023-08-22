import { randomNumber } from '@/lib/auth';
import Image from 'next/image';

interface ProfilePhotoProps {
  profilePhoto: string;
  name: string;
  lastName: string;
  size: string;
}

export default function ProfilePhoto(props: ProfilePhotoProps) {
  const { profilePhoto, name, lastName, size } = props;

  if (profilePhoto !== '') {
    return (
      <div className='overflow-hidden rounded-full'>
        <Image
          style={{
            objectFit: 'cover',
          }}
          fill
          src={profilePhoto}
          alt='Profile Photo'
          priority
          sizes='100vw'
        />
      </div>
    );
  }

  let firstLetter = Array.from(name)[0];
  if (lastName !== '') firstLetter += Array.from(lastName)[0];
  firstLetter = firstLetter.toUpperCase();

  const randomNum = randomNumber(0, colors.length - 1);
  const fromColor = 'from-' + colors[randomNum] + '-500';
  const toColor = 'to-' + colors[randomNum] + '-300';

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-t font-bold text-white ${fromColor} ${toColor}`}
      style={{ width: size, height: size }}
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
