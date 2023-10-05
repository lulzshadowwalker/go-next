'use client'

/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/layout'
import PrimaryButton from '@/components/primary-button'
import s from '@/styles/post-creation.module.css'
import { showToast } from '@/utils/utils'
import axios from 'axios'
import { log } from 'console'
import { Inter } from 'next/font/google'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'

const inter = Inter({ subsets: ['latin'] })

const Post = () => {
  const placeholder = '# Hello, World!'
  const [body, setBody] = useState<string>(placeholder)

  const form = useRef<HTMLFormElement | null>(null)
  const [data, setFormData] = useState<Record<string, any>>({})

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const coverPicker = useRef<HTMLInputElement | null>(null)

  // TODO handle validation
  const [coverPic, setCoverPic] = useState<File | null>(null)

  const pickCoverImage = () => {
    coverPicker.current?.click()
  }

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length == 0) {
      return
    }

    setCoverPic(e.target!.files![0])
  }

  const endpoint = 'http://localhost:3000/posts'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }

    if (coverPic) {
      formData.append('cover_picture', coverPic)
    }

    const token: string = window.localStorage.getItem('access_token')!

    await axios
      .post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((_) => {
        showToast('you can sign out by uninstalling your browser', 'info')
      })
      .catch((_) => showToast('cannot publish your post', 'error'))
  }

  const [author, setAuthor] = useState<User | null>()
  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (!!!user) return

    setAuthor(JSON.parse(user))
  }, [])

  return (
    <Layout>
      <main>
        <form onSubmit={handleSubmit} ref={form} encType="multipart/form-data">
          <article className={s.article}>
            <div className={s.header}>
              <input
                className={s.title}
                name="title"
                placeholder="my great title .."
                required
                onChange={handleChange}
              />
              <div className={s.authorContainer}>
                <img
                  className={s.authorPicture}
                  src={author?.profile_picture!}
                  alt={author?.name!}
                />
                <span className={`${s.authorName} ${inter.className}`}>
                  {author?.name}
                </span>
              </div>
            </div>

            {!!coverPic ? (
              <img
                className={s.coverPicture}
                src={URL.createObjectURL(coverPic!)}
                alt={'cover'}
                onClick={pickCoverImage}
              />
            ) : (
              <div className={s.coverPicPlaceholder} onClick={pickCoverImage} />
            )}

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
                  handleChange(e)
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
              🖋️
            </PrimaryButton>
          </article>
        </form>
      </main>
    </Layout>
  )
}

export default Post
