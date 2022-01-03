import { graphql, Link, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { ChevronRight } from "react-bytesize-icons"
import { PostListQuery } from "../../../graphql-types"
import Layout from "../../components/Layout"
import PostedAt from "../../components/PostedAt"
import applyTypograf from "../../utils/applyTypograf"
import getMdxPath from "../../utils/getMdxPath"
import { article, articleFooter, articleFooterLink } from "./PostList.module.css"

const PostList = () => {
  const {
    allMdx: { nodes },
    site
  } = useStaticQuery(graphql`
    query PostList {
      allMdx(
        filter: {fields: {collection: {eq: "posts"}}}
        sort: {fields: frontmatter___postedAt, order: DESC}
      ) {
        nodes {
          frontmatter {
            postedAt
          }
          headings(depth: h1) {
            value
          }
          slug
          children {
            ... on Mdx {
              body
            }
          }
        }
      }
      site {
        siteMetadata {
          description
        }
      }
    }
  `) as PostListQuery

  const size = "1em" as unknown as number

  return (
    <Layout pageTitle='Blog' srcPath='src/components/pages/PostList.tsx' shortcodes={{
      h1: () => ""
    }}>
      <main>
        <h1>{site?.siteMetadata?.description}</h1>
        {
          nodes.map(({ slug, frontmatter, headings, children }) => {
            const title = applyTypograf(headings?.[0]?.value ?? "")

            return (
              <article className={article} key={slug}>
                <h1>
                  <Link to={getMdxPath("posts", slug ?? "")}>{title}</Link>
                </h1>
                <MDXRenderer>
                  {(children?.[0] as {body?: string})?.body ?? ""}
                </MDXRenderer>
                <footer className={articleFooter}>
                  <Link to={`${getMdxPath("posts", slug ?? "")}#toc`} className={articleFooterLink}>
                    Read more <ChevronRight width={size} height={size}/>
                  </Link>
                  <PostedAt date={frontmatter?.postedAt} />
                </footer>
              </article>
            )
          })
        }
      </main>
    </Layout>
  )
}

export default PostList
