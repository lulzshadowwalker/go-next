import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css'

// TODO implement smooth scrolling

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
