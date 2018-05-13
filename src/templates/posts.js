import React from 'react'
import Link from 'gatsby-link'
import { transitions, selectTransitionStyle } from 'utils/transition'

import './posts.scss'

const NavLink = props => {
  if (!props.test) {
    return (
      <Link to={props.url}>
      {props.text}
      </Link>
    )
  } else {
    return <span>{props.text}</span>
  }
}

const componentTransitions = {
  post: ({enter, exit, delay}) => ({
    entering: {
      opacity: 0,
      transform: 'translateX(-2em)'
    },
    entered: {
      transition: `500ms ease-out`,
      transitionProperty: 'transform opacity',
      opacity: 1,
      transform: 'translateX(0em)'
    },
    exiting: {
      transition: `${exit}ms ease-out`,
      transitionProperty: 'transform opacity',
      opacity: 0,
      transform: 'translateX(2em)'
    }
  })
}

export default class PostsPage extends React.Component {

  static transitionEnterDuration = 300
  static transitionExitDuration = 150

  render () {
    const { data, pathContext, transition } = this.props
    const { group, index, first, last, pageCount, pathPrefix } = pathContext
    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
    const nextUrl = (index + 1).toString()

    return (
      <div style={selectTransitionStyle(this, transitions.fade)}>
        <h4>{pageCount} Pages</h4>
        {group.map(({ node }, index) => {
           const nodeStyle = selectTransitionStyle(this, componentTransitions.post)
           if (transition.status === 'entered') {
             nodeStyle.transitionDelay = `${transition.duration.delay + index * 200}ms`
           }
           return (
             <div key={node.id} className='posts-post' style={nodeStyle}>
               <div className='date'>
                 {node.fields.date}
               </div>
               <Link className='blogUrl' to={`/${pathPrefix}/${node.fields.slug}`}>
               {node.frontmatter.title}
               </Link>
               <div>
                 {node.excerpt}
               </div>
             </div>
           )
         })}
        <div className='previousLink'>
          <NavLink test={first} url={`/${pathPrefix}/${previousUrl}`} text='Go to Previous Page' />
        </div>
        <div className='nextLink'>
          <NavLink test={last} url={`/${pathPrefix}/${nextUrl}`} text='Go to Next Page' />
        </div>
      </div>
    )
  }

}
