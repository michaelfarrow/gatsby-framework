import React from 'react'
import Link from 'gatsby-link'
import Img from 'components/image'

const SecondPage = props => {
  const { headerImage } = props.data
  const { colours } = headerImage
  return (
    <div>
      <header style={{height: '30em', overflow: 'hidden', position: 'relative'}}>
        <Img
          title='Header image'
          style={{backgroundColor: colours.dominant, position: 'absolute', width: '100%', height: '100%'}}
          alt='Greek food laid out on table'
          sizes={headerImage.sizes} />
      </header>
      <div className='layout-content'>
        <h1>Hi from the second page</h1>
        <p>
          Welcome to page 2
        </p>
        <Link to='/'> Go back to the homepage
        </Link>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query HeaderImageQuery {
    headerImage: imageSharp(fields: { id: { eq: "header3" } } ) {
      ...Image_sizeBlog
    }
  }
`

export default SecondPage
