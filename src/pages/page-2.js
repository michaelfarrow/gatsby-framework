import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const SecondPage = props => (
  <div>
    <header className='header'>
      <Img title='Header image' alt='Greek food laid out on table' sizes={props.data.headerImage.sizes} />
    </header>
    <h1>Hi from the second page</h1>
    <p>
      Welcome to page 2
    </p>
    <Link to='/'> Go back to the homepage
    </Link>
  </div>
)

export const pageQuery = graphql`
  query HeaderImageQuery {
    headerImage: imageSharp(id: { regex: "/header/" }) {
      sizes(maxWidth: 1240, traceSVG: { color: "red", background: "black" }) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`

export default SecondPage
