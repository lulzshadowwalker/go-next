import { HtmlProps } from 'next/dist/shared/lib/html-context'
import React, { ButtonHTMLAttributes, HTMLInputTypeAttribute } from 'react'
import s from './style.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function PrimaryButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className={`${s.primaryBtn} ${inter.className} ${className}`}>
      {children}
    </div>
  )
}
