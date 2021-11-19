import Head from 'next/head'
import type { AppProps } from 'next/app'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
