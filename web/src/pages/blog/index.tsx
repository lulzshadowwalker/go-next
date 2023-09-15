import Layout from '@/components/layout'
import React from 'react'
import s from '@/styles/blog.module.css'
import BlogPostCard from '@/components/blog-post-card'

export default function Blog() {
  return (
    <Layout>
      <main className={s['main']}>
        <BlogPostCard />
        <BlogPostCard />
        <BlogPostCard />

        {Array(3).map((e) => (
          <BlogPostCard key={e} />
        ))}
      </main>
    </Layout>
  )
}
