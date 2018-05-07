import React from 'react'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser'
import Img from 'components/image'

export default class Html extends React.Component {

  transform = (node, index) => {
    const { images } = this.props
    if (node.type === 'tag') {
      if (node.name === 'img') {
        const image = images.find(i => i.relativePath === node.attribs.src)
        if (image && image.childImageSharp) {
          const { sizes, dimensions, colours = {} } = image.childImageSharp
          return (
            <Img
              Tag='span'
              style={{backgroundColor: colours.dominant || 'white'}}
              key={index}
              sizes={sizes}
              dimensions={dimensions}
              alt={node.attribs.alt} />
          )
        }
      }
    }
  }

  render () {
    const { html, images, props } = this.props
    return (
      <div {...props}>
        {ReactHtmlParser(html, {transform: this.transform})}
      </div>
    )
  }

}
