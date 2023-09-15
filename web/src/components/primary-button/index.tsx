import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import s from './style.module.css'

function PrimaryButton({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={s['primary-button']}>
      {children}
    </button>
  )
}

export default PrimaryButton
