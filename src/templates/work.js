import React from 'react'
import Html from 'components/html'

export default function WorkPage ({data}) {
  const { markdownRemark } = data
  const { frontmatter, fields, html, images } = markdownRemark
  return (
    <div className='work-container'>
      <div className='work'>
        <h1>{frontmatter.title}</h1>
        <Html className='blog-post-content' html={html} images={images} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query WorkByPath($slug: String!) {
    markdownRemark(fields: { type: { eq: "work" }, slug: { eq: $slug } }) {
      html
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
