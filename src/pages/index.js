import React from 'react'
import { transitions, selectTransitionStyle } from 'utils/transition'

export default class IndexPage extends React.Component {

  static transitionEnterDuration = 300
  static transitionExitDuration = 150

  render () {
    const { data } = this.props
    const meta = data.site.siteMetadata
    return (
      <div style={selectTransitionStyle(this, transitions.fade)}>
        <div className='content'>
          <div className='title'>
            {meta.title}
          </div>
          <div className='subtitle'>
            <span>{meta.version}</span>
          </div>
        </div>
      </div>
    )
  }

}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        version
      }
    }
  }
`
