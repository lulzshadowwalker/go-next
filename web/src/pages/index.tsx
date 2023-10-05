import PostCard from '@/components/home/post-card'
import Layout from '@/components/layout'
import s from '@/styles/home.module.css'
import { showToast } from '@/utils/utils'
import axios from 'axios'
import { format } from 'date-fns'
import { Prata } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
})

export default function Home() {
  const endpoint = `http://localhost:3000/posts`

  const [posts, setPosts] = useState<Post[] | null>()

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => res.data)
      .then((data) => data.data as Post[])
      .then((posts) => {
        const aboba = posts?.map((e) => {
          return {
            ...e,
            created_at: format(
              new Date(e.created_at ?? Date.now()),
              'MMMM dd yyy'
            ),
          }
        })
        return setPosts(aboba)
      })
      .catch((_) => showToast('cannot fetch posts', 'error'))
  }, [endpoint])

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
            {posts?.map((p, i) => (
              <PostCard post={p} key={i} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  )
}
