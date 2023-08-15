import Link from 'next/link';

export default () => {
  return (
    <>
      <div className='relative flex h-[90vh] w-screen justify-center'>
        <h1 className='mt-8 text-5xl'>Login Page</h1>
        <Link
          className='absolute bottom-8 left-8 self-start rounded-full bg-blue-700 px-10 py-2 text-xl'
          href='..'
        >
          go back
        </Link>
      </div>
    </>
  );
};
