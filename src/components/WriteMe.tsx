import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { WriteMeQuery } from "../../graphql-types"

const WriteMe = () => {
  const data = useStaticQuery(graphql`
    query WriteMe {
      site {
        siteMetadata {
          author {
            email
          }
        }
      }
    }
  `) as WriteMeQuery
  const email = data?.site?.siteMetadata?.author?.email ?? ""

  return (
    <a href={`mailto:${email}`}>write me</a>
  )
}

export default WriteMe
