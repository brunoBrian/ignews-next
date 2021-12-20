import type { AppProps } from 'next/app'
import Head from 'next/head';

import styles from './styles.module.scss';

function Posts({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 de outubro de 2010</time>
            <strong>Creating a new repo</strong>
            <p>In this guide, we will learn how to create a new project using Lerna</p>
          </a>
          <a href='#'>
            <time>12 de outubro de 2010</time>
            <strong>Creating a new repo</strong>
            <p>In this guide, we will learn how to create a new project using Lerna</p>
          </a>
          <a href='#'>
            <time>12 de outubro de 2010</time>
            <strong>Creating a new repo</strong>
            <p>In this guide, we will learn how to create a new project using Lerna</p>
          </a>
        </div>
      </main>
    </>
  )
}

export default Posts;
