import React from 'react'

export default function PostPage ({data, // this prop will be injected by the GraphQL query below.
  }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, fields, html } = markdownRemark
  return (
    <div className='blog-post-container'>
      <div className='blog-post'>
        <h1>{frontmatter.title}</h1>
        <h2>{fields.date}</h2>
        <div className='blog-post-content' dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        title
      }
    }
  }
`
