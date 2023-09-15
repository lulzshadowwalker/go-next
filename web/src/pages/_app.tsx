import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${cinzel.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
