import React from 'react'
import Link from 'gatsby-link'

const Nav = () => (
  <nav id='nav-main'>
    <ul>
      <li>
        <Link to='/page-2' activeClassName='current'> Page 2
        </Link>
      </li>
      <li>
        <Link to='/blog' activeClassName='current'> Blog
        </Link>
      </li>
      <li>
        <Link to='/work' activeClassName='current'> Work
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
