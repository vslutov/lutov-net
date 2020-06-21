import * as React from "react"
import { Link } from "gatsby"

import Container from "../components/Container"
import IndexLayout from "../layouts"

const IndexPage = () => (
  <IndexLayout>
    <Container>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to='/a-markdown-page/'>Go to page 2</Link>
    </Container>
  </IndexLayout>
)

export default IndexPage