import React from 'react'
import Link from 'gatsby-link'
import Nav from 'components/nav'

const Header = ({ title }) => (
  <header id='header-main'>
    <h1><Link to='/'> {title} </Link></h1>
    <Nav/>
  </header>
)

export default Header
