import React, { HTMLAttributes, PropsWithChildren } from 'react'
import HeaderNavbar from '../header-navbar'
import s from './style.module.css'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={s['layout']}>
      <HeaderNavbar />
      {children}
    </div>
  )
}
