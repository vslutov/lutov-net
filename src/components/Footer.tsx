import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { GitHub } from "react-bytesize-icons"
import { FooterQuery } from "../../graphql-types"
import { footer, left, right } from "./Footer.module.css"

const Footer = ({ className, srcPath } : {className: string, srcPath: string}) => {
  const data = useStaticQuery(graphql`
    query Footer {
      site {
        siteMetadata {
          author {
            name
            email
          }
          srcFileUrl
          copyright
        }
      }
    }
  `) as FooterQuery

  const siteMetadata = data?.site?.siteMetadata
  const srcFileUrl = siteMetadata?.srcFileUrl as string
  const copyright = siteMetadata?.copyright as string
  const name = siteMetadata?.author?.name as string
  const email = siteMetadata?.author?.email as string
  const size = "1em" as unknown as number

  return (
    <footer className={`${footer} ${className}`}>
      <span className={left}>
        <a href={srcFileUrl.replace("{srcPath}", srcPath)}>
          Page source <GitHub width={size} height={size} />
        </a>
      </span>
      <span className={right}>
        {name} &lt;
        <a href={`mailto:${email}`}>{email}</a>
        &gt; &copy; {copyright} {" "}
      </span>
    </footer>
  )
}

export default Footer
