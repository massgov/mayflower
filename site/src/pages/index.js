import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello</h1>
    <p>Welcome to Mayflower Homepage.</p>
    <p>Now go build something great.</p>
    <Image />
  </Layout>
)

export default IndexPage
