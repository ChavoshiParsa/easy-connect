export default function ProfilePhoto(props) {
  const { profilePhoto, name, lastName } = props;

  let firstLetter = '';
  if (profilePhoto === '') {
    firstLetter = Array.from(name)[0];
    if (lastName !== '') {
      // firstLetter += Array.from(lastName)[0];
    }
    firstLetter = firstLetter.toUpperCase();
    return (
      <div className='flex items-center justify-center rounded-full bg-emerald-500 p-5 text-xl font-bold text-white'>
        <span>{firstLetter}</span>
      </div>
    );
  }

  return <div className='overflow-hidden rounded-full'></div>;
}

// firstLetter = name.substring(0, 1);
