import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GitHub } from "react-bytesize-icons"
import { Footer } from "rsuite"

import styles from "./Footer.module.css"

const SiteFooter: React.FC<{ fixedWidth: string }> = ({ fixedWidth }) => {
  const { author, copyright, srcUrl } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author {
            email
            name
            url
          }
          copyright
          srcUrl
        }
      }
    }
  `).site.siteMetadata

  return (
    <Footer className={`${styles.footer} ${fixedWidth}`}>
      {author.name} &lt;
      <a href={`mailto:${author.email}?subject=From%20contact%20me`}>{author.email}</a>
      &gt; &copy; {copyright} {" "}
      <a href={srcUrl} className={styles.right}>
        Fork me <GitHub width={12} height={12} />
      </a>
    </Footer>
  )
}

export default SiteFooter
