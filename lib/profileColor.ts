import { randomNumber } from './auth';

export function generateProf(): string {
  const colors: string[] = [
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

  const randomNum: number = randomNumber(0, colors.length - 1);
  const profileColor: string = colors[randomNum];
  return profileColor;
}
