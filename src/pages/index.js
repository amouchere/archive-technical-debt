import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { navigate } from "gatsby"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Technical Debt" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const tags = node.frontmatter.tags
        return (
            <article 
                key={node.fields.slug}
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article">
                <header>
                    <h2>
                        <Link to={node.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                        </Link>
                    </h2>
                     
                    <div style={{
                        display: 'flex',
                        flexFlow: 'row wrap',
                        justifyContent: 'left',
                        paddingBottom: '2%',
                    }}>
                        <small>{node.frontmatter.date}</small>
                        {tags.map((tag) => {
                            return [
                              <div
                                key={tag}
                                variant="outlined"
                                onClick={event => { navigate(`/tags/${tag.toLowerCase()}`) }}
                                style={{
                                  fontSize: 12,
                                  color: 'grey',
                                  marginLeft: '2.5%',
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                <p>
                                  {tag}
                                </p>
                              </div>
                            ]
                        })}
                    </div>
                </header>
               
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
            </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          tags
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
}
`