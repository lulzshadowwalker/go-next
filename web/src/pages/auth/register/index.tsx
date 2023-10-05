/* eslint-disable @next/next/no-img-element */

import BaseInput from '@/components/base-input'
import PrimaryButton from '@/components/primary-button'
import SecondaryButton from '@/components/secondary-button'
import s from '@/styles/auth.module.css'
import axios from 'axios'
import { Inter } from 'next/font/google'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { handleAuthError } from '../login'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  const router = useRouter()

  const form = useRef<HTMLFormElement | null>(null)
  const [data, setData] = useState<Record<string, any>>({})
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const pfpPicker = useRef<HTMLInputElement | null>(null)

  const [pfp, setPfp] = useState<File | null>(null)

  const handlePfpChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      return
    }

    setPfp(e.target.files![0])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }

    if (pfp) {
      formData.append('profile_picture', pfp)
    }

    const endpoint = 'http://localhost:3000/auth/register'

    const responseData = await axios
      .post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch(handleAuthError)

    if (!!!responseData) return

    window.localStorage.setItem('user', JSON.stringify(responseData.data))
    window.localStorage.setItem('access_token', responseData.access_token)
  }

  return (
    <main className={s.main}>
      <form
        className={s.form}
        ref={form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className={s.title}>Sign up</h1>
        <div className={s.namePfpContainer}>
          <input
            type="file"
            name="profile_picture"
            onChange={handlePfpChange}
            ref={pfpPicker}
            hidden
          />
          <img
            src={
              !!pfp
                ? URL.createObjectURL(pfp)
                : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
            }
            className={s.profilePic}
            alt="profile"
            onClick={() => {
              pfpPicker.current?.click()
            }}
          />
          <BaseInput
            className={s.name}
            type="text"
            name="name"
            placeholder="Toshiba Deska"
            onChange={handleChange}
          />
        </div>
        <BaseInput
          className={s.input}
          type="email"
          name="email"
          placeholder="email@example.com"
          onChange={handleChange}
        />
        <BaseInput
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <div className={s.ctaContainer}>
          <PrimaryButton type="submit">Sign up</PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => {
              router.push('/auth/login')
            }}
          >{`I already have an account`}</SecondaryButton>
        </div>
      </form>
    </main>
  )
}
