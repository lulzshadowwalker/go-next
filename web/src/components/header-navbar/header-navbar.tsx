import React from 'react'
import s from './style.module.css'
import Image from 'next/image'
import HeaderNavbarItem from './components/header-navbar-item'
import { routes, Routes } from '@/helpers/constants'

export default function HeaderNavbar() {
  return (
    <nav className={s['nav']}>≥
      <img
        height={32}
        src="https://logos-world.net/wp-content/uploads/2020/11/Shell-Logo.png"
        className={s['logo']}
        alt="logo"
        style={{
          alignSelf: 'center',
        }}
      />

      {Object.keys(routes).map((key) => {
        let r = routes[key as keyof Routes]
        return (
          <HeaderNavbarItem href={r.path} key={key}>
            {r.name}
          </HeaderNavbarItem>
        )
      })}
    </nav>
  )
}
