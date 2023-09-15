import { HtmlProps } from 'next/dist/shared/lib/html-context'
import React, { HTMLAttributes } from 'react'
import s from '../style.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface HeaderNavbarItemProps extends HTMLAttributes<HTMLElement> {
  href: string
}

export default function HeaderNavbarItem({
  href,
  children,
  ...rest
}: HeaderNavbarItemProps) {
  const pathname = useRouter().pathname

  return (
    <Link
      {...rest}
      className={s['navbar-item']}
      data-active={pathname === href}
      href={href}
    >
      {children}
    </Link>
  )
}
