import React from 'react'
import Html from 'components/html'

export default function PostPage ({data, // this prop will be injected by the GraphQL query below.
  }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, fields, html, images } = markdownRemark
  return (
    <div className='blog-post-container'>
      <div className='layout-content'>
        <h1>{frontmatter.title}</h1>
        <h2>{fields.date}</h2>
        <Html className='blog-post-content' html={html} images={images} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { type: { eq: "post" }, slug: { eq: $slug } }) {
      html
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        title
      }
      images {
        relativePath
        childImageSharp {
          ...Image_sizeBlog
        }
      }
    }
  }
`