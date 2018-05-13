import React from 'react'
import Html from 'components/html'

export default class WorkPage extends React.Component {

  render () {
    const { data } = this.props
    const { markdownRemark } = data
    const { frontmatter, fields, html, images } = markdownRemark
    return (
      <div>
        <div>
          <h1>{frontmatter.title}</h1>
          <Html html={html} images={images} />
        </div>
      </div>
    )
  }

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
