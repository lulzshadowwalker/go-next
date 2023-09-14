import React, { InputHTMLAttributes } from 'react';
import s from './style.module.css';

export default function BaseInput({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={s['base-input']} {...props} />;
}
