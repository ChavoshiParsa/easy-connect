import ChatItem from './ChatItem';

export default function ChatsContainer() {
  return (
    <div className='relative flex w-full flex-col items-center justify-start space-y-px'>
      {FakeApi.length === 0 ? (
        <p className='mx-6 mt-20 animate-pulse text-center text-2xl'>
          There is no chat here, click on pencil icon at bottom and select
          someone to chat with.
        </p>
      ) : (
        FakeApi.map((connect) => (
          <ChatItem
            profilePhoto={connect.profilePhoto}
            name={connect.name}
            lastName={connect.lastName}
            lastSender={connect.lastSender}
            lastSenderMessage={connect.lastSenderMessage}
            lastMessageTime={connect.lastMessageTime}
          />
        ))
      )}
    </div>
  );
}

const FakeApi = [
  // {
  //   profilePhoto: '',
  //   name: 'Ali',
  //   lastName: 'Ahmadi',
  //   lastSender: 'I',
  //   lastSenderMessage: 'Hi, How ru?',
  //   lastMessageTime: '3:00 PM',
  // },
  // {
  //   profilePhoto: '',
  //   name: 'Mahdi',
  //   lastName: 'Asadi',
  //   lastSender: 'Y',
  //   lastSenderMessage: "I'm Ok",
  //   lastMessageTime: '8:13 AM',
  // },
  // {
  //   profilePhoto: '',
  //   name: 'Reza',
  //   lastName: 'mohamady',
  //   lastSender: 'I',
  //   lastSenderMessage: 'Her is grate',
  //   lastMessageTime: '2:50 PM',
  // },
  {
    profilePhoto: '',
    name: 'Parsa',
    lastName: 'Chavoshi',
    lastSender: 'I',
    lastSenderMessage: 'Her is grate',
    lastMessageTime: '5:38 PM',
  },
];
