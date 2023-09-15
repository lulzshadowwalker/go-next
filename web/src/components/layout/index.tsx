import React, { HTMLAttributes, PropsWithChildren } from 'react'
import HeaderNavbar from '../header-navbar/header-navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderNavbar />
      {children}
    </>
  )
}
