import React from 'react'
import Html from 'components/html'
import { transitions, selectTransitionStyle } from 'utils/transition'

const componentTransitions = {
  title: ({enter, exit, delay}) => ({
    entering: {
      opacity: 0,
      transform: 'translateX(-2em)'
    },
    entered: {
      transition: `500ms ${delay + 250}ms ease-out`,
      transitionProperty: 'transform opacity',
      opacity: 1,
      transform: 'translateX(0em)'
    },
    exiting: {
      transition: `${exit}ms ease-out`,
      transitionProperty: 'transform opacity',
      opacity: 0,
      transform: 'translateX(2em)'
    }
  }),
  content: ({enter, exit, delay}) => ({
    entering: {
      opacity: 0,
      transform: 'translateX(-2em)'
    },
    entered: {
      transition: `500ms ${delay + 650}ms ease-out`,
      transitionProperty: 'transform opacity',
      opacity: 1,
      transform: 'translateX(0em)'
    },
    exiting: {
      transition: `${exit}ms ease-out`,
      transitionProperty: 'transform opacity',
      opacity: 0,
      transform: 'translateX(2em)'
    }
  })
}

export default class PostPage extends React.Component {

  static transitionEnterDuration = 300
  static transitionExitDuration = 150

  render () {
    const { data, transition } = this.props
    const { markdownRemark } = data
    const { frontmatter, fields, html, images } = markdownRemark
    return (
      <div style={selectTransitionStyle(this, transitions.fade)}>
        <div className='layout-content'>
          <div style={selectTransitionStyle(this, componentTransitions.title)}>
            <h1>{frontmatter.title}</h1>
            <h2>{fields.date}</h2>
          </div>
          <div style={selectTransitionStyle(this, componentTransitions.content)}>
            <Html className='blog-post-content' html={html} images={images} />
          </div>
        </div>
      </div>
    )
  }

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
