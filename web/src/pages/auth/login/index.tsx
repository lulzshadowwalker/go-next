import React from 'react'
import s from '@/styles/auth.module.css'
import BaseInput from '@/components/base-input'
import { Inter } from 'next/font/google'
import PrimaryButton from '@/components/primary-button'
import SecondaryButton from '@/components/secondary-button'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  return (
    <main className={s.main}>
      <form className={s.form}>
        <h1 className={s.title}>Sign in</h1>
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
