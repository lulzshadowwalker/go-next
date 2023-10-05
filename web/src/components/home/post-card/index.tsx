/* eslint-disable @next/next/no-img-element */
import React from 'react'
import s from './style.module.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`blog/${post.title?.toLowerCase().replaceAll(' ', '-')}`}
      className={s.card}
    >
      <img
        className={s.coverImage}
        src={
          post.cover_picture ??
          'https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9reW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60'
        }
        alt={post.title}
      />
      <div className={s.info}>
        <h3 className={s.title}>{post.title}</h3>
        <div className={`${s.meta} ${inter.className}`}>
          <div className={s.author}>
            <img
              className={s.authorImage}
              src={post.author?.profile_picture}
              alt={post.author?.name}
            />
            <span className={s.authorName}>{post.author?.name}</span>
          </div>
          <time dateTime={post.created_at} className={s.date}>
            {post.created_at}
          </time>
        </div>
      </div>
    </Link>
  )
}
