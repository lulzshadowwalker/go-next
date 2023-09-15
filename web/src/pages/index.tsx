import BlogPostCard from '@/components/blog-post-card'
import HeaderNavbar from '@/components/header-navbar/header-navbar'
import Layout from '@/components/layout'
import s from '@/styles/home.module.css'

export default function Home() {
  return (
    <Layout>
      <main className={s['container']}>
        <BlogPostCard />
      </main>
    </Layout>
  )
}
