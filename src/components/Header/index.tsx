import Image from 'next/image'
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" width={110} height={30} />
        <nav>
          <ActiveLink href='/' activeClass={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href='/posts' activeClass={styles.active} prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}