import React from 'react'

const IndexPage = ({data}) => {
  const meta = data.site.siteMetadata
  return (
    <div id='layout-home'>
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

export default IndexPage

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
