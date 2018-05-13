import React from 'react'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser'
import Img from 'components/image'
import Link from 'gatsby-link'

export default class Html extends React.Component {

  transform = (node, index) => {
    const { images } = this.props
    if (node.type === 'tag') {
      switch (node.name) {
        case 'img':
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
          break
        case 'a':
          const { location } = window
          const localRegex = new RegExp('^(\/|' + location.protocol + '\/\/' + location.host + '\/?)', 'i')
          const children = (node.children || []).map((child, index) => convertNodeToElement(child, index, this.transform))
          if (localRegex.test(node.attribs.href)) {
            return (
              <Link key={index} to={node.attribs.href.replace(localRegex, '/')}>
              {children}
              </Link>
            )
          } else {
            node.attribs.target = '_blank'
          }
          break
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
