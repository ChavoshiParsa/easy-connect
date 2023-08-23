import Link from 'next/link';
import { ReactNode } from 'react';

interface MenuItemProps {
  children: ReactNode;
  link: string;
  text: string;
}
export default function MenuItem(props: MenuItemProps) {
  return (
    <Link
      className='link flex w-full items-center justify-start py-3 pl-4 hover:bg-zinc-800'
      key={props.text}
      href={props.link}
    >
      <div className='mr-8'>{props.children}</div>
      <h1 className='te'>{props.text}</h1>
    </Link>
  );
}
