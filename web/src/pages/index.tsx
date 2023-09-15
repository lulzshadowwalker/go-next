import HeaderNavbar from '@/components/header-navbar/header-navbar'
import Layout from '@/components/layout'
import s from '@/styles/home.module.css'

export default function Home() {
  return (
    <Layout>
      <main className={s['container']}>
        <img
          src="https://images.unsplash.com/photo-1682686580186-b55d2a91053c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </main>
    </Layout>
  )
}
