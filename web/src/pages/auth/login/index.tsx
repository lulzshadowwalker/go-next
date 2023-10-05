import BaseInput from '@/components/base-input'
import PrimaryButton from '@/components/primary-button'
import SecondaryButton from '@/components/secondary-button'
import s from '@/styles/auth.module.css'
import { showToast } from '@/utils/utils'
import axios, { HttpStatusCode } from 'axios'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { ToastContainer, TypeOptions, toast } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const handleAuthError = (e: any) => {
  switch (e.response.status) {
    case HttpStatusCode.NotFound:
      showToast('cannot find this account', 'error')
      break
    case HttpStatusCode.Conflict:
      showToast('email already in use', 'error')
      break
    case HttpStatusCode.Unauthorized:
      showToast('incorrect email/password', 'error')
      break
    case HttpStatusCode.BadRequest:
      showToast(
        "haven't implemented validation in the frontend figure it out",
        'error'
      )
      break
    default:
      showToast('eto shto ..', 'error')
      break
  }
}

export default function Login() {
  const router = useRouter()

  const form = useRef<HTMLFormElement | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const endpoint = `http://localhost:3000/auth/login`
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const resData = await axios
      .post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        showToast('you can sign out by uninstalling your browser', 'info')
        return res.data
      })
      .catch(handleAuthError)
    if (!!!resData) return

    window.localStorage.setItem('user', resData.data)
    window.localStorage.setItem('access_token', resData.access_token)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <main className={s.main}>
        <form
          className={s.form}
          onSubmit={handleSubmit}
          ref={form}
          encType="multipart/form-data"
        >
          <h1 className={s.title}>Sign in</h1>
          <BaseInput
            className={s.input}
            type="email"
            name="email"
            placeholder="email@example.com"
            onChange={handleChange}
          />
          <BaseInput
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <div className={s.ctaContainer}>
            <PrimaryButton type="submit">Sign in</PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={() => {
                router.push('/auth/register')
              }}
            >{`I don't have an account`}</SecondaryButton>
          </div>
        </form>
      </main>
    </>
  )
}
