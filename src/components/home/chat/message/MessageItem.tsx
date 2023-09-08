import Image from 'next/image';

export interface MessageProps {
  id: string;
  messageText: string;
  timeSent: string;
  type: string;
  messageStatus: string;
}

export default function MessageItem(props: MessageProps) {
  let pos;
  let bgcolor;
  let rounded;
  if (props.type === 'received') {
    pos = 'start';
    bgcolor = 'bg-zinc-900';
    rounded = '18px 18px 18px 0';
  } else if (props.type === 'posted') {
    pos = 'end';
    bgcolor = 'bg-indigo-800 ';
    rounded = '18px 18px 0 18px';
  }

  let messageStatusIcon;

  if (props.messageStatus === 'sent') {
    messageStatusIcon = (
      <div className='-mr-3'>
        <CustomIcon name='single-tick' size='18px' />
      </div>
    );
  } else if (props.messageStatus === 'seen') {
    messageStatusIcon = (
      <div className='-mr-3'>
        <CustomIcon name='double-tick' size='18px' />
      </div>
    );
  } else if (props.messageStatus === 'load') {
    messageStatusIcon = (
      <div className='-mr-3 ml-1'>
        <CustomIcon name='timer' size='12px' />
      </div>
    );
  }

  return (
    <div
      className={`${bgcolor} mb-1.5 flex w-auto max-w-[270px] flex-col items-center justify-center px-4 pb-0.5 pt-1`}
      style={{ alignSelf: pos, borderRadius: rounded }}
    >
      <span className='self-start text-slate-200'>{props.messageText}</span>
      <div className='flex flex-row items-center justify-center self-end'>
        <span className=' text-xs text-slate-400'>{props.timeSent}</span>
        {props.type === 'posted' && messageStatusIcon}
      </div>
    </div>
  );
}

const CustomIcon = (props: { name: string; size: string }) => {
  return (
    <Image
      src={`/icons/${props.name}.svg`}
      alt={`${props.name} icon`}
      width={20}
      height={20}
      sizes='100vw'
      style={{
        width: props.size,
        height: 'auto',
      }}
    />
  );
};
