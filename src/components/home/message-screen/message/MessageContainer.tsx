import MessageItem from './MessageItem';

export default function MessageContainer() {
  return (
    <div className='relative z-10 mb-14 flex w-full flex-col overflow-y-scroll px-2 pt-20 md:mb-20 md:w-9/12'>
      <MessageItem
        type='posted'
        timeSent='9:28 PM'
        messageText='How are you? :)How are you? :)How are you? :)How are you? :)'
        messageStatus='seen'
      />
      <MessageItem
        type='posted'
        timeSent='9:28 PM'
        messageText='How are you? :)How are you? :)How are you? :)How are you? :)'
        messageStatus='seen'
      />
      <MessageItem
        type='posted'
        timeSent='9:28 PM'
        messageText='How are you? :)How are you? :)How are you? :)How are you? :)'
        messageStatus='seen'
      />
      <MessageItem
        type='received'
        timeSent='8:58 PM'
        messageText="I'm not Ok bro :("
        messageStatus='sent'
      />
      <MessageItem
        type='received'
        timeSent='8:58 PM'
        messageText="I'm not Ok bro :("
        messageStatus='sent'
      />
      <MessageItem
        type='posted'
        timeSent='9:28 PM'
        messageText='How are you? :)How are you? :)How are you? :)How are you? :)'
        messageStatus='seen'
      />
      <MessageItem
        type='posted'
        timeSent='9:28 PM'
        messageText='How are you? :)How are you? :)How are you? :)How are you? :)'
        messageStatus='seen'
      />
      <MessageItem
        type='received'
        timeSent='8:58 PM'
        messageText="I'm not Ok bro :("
        messageStatus='sent'
      />
      <MessageItem
        type='posted'
        timeSent='9:28 PM'
        messageText='How are you? :)How are you? :)How are you? :)How are you? :)'
        messageStatus='seen'
      />
      <MessageItem
        type='received'
        timeSent='8:58 PM'
        messageText="I'm not Ok bro :("
        messageStatus='sent'
      />
      <MessageItem
        type='received'
        timeSent='8:58 PM'
        messageText="I'm not Ok bro :("
        messageStatus='sent'
      />
    </div>
  );
}
