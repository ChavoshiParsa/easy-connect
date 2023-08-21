import ProfilePhoto from './ProfilePhoto';

export default function ChatItem(props) {
  const {
    profilePhoto,
    name,
    lastName,
    lastSender,
    lastSenderMessage,
    lastMessageTime,
  } = props;

  return (
    <div className='flex flex-row'>
      <ProfilePhoto
        profilePhoto={profilePhoto}
        name={name}
        lastName={lastName}
      />
    </div>
  );
}
