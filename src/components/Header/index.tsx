import Link from 'next/link';
import { ReactElement } from 'react';
import Logo from '../Logo';
import style from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={style.headerContainer}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </header>
  );
}
