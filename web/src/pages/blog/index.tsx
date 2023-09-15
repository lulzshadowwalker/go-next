import Layout from '@/components/layout'
import React from 'react'
import s from '@/styles/blog.module.css'
import BlogPostCard from '@/components/blog-post-card'

export default function Blog() {
  return (
    <Layout>
      <main>
        <h1 className={s['title']}>Qool BLOG</h1>
        <div className={s['posts']}>
          <BlogPostCard />
          <BlogPostCard />
          <BlogPostCard />
        </div>
      </main>
    </Layout>
  )
}
