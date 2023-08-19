import Link from 'next/link';

export default () => {
  return (
    <>
      <>Home page</>
      <Link href='..' className='text-indigo-700'>
        back
      </Link>
    </>
  );
};
