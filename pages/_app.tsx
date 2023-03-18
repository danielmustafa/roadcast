import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" />
      <Component {...pageProps} />
    </>
  )
}
