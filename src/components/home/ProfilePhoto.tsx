import { randomNumber } from '@/lib/auth';
import Image from 'next/image';

export default function ProfilePhoto(props) {
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
          alt='Picture of Galaxy'
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
  const randomFromColor = 'from-' + colors[randomNum] + '-500';
  const randomToColor = 'to-' + colors[randomNum] + '-300';

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-t  font-bold text-white ${randomFromColor} ${randomToColor}`}
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
