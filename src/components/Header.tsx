import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
// import { Moon } from "react-bytesize-icons"
import { Header, Nav, Navbar } from "rsuite"

import styles from "./Header.module.css"

const HeaderLink : React.FC<{ href: string }> = ({ href, children, ...props }) => (
  <Link to={href} {...props}>{children}</Link>
)

const SiteHeader : React.FC<{fixedWidth: string}> = ({ fixedWidth }) => {
  const title = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata.title

  return (
    <Header>
      <Navbar>
        <div className={fixedWidth}>
          <Navbar.Header><Link to='/' className={styles.logo}>{title}</Link></Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item componentClass={HeaderLink} href='/'>Blog</Nav.Item>
              <Nav.Item componentClass={HeaderLink} href='/about'>About</Nav.Item>
            </Nav>
            {/* <Nav pullRight>
              <Nav.Item
                aria-label='Change theme'
              >
                <Moon width={16} height={16} strokeWidth='12.5%' />
              </Nav.Item>
            </Nav> */}
          </Navbar.Body>
        </div>
      </Navbar>
    </Header>
  )
}

export default SiteHeader
