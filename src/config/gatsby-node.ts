import { createHash } from "crypto"
import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import path from "path"
import { CreatePagesMdxQuery } from "../../graphql-types"
import getMdxPath from "../utils/getMdxPath"

exports.onCreateNode = ({ node, getNode, actions }: CreateNodeArgs & {
  node: {
    rawBody: string
    fields: {
      [key: string]: unknown
    }
  }
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  if (node.internal.type === "Mdx") {
    let collection = "excerpts"

    const parent = getNode(node.parent ?? "not existing parent")
    if (!node.isExcerpt) {
      collection = (parent?.sourceInstanceName ?? "excerpts") as string
    }
    if (collection === "drafts") {
      collection = "posts"
    }

    createNodeField({
      node,
      name: "collection",
      value: collection
    })

    if (collection === "posts") {
      const excerpt = node.rawBody.split('\n<div id="toc"/>\n')[0]

      const child = {
        id: `${node.id}-excerpt`,
        rawBody: excerpt,
        fileAbsolutePath: node.fileAbsolutePath,
        parent: node.parent,
        internal: {
          type: "Mdx",
          content: excerpt,
          contentDigest: createHash("md5")
            .update(excerpt)
            .digest("hex")
        },
        isExcerpt: true
      }

      createNode(child, {
        name: "gatsby-plugin-mdx"
      })

      createParentChildLink({ parent: node, child })
    }
  }
}

const createPageCollection = async ({
  actions: { createPage }, reporter, graphql, collection, template, srcFolder
}: CreatePagesArgs & {
  collection: string
  template: string
  srcFolder: string
}): Promise<void> => {
  const { errors, data } = await graphql(`
    query CreatePagesMdx {
      allMdx(
        filter: {fields: {collection: {eq: "${collection}"}}}
        sort: {fields: frontmatter___postedAt, order: DESC}
      ) {
        edges {
          node {
            slug
            body
            headings(depth: h1) {
              value
            }
            frontmatter {
              postedAt
            }
            parent {
              ... on File {
                relativePath
              }
            }
          }
          next {
            slug
            headings(depth: h1) {
              value
            }
            frontmatter {
              postedAt
            }
          }
          previous {
            slug
            headings(depth: h1) {
              value
            }
            frontmatter {
              postedAt
            }
          }
        }
      }
    }
  `) as {
    data?: CreatePagesMdxQuery
    errors?: never
  }

  // Handle errors
  if (errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")
    return
  }

  data?.allMdx.edges.forEach(({ node, next, previous }): void => {
    const path = getMdxPath(collection, node?.slug ?? "")
    createPage({
      path,
      component: template,
      context: {
        slug: node.slug,
        node: {
          title: node?.headings?.[0]?.value,
          body: node.body,
          postedAt: node?.frontmatter?.postedAt,
          srcPath: `${srcFolder}/${(node?.parent as {relativePath?: string})?.relativePath}`
        },
        previous: previous == null
          ? null
          : {
              title: previous?.headings?.[0]?.value,
              postedAt: previous?.frontmatter?.postedAt,
              path: getMdxPath(collection, previous?.slug ?? "")
            },
        next: next == null
          ? null
          : {
              title: next?.headings?.[0]?.value,
              postedAt: next?.frontmatter?.postedAt,
              path: getMdxPath(collection, next?.slug ?? "")
            }
      }
    })
  })
}

exports.createPages = async (args: CreatePagesArgs) => {
  await createPageCollection({
    ...args,
    collection: "pages",
    template: path.resolve("./src/components/pages/Page.tsx"),
    srcFolder: "src/content/pages"
  })

  await createPageCollection({
    ...args,
    collection: "posts",
    template: path.resolve("./src/components/pages/Post.tsx"),
    srcFolder: "src/content/posts"
  })
}
