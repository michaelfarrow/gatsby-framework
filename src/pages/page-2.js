import React from 'react'
import Link from 'gatsby-link'
import Img from 'components/image'
import { transitions, selectTransitionStyle } from 'utils/transition'

export default class SecondPage extends React.Component {

  static transitionEnterDuration = 300
  static transitionExitDuration = 150

  render () {
    const { data } = this.props
    const { headerImage } = data
    const { colours } = headerImage
    return (
      <div style={selectTransitionStyle(this, transitions.fade)}>
        <div>
          <header style={{height: '30em', overflow: 'hidden', position: 'relative'}}>
            <Img
              title='Header image'
              style={{backgroundColor: colours.dominant, position: 'absolute', width: '100%', height: '100%'}}
              alt='Greek food laid out on table'
              sizes={headerImage.sizes} />
          </header>
        </div>
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

}

export const pageQuery = graphql`
  query HeaderImageQuery {
    headerImage: imageSharp(fields: { id: { eq: "header3" } } ) {
      ...Image_sizeBlog
    }
  }
`
