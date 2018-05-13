import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'react-router-dom/withRouter'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from 'components/header'

import './index.scss'
// import './animations.css'

class TransitionHandler extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.location.pathname === window.location.pathname
  }

  render () {
    const {children} = this.props
    return (
      <div className='transition-container'>
        {children}
      </div>
    )
  }

}

class TemplateWrapper extends React.Component {

  static propTypes = {
    children: PropTypes.func
  }

  render () {
    const { children, location, data } = this.props
    const meta = data.site.siteMetadata
    return (
      <div>
        <Helmet>
          <title>
            {meta.title}
          </title>
          {meta.meta.map((meta, index) => <meta key={index} {...meta} />)}
        </Helmet>
        <Header title={meta.title} />
        {/* <TransitionGroup>
                          <CSSTransition key={location.pathname} classNames='transition' timeout={{ enter: 1000, exit: 1000 }}>
                            <TransitionHandler location={location}> */}
        <div>
          {children()}
        </div>
        {/* </TransitionHandler>
                                  </CSSTransition>
                                </TransitionGroup> */}
      </div>
    )
  }

}
//
// const TemplateWrapper = props => {
//   const { children, location, data } = props
//   const meta = data.site.siteMetadata
//   return (
//     <div>
//       <Helmet>
//         <title>
//           {meta.title}
//         </title>
//         {meta.meta.map((meta, index) => <meta key={index} {...meta} />)}
//       </Helmet>
//       <Header title={meta.title} />
//       <TransitionGroup>
//         <CSSTransition key={location.pathname} classNames='transition' timeout={{ enter: 1000, exit: 1000 }}>
//           <TransitionHandler location={location}>
//             <div>
//               {children()}
//             </div>
//           </TransitionHandler>
//         </CSSTransition>
//       </TransitionGroup>
//     </div>
//   )
// }

// TemplateWrapper.propTypes = {
//   children: PropTypes.func
// }

export default withRouter(TemplateWrapper)

//
// import React from 'react'
// import PropTypes from 'prop-types'
// import Helmet from 'react-helmet'
// import Header from 'components/header'
// import Nav from 'components/nav'
//
// import 'normalize.css'
// import './index.scss'
//
// const Layout = ({ location, children, data }) => {
//   const meta = data.site.siteMetadata
//   return (
//     <div id='layout-wrapper'>
//       <Helmet>
//         <title>
//           {meta.title}
//         </title>
//         {meta.meta.map((meta, index) => <meta key={index} {...meta} />)}
//       </Helmet>
//       <Header title={meta.title} />
//       <div id='layout-content-wrapper'>
//         {children()}
//       </div>
//     </div>
//   )
// }
//
// Layout.propTypes = {
//   children: PropTypes.func
// }
//
// export default Layout
//
export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        meta {
          name
          content
        }
        version
      }
    }
  }
`
