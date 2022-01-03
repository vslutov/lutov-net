import { Link, PageProps } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { ChevronLeft, ChevronRight, ChevronTop } from "react-bytesize-icons"
import applyTypograf from "../../utils/applyTypograf"
import Layout from "../Layout"
import PostedAt from "../PostedAt"
import { PageContext } from "./Page"
import { nav, navItemCenter, navItemEmpty, navItemLeft, navItemRight } from "./Post.module.css"

const Post = ({ pageContext: { node: { title, postedAt, srcPath, body }, previous, next } }: PageProps<never, PageContext>): React.ReactNode => {
  const size = "1em" as unknown as number

  return (
    <Layout pageTitle={applyTypograf(title)} srcPath={srcPath}>
      <main>
        <MDXRenderer>
          {body}
        </MDXRenderer>
        <PostedAt date={postedAt} />
      </main>

      <nav className={nav}>
        <span className={`${navItemLeft} ${previous == null ? navItemEmpty : ""}`}>
          {previous != null &&
            <Link to={previous.path}><ChevronLeft width={size} height={size} /> {applyTypograf(previous.title)}</Link>}
        </span>
        <span className={navItemCenter}>
          <Link to={"/posts"}><ChevronTop width={size} height={size} />All posts</Link>
        </span>
        <span className={`${navItemRight} ${previous == null ? navItemEmpty : ""}`}>
          {next != null &&
            <Link to={next.path}>{applyTypograf(next.title)} <ChevronRight width={size} height={size} /></Link>}
        </span>
      </nav>
    </Layout>
  )
}

export default Post
