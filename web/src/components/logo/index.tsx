import React from 'react'
import s from './style.module.css'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className={s.logo}>
      🞿 booboo
    </Link>
  )
}
