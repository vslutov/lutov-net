/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

import path from "path"
import esmRequire from "../utils/esmRequire"
import getMdxPath from "../utils/getMdxPath"

type SitemapNode = {
  slug: string
  fields: {
    collection: string
  }
  frontmatter: {
    lastmod: string
  }
}

type SitemapNodeResolved = {
  path: string
  lastmod: string
}

const siteMetadata = {
  title: "lutov.net",
  description: "@vslutov blog",
  keywords: "programming, cartography, tourism",
  siteUrl: "https://lutov.net",
  srcUrl: "https://github.com/vslutov/lutov-net",
  srcFileUrl: "https://github.com/vslutov/lutov-net/blob/master/{srcPath}",
  author: {
    name: "Vladimir Liutov",
    email: "vs@lutov.net"
  },
  copyright: "2022"
}

const developFilesystem = process?.env?.NODE_ENV === "development"
  ? [
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "drafts",
          path: path.resolve("src", "content", "drafts")
        }
      }
    ]
  : []

module.exports = {
  /* Your site config here */
  siteMetadata,
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.resolve("src", "content", "posts")
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: path.resolve("src", "content", "pages")
      }
    },
    ...developFilesystem,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        commonmark: true,
        gatsbyRemarkPlugins: [
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 688,
              showCaptions: true,
              quality: 70,
              withAvif: true,
              withWebp: true,
              backgroundColor: "#002b36"
            }
          },
          {
            resolve: "gatsby-remark-table-of-contents",
            options: {
              tight: true
            }
          },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              className: "autolinkHeader",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeWidth="2" width="1em" height="1em"><path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15" /></svg>'
            }
          },
          "gatsby-remark-graphviz",
          "gatsby-remark-prismjs",
          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore"
            }
          }
        ],
        remarkPlugins: [
          esmRequire("remark-unwrap-images"),
          esmRequire("remark-math"), // https://github.com/gatsbyjs/gatsby/issues/34305#issuecomment-1001619665
          esmRequire("remark-gfm"),
          esmRequire("remark-github"),
          esmRequire("remark-breaks"),
          [
            esmRequire("@mavrin/remark-typograf"),
            {
              locale: ["ru", "en-US"]
            }
          ]
        ]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-graphql-codegen",
    "gatsby-plugin-dts-css-modules",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "@vslutov blog",
        short_name: "lutov.net",
        start_url: "/",
        background_color: "#002b36",
        theme_color: "#002b36",
        display: "standalone",
        icon: "src/content/icon.svg",
        crossOrigin: "use-credentials"
      }
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: ["*"]
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMdx {
            nodes {
              slug
              fields {
                collection
              }
              frontmatter {
                lastmod
              }
            }
          }
        }`,
        resolvePages: ({ allSitePage, allMdx }: {
          allSitePage: {
            nodes: Array<{ path: string }>
          },
          allMdx: {
            nodes: Array<SitemapNode>
          }
        }): SitemapNodeResolved[] => {
          const mdxMap: {[uri: string]: SitemapNode} = {}
          for (const node of allMdx.nodes) {
            if (node.fields.collection !== "excerpts") {
              const uri = getMdxPath(node.fields.collection, node.slug)
              mdxMap[uri] = node
            }
          }

          return allSitePage.nodes.map(({ path }) => ({
            path,
            lastmod: mdxMap[path]?.frontmatter?.lastmod
          }))
        },
        serialize: ({ path, lastmod }: SitemapNodeResolved) => ({
          url: path,
          lastmod
        })
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        feeds: [
          {
            output: "/rss.xml",
            title: siteMetadata.description,
            query: `{
              allMdx (
                filter: {fields: { collection: { eq: "posts"} } }
                sort: { fields: frontmatter___postedAt, order: DESC}
              ){
                nodes {
                  slug
                  headings(depth: h1) {
                    value
                  }
                  frontmatter {
                    postedAt
                  }
                  excerpt
                  html
                }
              }
            }`,
            serialize: ({ query: { allMdx: { nodes } } }: {
              query: {
                allMdx: {
                  nodes: Array<{
                    slug: string
                    headings: Array<{
                      value: string
                    }>
                    frontmatter: {
                      postedAt: string
                    }
                    excerpt: string
                    html: string
                  }>
                }
              }
            }) => (
              nodes.map((node) => {
                const url = siteMetadata.siteUrl + getMdxPath("posts", node.slug)

                return {
                  title: node.headings?.[0]?.value ?? "No title",
                  date: node.frontmatter.postedAt,
                  description: node.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": node.html }]
                }
              })
            )
          }
        ]
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp"
  ]
}
