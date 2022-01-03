import { MDXProvider } from "@mdx-js/react"
import { graphql, useStaticQuery } from "gatsby"
import { last } from "ramda"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Footer from "./Footer"
import Header from "./Header"
import { dark, footer, header, inner, layout, light, main, outer } from "./Layout.module.css"
import WriteMe from "./WriteMe"

const localStorageWasRead: {[key: string]: true} = {}

function useLocalStorage<Type> (key: string, initialValue: Type): [Type, (newValue: Type) => void] {
  const [value, reactSetter] = useState(initialValue)

  const setter = (newValue: Type) => {
    reactSetter(newValue)
    window?.localStorage?.setItem(key, JSON.stringify(newValue))
  }

  useEffect(() => {
    if (localStorageWasRead[key]) {
      return
    }

    localStorageWasRead[key] = true
    const savedValue = window?.localStorage?.getItem(key)
    if (savedValue != null) {
      reactSetter(JSON.parse(savedValue))
    }
  })

  return [value, setter]
}

const defaultShortcodes = { WriteMe }

const Layout = ({ pageTitle, srcPath, children, shortcodes }: {
  pageTitle: string
  srcPath: string
  children: React.ReactNode
  shortcodes?: {[key: string]: unknown}
}): JSX.Element => {
  shortcodes ??= {}

  const { site: { siteMetadata: { title, description, keywords, siteUrl, srcFileUrl } } } = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          title
          description
          keywords
          siteUrl
          srcFileUrl
        }
      }
    }
  `)

  if (pageTitle.length) {
    pageTitle = `${pageTitle} - ${title}`
  } else {
    pageTitle = title
  }

  const [darkTheme, setDark] = useLocalStorage("darkTheme", true)
  const theme = darkTheme ? dark : light

  const ext = last((last(srcPath.split("/")) ?? "").split(".")) ?? ""
  const mimetype = {
    mdx: "text/markdown",
    tsx: "application/typescript"
  }[ext] ?? "text/plain"

  return (
    <MDXProvider components={{ ...defaultShortcodes, ...shortcodes }}>
      <Helmet
        title={pageTitle}
        meta={[
          { name: "description", content: description },
          { name: "keywords", content: keywords },
          { name: "viewport", content: "width=device-width, initial-scale=1" }
        ]}
        link={[
          { rel: "alternate", type: "application/rss+xml", title: description, href: `${siteUrl}/rss.xml` },
          { rel: "alternate", type: mimetype, title: `Source: ${pageTitle}`, href: srcFileUrl.replace("{srcPath}", srcPath) }
        ]}
        htmlAttributes={{
          lang: "ru"
        }}
      />
      <div className={`${layout} ${theme}`}>
        <div className={`${outer} ${header}`}>
          <Header className={inner} dark={darkTheme} setDark={setDark} />
        </div>
        <div className={`${outer} ${main}`}>
          <div className={`${inner}`}>
            {children}
          </div>
        </div>
        <div className={`${footer} ${outer}`}>
          <Footer className={inner} srcPath={srcPath} />
        </div>
      </div>
    </MDXProvider>
  )
}

export default Layout
