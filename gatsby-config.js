"use strict"

module.exports = {
  siteMetadata: {
    title: "lutov.net",
    description: "Vladimir Liutov's blog.",
    keywords: "programming, cartography, tourism",
    siteUrl: "https://lutov.net",
    srcUrl: "https://github.com/vslutov/lutov-net",
    author: {
      name: "Vladimir Liutov",
      url: "https://lutov.net",
      email: "vs@lutov.net"
    },
    copyright: "2020"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx"],
        defaultLayouts: {
          default: require.resolve("./src/templates/page.tsx")
        },
        remarkPlugins: [
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1rem"
            }
          },
          { resolve: "gatsby-remark-prismjs" },
          { resolve: "gatsby-remark-copy-linked-files" },
          { resolve: "gatsby-remark-smartypants" },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 768,
              quality: 85,
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://lutov.net"
      }
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  ]
}
