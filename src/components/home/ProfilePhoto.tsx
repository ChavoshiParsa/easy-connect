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
  const strSize = size + 'px';

  if (profilePhoto.length > 35) {
    return (
      <div
        className='relative flex items-center justify-center overflow-hidden rounded-full'
        style={{ width: strSize, height: strSize }}
      >
        <Image
          className='absolute'
          loader={imageLoader}
          src={profilePhoto}
          alt='Profile Photo'
          width={size}
          height={size}
          placeholder='blur'
        />
      </div>
    );
  }

  let firstLetter = 'No Name';
  if (firstName !== '' && firstName.length >= 3)
    firstLetter = Array.from(firstName)[0];
  if (lastName !== '' && lastName.length >= 3)
    firstLetter += Array.from(lastName)[0];

  if (firstLetter !== 'No Name') firstLetter = firstLetter.toUpperCase();

  let color = profilePhoto;
  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gradient-to-t font-bold text-white from-${color}-500 to-${color}-300`}
      style={{ width: strSize, height: strSize }}
    >
      <span className='absolute'>{firstLetter}</span>
    </div>
  );
}
