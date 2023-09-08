import { Roboto_Flex } from 'next/font/google';
import MenuItem from './MenuItem';
import CustomIcon from '../../ui/CustomIcon';

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
        <CustomIcon size='30px' name='profile' />
      </MenuItem>
      <MenuItem text='New Message' link='/home/new-message'>
        <CustomIcon size='30px' name='message' />
      </MenuItem>
      <MenuItem text='Account' link='/account'>
        <CustomIcon size='30px' name='account' />
      </MenuItem>
      <MenuItem text='Settings' link='/settings'>
        <CustomIcon size='30px' name='settings' />
      </MenuItem>
      <MenuItem text='Send FeedBacks' link='#'>
        <CustomIcon size='30px' name='feedback' />
      </MenuItem>
    </ul>
  );
}
