import React from 'react'
import PropTypes from 'prop-types'
import EventEmitter from 'EventEmitter'

class Motions extends EventEmitter {

  motions = {}

  add (key) {
    motions.key = true
    this.emit('add')
  }

  has (key) {
    return !!this.motions[key]
  }

}

const motions = new Motions()

export class MotionRenderer extends React.Component {

  constructor (props) {
    super(props)
    motions.on('add', this.onAdd)
  }

  onAdd = () => {
    console.log('onAdd')
  }

  render () {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }

}

export class MotionSource extends React.Component {

  static propTypes = {
    source: PropTypes.string.isRequired
  }

  componentDidMount () {
    const { source } = this.props
    motions.add(source)
  }

  render () {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }

}
