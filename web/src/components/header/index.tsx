import React from 'react'
import s from './style.module.css'
import PrimaryButton from '../primary-button'
import Logo from '../logo'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Header() {
  return (
    <nav className={`${s.nav} ${inter.className}`}>
      <Logo />
      <PrimaryButton>add</PrimaryButton>
    </nav>
  )
}
