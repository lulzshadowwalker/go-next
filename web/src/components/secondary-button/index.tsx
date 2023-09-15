import React, { ButtonHTMLAttributes } from 'react'
import s from './style.module.css'

function SecondaryButton({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={s['secondary-button']}>
      {children}
    </button>
  )
}

export default SecondaryButton
