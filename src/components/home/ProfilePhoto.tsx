'use client';
import Image, { ImageLoader } from 'next/image';
import { useState } from 'react';

interface ProfilePhotoProps {
  profilePhoto: string | null;
  profileColor: string;
  firstName: string;
  lastName: string | null;
  size: number;
}

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `https://uploadthing.com/f/${src}?w=${width}&q=${quality || 25}`;
};

export default function ProfilePhoto(props: ProfilePhotoProps) {
  const { profilePhoto, profileColor, firstName, lastName, size } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  let firstLetter = 'No Name';
  if (firstName !== '' && firstName.length >= 3)
    firstLetter = Array.from(firstName)[0];
  if (lastName !== '' && lastName !== null && lastName.length >= 3)
    firstLetter += Array.from(lastName)[0];
  if (firstLetter !== 'No Name') firstLetter = firstLetter.toUpperCase();

  let color = profileColor;
  const strSize = size + 'px';

  setTimeout(() => {
    setBackgroundImage(isLoaded ? 'none' : '');
  }, 500);

  if (profilePhoto !== '' && profilePhoto !== null) {
    let opacity = isLoaded ? '1' : '0';
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-t font-bold text-white from-${color}-500 to-${color}-300 border border-zinc-900`}
        style={{
          width: strSize,
          height: strSize,
          backgroundImage,
        }}
      >
        <span className='absolute'>{firstLetter}</span>

        <Image
          className='absolute transition duration-500'
          style={{ opacity }}
          loader={imageLoader}
          src={profilePhoto}
          alt='Profile Photo'
          width={size}
          height={size}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-t font-bold text-white from-${color}-500 to-${color}-300`}
      style={{ width: strSize, height: strSize }}
    >
      <span className='absolute'>{firstLetter}</span>
    </div>
  );
}
