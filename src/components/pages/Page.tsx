import { PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import Layout from "../Layout"

export type PageContext = {
  slug: string
  node: {
    title: string
    postedAt: string
    body: string
    srcPath: string
  }
  previous?: {
    title: string
    path: string
    postedAt: string
  }
  next?: {
    title: string
    path: string
    postedAt: string
  }
}

const Page = ({ pageContext: { node: { title, body, srcPath } } }: PageProps<never, PageContext>) => {
  return (
    <Layout pageTitle={title} srcPath={srcPath}>
      <main>
        <MDXRenderer>
          {body}
        </MDXRenderer>
      </main>
    </Layout>
  )
}

export default Page
