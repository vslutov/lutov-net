import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { NextComponentType } from 'next'

import 'normalize.css/normalize.css'
import './style.css'
import Header from '../../components/Header'

type PageType = NextComponentType & {
  title?: string
}

const TITLE = "Vladimir Lutov's homepage"

const getTitle = (component: PageType): string => {
  if (component.title == null) {
    return TITLE
  }

  return `${component.title} - ${TITLE}`
}

class LutovApp extends App {
  render (): JSX.Element {
    const { Component, pageProps } = this.props

    const title = getTitle(Component)

    return (
      <>
        <Head>
          <title>{title}</title>
          <link rel='preload' href='/static/fonts/Kaffeesatz-latin.woff2' />
          <link rel='preload' href='/static/fonts/Kaffeesatz-cyrillic.woff2' />
        </Head>

        <Header />

        <Component {...pageProps} />
      </>
    )
  }
}

export default LutovApp
