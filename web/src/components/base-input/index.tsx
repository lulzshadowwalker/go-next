import { Inter } from 'next/font/google'
import { InputHTMLAttributes } from 'react'
import s from './style.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function BaseInput({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={`${s.input} ${inter.className} ${className}`} {...rest}>
      {children}
    </input>
  )
}
