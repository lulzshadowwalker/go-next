import React from 'react';
import s from './style.module.css';

function SecondaryButton({ children }: { children: any }) {
  return <button className={s['secondary-button']}>{children}</button>;
}

export default SecondaryButton;
