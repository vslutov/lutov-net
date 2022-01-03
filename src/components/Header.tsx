import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Feed, Menu, Moon } from "react-bytesize-icons"
import { HeaderQuery } from "../../graphql-types"
import { button, header, headerLink, logo, menu, menuButton, menuOpened, themeButton } from "./Header.module.css"

const toggle = (opened: boolean, setOpened: (value: boolean) => void) => {
  setOpened(!opened)
}

const Header = ({ className, dark, setDark }: {className: string, dark: boolean, setDark: (value: boolean) => void}) => {
  const data = useStaticQuery(graphql`
    query Header {
      site {
        siteMetadata {
          title
        }
      }
    }
  `) as HeaderQuery

  const [opened, setOpened] = useState(false)

  const title = data?.site?.siteMetadata?.title as string
  const size = "1em" as unknown as number

  return (
    <header className={className}>
      <nav className={header}>
        <Link to='/' className={logo}>{title}</Link>
        <span className={menuButton}>
          <button title="Menu" className={button} onClick={toggle.bind(null, opened, setOpened)}>
            <Menu width={size} height={size}/>
          </button>
        </span>
        <div className={`${menu} ${opened ? menuOpened : ""}`}>
          <Link className={headerLink} to='/about'>About me</Link>
          <a href="/rss.xml" title="Rss feed"><Feed width={size} height={size}/></a>
          <span className={themeButton} {...{ "aria-hidden": true }}>
            <button className={button} title="Change theme" onClick={toggle.bind(null, dark, setDark)} >
              <Moon width={size} height={size}/>
            </button>
          </span>
        </div>
      </nav>
    </header>
  )
}

export default Header
