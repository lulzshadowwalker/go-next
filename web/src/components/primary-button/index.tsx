import React from 'react';
import s from './style.module.css';

function PrimaryButton({ children }: { children: any }) {
  return <button className={s['primary-button']}>{children}</button>;
}

export default PrimaryButton;
