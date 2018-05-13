export function transitionDelayed (transition, type, delay) {
  return transition && Object.assign(
      {},
      transition.style[type] || {},
      transition.status === 'entered'
        ? { transitionDelay: `${transition.timeout * delay}ms` }
        : {}
  )
}

export function selectTransitionStyle (component, transitionMethod) {
  const props = component.props.transition || {}
  const { status, duration = {} } = props
  const { enter = 0, exit = 0, delay = 0 } = duration
  const transition = transitionMethod && transitionMethod({enter, exit, delay})
  return transition && transition[status] || {}
}

export const transitions = {
  none: () => ({}),
  fade: ({enter, exit, delay}) => ({
    entering: {
      opacity: 0
    },
    entered: {
      transition: `opacity ${enter}ms ${delay}ms ease-in-out`,
      opacity: 1
    },
    exiting: {
      transition: `opacity ${exit}ms ease-in-out`,
      opacity: 0
    }
  })
}
