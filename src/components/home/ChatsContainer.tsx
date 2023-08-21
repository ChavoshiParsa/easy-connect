import ChatItem from './ChatItem';

export default function ChatsContainer() {
  return (
    <div className='relative flex w-full flex-col items-center justify-start space-y-1 bg-black'>
      {FakeApi.map((connect) => (
        <ChatItem
          profilePhoto={connect.profilePhoto}
          name={connect.name}
          lastName={connect.lastName}
          lastSender={connect.lastSender}
          lastSenderMessage={connect.lastSenderMessage}
          lastMessageTime={connect.lastMessageTime}
        />
      ))}
    </div>
  );
}

const FakeApi = [
  {
    profilePhoto: '',
    name: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
  },
  {
    profilePhoto: '',
    name: 'Mahdi',
    lastName: 'Asadi',
    lastSender: 'Y',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '3:00 PM',
  },
  {
    profilePhoto: '',
    name: 'Mahdi',
    lastName: 'Asadi',
    lastSender: 'Y',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '3:00 PM',
  },
];
