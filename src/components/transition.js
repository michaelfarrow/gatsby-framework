import React from 'react'

export default class Transition extends React.Component {

  renderContents () {
    return <div/>
  }

  render () {
    const { transition } = this.props
    return (
      <div className='transition-container' style={transition.style.container}>
        <div className='transition-inner' style={transition.style.inner}>
          {this.renderContents()}
        </div>
      </div>
    )
  }

  static transition = timeout => ({
    container: {
      entering: {
        left: '100%'
      },
      entered: {
        transition: `left ${timeout}ms ease-in-out`,
        left: '0%'
      },
      exiting: {
        transition: `left ${timeout}ms ease-in-out`,
        left: '-100%'
      }
    },
    inner: {
      entering: {
        left: '-100%'
      },
      entered: {
        transition: `left ${timeout}ms ease-in-out`,
        left: '0%'
      },
      exiting: {
        transition: `left ${timeout}ms ease-in-out`,
        left: '100%'
      }
    }
  })

}
