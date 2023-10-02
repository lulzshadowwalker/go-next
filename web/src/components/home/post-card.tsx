/* eslint-disable @next/next/no-img-element */
import React from 'react'
import s from './style.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function PostCard() {
  return (
    <div className={s.card}>
      <img
        className={s.coverImage}
        src="https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9reW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"
        alt="post cover"
      />
      <div className={s.info}>
        <h3 className={s.title}>A Thousand Nights in Tokyo</h3>
        <div className={`${s.meta} ${inter.className}`}>
          <div className={s.author}>
            <img
              className={s.authorImage}
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
              alt="post author"
            />
            <span className={s.authorName}>Vector Ivanovich</span>
          </div>
          <time dateTime={'19-january-2001'} className={s.date}>
            19.January.2001
          </time>
        </div>
      </div>
    </div>
  )
}
