import ProfileIcon from '&/icon/ProfileIcon';
import AccountIcon from '&/icon/AccountIcon';
import SettingIcon from '&/icon/SettingIcon';
import MessageIcon from '&/icon/MessageIcon';
import Feedback from '&/icon/Feedback';
import { Roboto_Flex } from 'next/font/google';
import MenuItem from './MenuItem';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '600',
});

export default function MenuList() {
  return (
    <ul
      className={
        'flex w-full flex-col items-start justify-center divide-y divide-zinc-950 ' +
        roboto.className
      }
    >
      <MenuItem text='Profile' link='/profile'>
        <ProfileIcon size='30px' />
      </MenuItem>
      <MenuItem text='New Message' link='/all-users'>
        <MessageIcon size='30px' />
      </MenuItem>
      <MenuItem text='Account' link='/account'>
        <AccountIcon size='30px' />
      </MenuItem>
      <MenuItem text='Settings' link='/settings'>
        <SettingIcon size='30px' />
      </MenuItem>
      <MenuItem text='Send FeedBacks' link='#'>
        <Feedback size='30px' />
      </MenuItem>
    </ul>
  );
}
