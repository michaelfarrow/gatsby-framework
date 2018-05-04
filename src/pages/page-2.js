import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const SecondPage = props => {
  const { headerImage } = props.data
  const { colours } = headerImage.fields
  return (
    <div>
      <header className='header'>
        <Img
          title='Header image'
          style={{backgroundColor: colours.dominant}}
          alt='Greek food laid out on table'
          sizes={headerImage.sizes} />
      </header>
      <h1>Hi from the second page</h1>
      <p>
        Welcome to page 2
      </p>
      <Link to='/'> Go back to the homepage
      </Link>
    </div>
  )
}

export const pageQuery = graphql`
  query HeaderImageQuery {
    headerImage: imageSharp(fields: { id: { eq: "header2" } } ) {
      fields {
        colours {
          dominant
          palette
        }
      }
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes_noBase64
      }
    }
  }
`

export default SecondPage
