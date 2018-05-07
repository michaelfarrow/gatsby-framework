import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from 'components/header'
import Nav from 'components/nav'

import 'normalize.css'
import './index.scss'

const Layout = ({ location, children, data }) => {
  const meta = data.site.siteMetadata
  const helmet = <Helmet title={meta.title} meta={meta.meta} />
  if (location.pathname === '/') {
    return (
      <div id='layout-wrapper-home'>
        <div className='container'>
          {helmet}
          {children()}
          <Nav/>
        </div>
      </div>
    )
  }
  return (
    <div className='layout-wrapper'>
      {helmet}
      <Header title={meta.title} />
      <div className='layout-content-wrapper'>
        {children()}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        version
      }
    }
  }
`
