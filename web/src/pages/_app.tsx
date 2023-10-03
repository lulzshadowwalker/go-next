import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// TODO implement smooth scrolling

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
