import { randomNumber } from '@/lib/auth';

export default function ProfilePhoto(props) {
  const { profilePhoto, name, lastName } = props;

  if (profilePhoto === '') {
    let firstLetter = Array.from(name)[0];
    if (lastName !== '') {
      firstLetter += Array.from(lastName)[0];
    }
    firstLetter = firstLetter.toUpperCase();
    const randomNum = randomNumber(0, colors.length - 1);
    const randomFromColor = 'from-' + colors[randomNum] + '-500';
    const randomToColor = 'to-' + colors[randomNum] + '-300';
    return (
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-t  font-bold text-white ${randomFromColor} ${randomToColor}`}
      >
        <span className='absolute'>{firstLetter}</span>
      </div>
    );
  }

  return <div className='overflow-hidden rounded-full'>{/* <Image /> */}</div>;
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
