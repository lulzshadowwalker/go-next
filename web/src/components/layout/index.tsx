import React, { PropsWithChildren } from 'react'
import s from './style.module.css'
import Header from '../header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <nav>
      <Header />
      {children}
    </nav>
  )
}
