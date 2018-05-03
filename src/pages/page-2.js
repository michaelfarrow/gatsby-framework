import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const SecondPage = props => {
  const { headerImage } = props.data
  const { colours } = headerImage.fields
  // const { palette } = headerImage.fields.colours
  // const _pallete = palette.slice(0, 2)
  // const paletteTotal = _pallete.length
  // const gradient = _pallete.map((c, i) => `${c} ${i/(paletteTotal-1)*100}%`)
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
    headerImage: imageSharp(id: { regex: "/header5/" }) {
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
