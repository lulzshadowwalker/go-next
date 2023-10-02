import Head from 'next/head'
import Image from 'next/image'
import { Prata } from 'next/font/google'
import s from '@/styles/home.module.css'
import Header from '@/components/header'
import Layout from '@/components/layout'
import PostCard from '@/components/home/post-card'

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
      <Layout>
        <main className={s.main}>
          <h1 className={s.title}>Venture Through Stories of a World Beyond</h1>
          <div className={s.posts}>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </main>
      </Layout>
    </>
  )
}
