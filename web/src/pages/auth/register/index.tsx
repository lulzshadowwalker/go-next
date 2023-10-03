/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useRef, useState } from 'react'
import s from '@/styles/auth.module.css'
import BaseInput from '@/components/base-input'
import { Inter } from 'next/font/google'
import PrimaryButton from '@/components/primary-button'
import SecondaryButton from '@/components/secondary-button'

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  const pfpPicker = useRef<HTMLInputElement | null>(null)

  const [pfp, setPfp] = useState<File | null>(null)
  const handlePfpChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!!e.target.files) {
      return
    }

    setPfp(e.target.files![0])
  }

  return (
    <main className={s.main}>
      <form className={s.form}>
        <h1 className={s.title}>Sign up</h1>
        <div className={s.namePfpContainer}>
          <input
            type="file"
            name="profile_picture"
            hidden
            onChange={handlePfpChange}
            ref={pfpPicker}
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
          />
        </div>
        <BaseInput
          className={s.input}
          type="email"
          name="email"
          placeholder="email@example.com"
        />
        <BaseInput type="password" name="password" placeholder="password" />
        <div className={s.ctaContainer}>
          <PrimaryButton>Sign in</PrimaryButton>
          <SecondaryButton>{`I don't have an account`}</SecondaryButton>
        </div>
      </form>
    </main>
  )
}
