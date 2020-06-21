import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import { Content, Container } from "rsuite"

import Header from "../components/Header"
import Footer from "../components/Footer"

import styles from "./Layout.module.css"
import "./index.less"

const IndexLayout: React.FC = ({ children }) => {
  const { title, description, keywords } = useStaticQuery(graphql`
    query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
  `).site.siteMetadata

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: "description", content: description },
          { name: "keywords", content: keywords }
        ]}
      />
      <Container className={styles.container}>
        <Header fixedWidth={styles.fixedWidth} />
        <Content className={styles.fixedWidth}>{children}</Content>
        <Footer fixedWidth={styles.fixedWidth} />
      </Container>
    </>
  )
}

export default IndexLayout
