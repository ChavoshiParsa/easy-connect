interface DividerLineProps {
  centralText: string;
}

const DividerLine: React.FC<DividerLineProps> = ({ centralText }) => {
  return (
    <div className='my-3 flex w-full items-center justify-center'>
      <hr className='w-full border-t border-[#303030] ' />
      <p className='mx-3 text-[#696969]'>{centralText}</p>
      <hr className='w-full border-t border-[#303030] ' />
    </div>
  );
};

export default DividerLine;
