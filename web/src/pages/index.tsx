import Head from 'next/head'
import Image from 'next/image'
import { Prata } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Booboo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
      </main>
    </>
  )
}
