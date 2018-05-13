// /* eslint-disable react/prop-types */
// /* globals window CustomEvent */
import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group'
import createHistory from 'history/createBrowserHistory'
// import { transitions } from 'utils/transition'
// import { mapValues } from 'lodash'
//
// const TRANSITION_BUFFER = 0.9
// const TRANSITION_STATUSES = [
//   'entering',
//   'entered',
//   'exiting',
//   'exited'
// ]
//
// const getTransitionStyle = ({ transition, timeout, status }) => {
//   if (transition) {
//     if (typeof transition === 'string') {
//       return transitions[transition] && transitions[transition](timeout)[status] || {}
//     } else if (typeof transition === 'function') {
//       const _transitions = transition(timeout) || {}
//       const mulitple = !!Object.keys(_transitions).filter(key => !TRANSITION_STATUSES.includes(key)).length
//       return mulitple
//         ? mapValues(_transitions, t => t[status] || {})
//         : _transitions[status] || {}
//     }
//   }
//   return {}
// }
//
// const timeout = 600
const historyExitingEventType = `history::exiting`

const getUserConfirmation = (pathname, callback) => {
  const event = new CustomEvent(historyExitingEventType, { detail: { pathname} })
  window.dispatchEvent(event)
  // setTimeout(() => {
  callback(true)
// }, timeout)
}

const history = createHistory({getUserConfirmation})

// block must return a string to conform
history.block((location, action) => location.pathname)

// let lastLocation = window.location
//
// history.listen(location => {
//   lastLocation = location
// })
//
// // monkey patching to prevent pushing same url into history stack
// const prevHistoryPush = history.push
// history.push = (location, state = {}) => {
//   const isLocation = !!location.pathname
//   const path = isLocation
//     ? location.pathname + location.search + location.hash
//     : location
//   if (lastLocation === null ||
//     path !== lastLocation.pathname + lastLocation.search + lastLocation.hash ||
//     JSON.stringify(state || {}) !== JSON.stringify(lastLocation.state || {})
//   ) {
//     prevHistoryPush(isLocation ? location : path, isLocation ? undefined : state)
//   }
// }

exports.replaceHistory = () => history

class TransitionWrapper extends React.Component {

  static propTypes = {
    location: PropTypes.string.isRequired,
    component: PropTypes.any.isRequired,
    componentProps: PropTypes.object
  }

  static defaultProps = {
    componentProps: {}
  }

  state = {
    enter: false
  }

  render () {
    const { enter } = this.state
    const { location, children } = this.props
    const transitionProps = {
      timeout: {
        enter: 0,
        exit: 1000
      },
      // appear: true,
      // in: enter,
      key: location
    }
    return (
      <TransitionGroup>
        <Transition {...transitionProps}>
          {children}
        </Transition>
      </TransitionGroup>
    )
  }

}

class ReplaceComponentRenderer extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = { exiting: false, nextPageResources: {} }
  //   this.listenerHandler = this.listenerHandler.bind(this)
  // }
  //
  // listenerHandler (event) {
  //   const nextPageResources = this.props.loader.getResourcesForPathname(
  //     event.detail.pathname,
  //     nextPageResources => this.setState({ nextPageResources})
  //   ) || {}
  //   this.setState({ exiting: true, nextPageResources})
  // }
  //
  // componentDidMount () {
  //   window.addEventListener(historyExitingEventType, this.listenerHandler)
  // }
  //
  // componentWillUnmount () {
  //   window.removeEventListener(historyExitingEventType, this.listenerHandler)
  // }
  //
  // componentWillReceiveProps (nextProps) {
  //   if (this.props.location.key !== nextProps.location.key) {
  //     this.setState({ exiting: false, nextPageResources: {} })
  //   }
  // }

  lastExitDuration = 0

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.location.pathname !== nextProps.location.pathname
  }

  render () {
    const { component } = this.props.pageResources
    // const { transition } = component
    // const timeoutBuffered = timeout * TRANSITION_BUFFER
    // const transitionStyle = getTransitionStyle({transition, status, timeout: timeoutBuffered})
    // const hasTransition = !!Object.keys(transitionStyle).length
    // const transitionProps = {
    //   timeout: {
    //     enter: 0,
    //     exit: hasTransition ? timeout : 0
    //   },
    //   appear: true,
    //   in: !this.state.exiting,
    //   key: this.props.location.key
    // }
    // return (
    //   <Transition {...transitionProps}>
    //     {status => createElement(this.props.pageResources.component, {
    //        ...this.props,
    //        ...this.props.pageResources.json,
    //        transition: {
    //          status,
    //          timeout: hasTransition ? timeoutBuffered : 0,
    //          style: transitionStyle,
    //          nextPageResources: this.state.nextPageResources
    //        }
    //      })}
    //   </Transition>
    // )

    const enterDuration = component.transitionEnterDuration || 0
    const exitDuration = component.transitionExitDuration || 0

    const transitionProps = {
      timeout: {
        enter: 0,
        exit: exitDuration
      },
      appear: true,
      key: this.props.location.key // TODO: try pathname here to prevent duplicates
    }

    const newProps = {
      ...this.props,
      ...this.props.pageResources.json
    }

    const durationProps = {
      enter: enterDuration,
      exit: exitDuration,
      delay: this.lastExitDuration
    }

    this.lastExitDuration = exitDuration

    return (
      <TransitionGroup>
        <Transition {...transitionProps}>
          {status => (
             <div className='transition-container'>
               {createElement(component, {transition: {status, duration: {...durationProps}}, ...newProps})}
             </div>
           )}
        </Transition>
      </TransitionGroup>
    )

    // return (
    //   <TransitionGroup>
    //     <CSSTransition key={location.pathname} classNames='transition' timeout={{ enter: 1000, exit: 1000 }}>
    //       {createElement(component, {
    //          ...this.props,
    //          ...this.props.pageResources.json,
    //        // transition: {
    //        //   status,
    //        //   timeout: hasTransition ? timeoutBuffered : 0,
    //        //   style: transitionStyle,
    //        //   nextPageResources: this.state.nextPageResources
    //        // }
    //        })}
    //     </CSSTransition>
    //   </TransitionGroup>
    // )

  // return createElement(component, {
  //   ...this.props,
  //   ...this.props.pageResources.json,
  // // transition: {
  // //   status,
  // //   timeout: hasTransition ? timeoutBuffered : 0,
  // //   style: transitionStyle,
  // //   nextPageResources: this.state.nextPageResources
  // // }
  // })
  }
}

// eslint-disable-next-line react/display-name
exports.replaceComponentRenderer = ({ props, loader }) => {
  if (props.layout) {
    return undefined
  }
  return createElement(ReplaceComponentRenderer, { ...props, loader})
}

// import React, { createElement } from 'react'
// import { TransitionGroup } from 'react-transition-group'
//
// exports.wrapRootComponent = ({Root}) => {
//   return () => (
//     <TransitionGroup>
//       {createElement(Root)}
//     </TransitionGroup>
//   )
// }
