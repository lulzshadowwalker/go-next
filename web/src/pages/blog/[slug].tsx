/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import s from '@/styles/blog.module.css'
import { Inter } from 'next/font/google'
import Markdown from 'react-markdown'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

const Post = ({ post }: { post: Post }) => {
  return (
    <Layout>
      <main>
        <article className={s.article}>
          <div className={s.header}>
            <h1 className={s.title}>{post.title}</h1>
            <div className={s.authorContainer}>
              <img
                className={s.authorPicture}
                src={post.author?.profile_picture!}
                alt={post.title!}
              />
              <span className={`${s.authorName} ${inter.className}`}>
                {post.author?.name}
              </span>
            </div>
          </div>

          <img
            className={s.coverPicture}
            src={post.cover_picture!}
            alt={post.title!}
          />
          <Markdown className={`${s.body} ${inter.className}`}>
            {post.body}
          </Markdown>
        </article>
      </main>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const endpoint = 'http://localhost:3000/posts'
  const paths = await axios
    .get(endpoint)
    .then((res) => res.data)
    .then((data) => data.data as Post[])
    .then((posts) =>
      posts.map((p) => {
        return {
          params: {
            slug: p.title?.toLowerCase().replaceAll(' ', '-'),
          },
        }
      })
    )

  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const endpoint = 'http://localhost:3000/posts'

  const post = await axios
    .get(endpoint)
    .then((res) => res.data)
    .then((data) => data.data as Post[])
    .then((posts) =>
      posts.find(
        (p) =>
          p.title?.toLowerCase() ===
          (ctx.params?.slug as string).replaceAll('-', ' ')
      )
    )

  return {
    props: {
      post,
    },
  }
}

export default Post
