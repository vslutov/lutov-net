import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu } from 'react-bytesize-icons'

import styles from './header.module.css'

const navClassname = (show: boolean): string => {
  if (!show) {
    return styles.nav
  }

  return `${styles.nav} ${styles.showNav}`
}

const linkClassname = ({ href, pathname }: {href: string, pathname: string}): string => {
  if (pathname === '/') {
    pathname = '/subpixel'
  }

  if (pathname !== href) {
    return styles.navItem
  }

  return `${styles.navItem} ${styles.activeNavItem}`
}

const NavLink = ({ href, children }: {
  href: string
  children: string
}): JSX.Element => {
  const { pathname } = useRouter()

  return <Link href={href}><a className={linkClassname({ href, pathname })} href={href}>{children}</a></Link>
}

const Header = (): JSX.Element => {
  const [show, setShow] = useState(false)

  return (
    <header className={styles.header}>
      <Link href='/'><a className={styles.brand} href='/'>vs</a></Link>
      <button
        className={styles.toggler} type='button' aria-controls='navbarNavAltMarkup'
        aria-expanded='false' aria-label='Toggle navigation' onClick={(): void => setShow(!show)}
      >
        <Menu color='var(--color-text-secondary)' />
      </button>
      <nav className={navClassname(show)}>
        <NavLink href='/subpixel'>Subpixel</NavLink>
      </nav>
    </header>
  )
}

export default Header
