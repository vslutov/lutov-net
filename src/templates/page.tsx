import type { PageProps } from "gatsby"

import React from "react"

import IndexLayout from "../layouts"

type Props = PageProps<Record<string, never>, {
  frontmatter: {
    title: string
  }
}>

export default ({ children, pageContext: { frontmatter: { title } } }: Props): React.ReactNode => {
  return (
    <IndexLayout>
      <h1>{title}</h1>
      {children}
    </IndexLayout>
  )
}
