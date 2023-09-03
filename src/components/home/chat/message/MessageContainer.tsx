import MessageItem from './MessageItem';

export default function MessageContainer() {
  return (
    <div className='relative z-10 mb-14 flex w-full flex-col overflow-y-scroll px-2 pt-20 md:mb-20 md:w-9/12'>
      {/*
      messages.map((message) => (
        <MessageItem
          key={message.id}
          type={message.type}
          timeSent={message.createdAt}
          messageText={message.text}
          messageStatus={message.status}
        />
      ))
      */}
    </div>
  );
}

/*
type='received'
timeSent='8:58 PM'
messageText="I'm not Ok bro :("
messageStatus='sent'
*/

// first my message loads in array with type mapped post and status sent --> find with (email from session) --> connects --> messages
// then sender message loads with array type mapped received and status sent --> find with (connectId of my email and match) --> message

// sort array in order to time

// return array

// const messages = []; --> server realtime
