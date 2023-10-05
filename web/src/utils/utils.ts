import { TypeOptions, toast } from 'react-toastify'

export const showToast = (msg: string, type: TypeOptions) => {
  toast(msg, {
    type: type,
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  })
}
