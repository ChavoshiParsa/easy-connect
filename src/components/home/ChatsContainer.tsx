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
            key={connect.connectId}
            connectId={`/home/${connect.connectId}`}
            profilePhoto={connect.profilePhoto}
            firstName={connect.firstName}
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
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Noori',
    lastSender: 'I',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '8:13 AM',
    connectId: '5698',
  },
  {
    profilePhoto: '',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
    connectId: '8408',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Naderali',
    lastSender: 'Y',
    lastSenderMessage: 'He is great',
    lastMessageTime: '2:50 PM',
    connectId: '1292',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Noori',
    lastSender: 'I',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '8:13 AM',
    connectId: '5698',
  },
  {
    profilePhoto: '',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
    connectId: '8408',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Naderali',
    lastSender: 'Y',
    lastSenderMessage: 'He is great',
    lastMessageTime: '2:50 PM',
    connectId: '1292',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Noori',
    lastSender: 'I',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '8:13 AM',
    connectId: '5698',
  },
  {
    profilePhoto: '',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
    connectId: '8408',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Naderali',
    lastSender: 'Y',
    lastSenderMessage: 'He is great',
    lastMessageTime: '2:50 PM',
    connectId: '1292',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Noori',
    lastSender: 'I',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '8:13 AM',
    connectId: '5698',
  },
  {
    profilePhoto: '',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
    connectId: '8408',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Naderali',
    lastSender: 'Y',
    lastSenderMessage: 'He is great',
    lastMessageTime: '2:50 PM',
    connectId: '1292',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Noori',
    lastSender: 'I',
    lastSenderMessage: "I'm Ok",
    lastMessageTime: '8:13 AM',
    connectId: '5698',
  },
  {
    profilePhoto: '',
    firstName: 'Ali',
    lastName: 'Ahmadi',
    lastSender: 'I',
    lastSenderMessage: 'Hi, How ru?',
    lastMessageTime: '3:00 PM',
    connectId: '8408',
  },
  {
    profilePhoto: '',
    firstName: 'AmirHossein',
    lastName: 'Naderali',
    lastSender: 'Y',
    lastSenderMessage: 'He is great',
    lastMessageTime: '2:50 PM',
    connectId: '1292',
  },
];
