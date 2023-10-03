'use client'

/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/layout'
import s from '@/styles/post-creation.module.css'
import { GetStaticProps } from 'next'
import { Inter } from 'next/font/google'
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import Markdown from 'react-markdown'
import { useState } from 'react'
import PrimaryButton from '@/components/primary-button'

const inter = Inter({ subsets: ['latin'] })

const Post = () => {
  const post: Post = {
    title: 'A Thousand Nights in Tokyo ',
    body: `Lörem ipsum omakase vitåk köd preck, även om debusm. Astrott pabel, såväl som heterovis pagisk. Pantris krololån. Explainer nedinas por, men reng sedan posam. Tålåss mikölig besam suprada. 
Intranat asön. Vypöde räd. Beligt följare. Öde syr hånat utom teletopi, och geopp. Tresade öpösa nyktiga autode. 
`,
    cover_picture:
      'https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9reW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    author: {
      name: 'Ishimoto Hatsu',
      email: 'Hatsu@email.com',
      profile_picture:
        'https://images.unsplash.com/photo-1606661567747-d86242d14794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGphcGFuZXNlJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    } as User,
  }

  const placeholder = '# Hello, World!'
  const [body, setBody] = useState<string>(placeholder)

  const coverPicker = useRef<HTMLInputElement | null>(null)

  // TODO handle validation
  // TODO add date created to backend

  const [coverPic, setCoverPic] = useState<File | null>(null)
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!!e.target?.files) {
      return
    }

    setCoverPic(e.target!.files![0])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Layout>
      <main>
        <form onSubmit={handleSubmit}>
          {' '}
          <article className={s.article}>
            <div className={s.header}>
              <input
                className={s.title}
                name="title"
                placeholder="my great title .."
                required
              />
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
              src={
                !!coverPic
                  ? URL.createObjectURL(coverPic!)
                  : post.cover_picture!
              }
              alt={post.title!}
              onClick={() => {
                coverPicker.current?.click()
              }}
            />
            <input
              hidden
              type="file"
              name="cover_picture"
              onChange={handleCoverChange}
              ref={coverPicker}
              required
            />
            <div className={`${s.editor} ${inter.className}`}>
              <textarea
                className={s.bodyInput}
                placeholder={placeholder}
                onChange={(e) => {
                  setBody(e.target.value)
                }}
                name="body"
                required
              />
              <hr className={s.editorSplitter} />
              <Markdown className={s.markdown}>
                {!!body ? body : placeholder}
              </Markdown>
            </div>
            <PrimaryButton className={s.submitButton} type="submit">
              🤙🏻
            </PrimaryButton>
          </article>
        </form>
      </main>
    </Layout>
  )
}

export default Post
