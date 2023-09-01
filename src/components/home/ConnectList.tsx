import ConnectItem, { ConnectItemProps } from './ConnectItem';

export default function ConnectList({ users }: { users: ConnectItemProps[] }) {
  return (
    <div className='relative flex w-full flex-col items-center justify-start space-y-px'>
      {users.length === 0 ? (
        <p className='mx-6 mt-20 animate-pulse text-center text-2xl'>
          There is no chat here, click on pencil icon at bottom and select
          someone to chat with.
        </p>
      ) : (
        users.map((user) => (
          <ConnectItem
            key={user.connectId}
            connectId={`/home/${user.connectId}`}
            profilePhoto={user.profilePhoto}
            firstName={user.firstName}
            lastName={user.lastName}
            lastSender={user.lastSender}
            lastSenderMessage={user.lastSenderMessage}
            lastMessageTime={user.lastMessageTime}
          />
        ))
      )}
    </div>
  );
}
