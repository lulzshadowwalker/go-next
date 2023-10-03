import React from 'react'
import s from './style.module.css'
import PrimaryButton from '../primary-button'
import Logo from '../logo'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Header() {
  return (
    <nav className={`${s.nav} ${inter.className}`}>
      <Logo />
      <Link href="/blog/create">
        <PrimaryButton>Publish</PrimaryButton>
      </Link>
    </nav>
  )
}
