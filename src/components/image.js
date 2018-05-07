import React from 'react'
import PropTypes from 'prop-types'

// based on gatsby-image

// Cache if we've seen an image before so we don't both with
// lazy-loading & fading in on subsequent mounts.
const imageCache = {}
const inImageCache = props => {
  // Find src
  const src = props.sizes
    ? props.sizes.src
    : props.resolutions.src

  if (imageCache[src]) {
    return true
  } else {
    imageCache[src] = true
    return false
  }
}

let io
const listeners = []

function getIO () {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          listeners.forEach(l => {
            if (l[0] === entry.target) {
              // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                io.unobserve(l[0])
                l[1]()
              }
            }
          })
        })
      },
      { rootMargin: `200px` }
    )
  }

  return io
}

const listenToIntersections = (el, cb) => {
  getIO().observe(el)
  listeners.push([el, cb])
}

let isWebpSupportedCache = null
const isWebpSupported = () => {
  if (isWebpSupportedCache !== null) {
    return isWebpSupportedCache
  }

  const elem =
  typeof window !== `undefined` ? window.document.createElement(`canvas`) : {}
  if (elem.getContext && elem.getContext(`2d`)) {
    isWebpSupportedCache =
      elem.toDataURL(`image/webp`).indexOf(`data:image/webp`) === 0
  } else {
    isWebpSupportedCache = false
  }

  return isWebpSupportedCache
}

const noscriptImg = props => {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  const src = props.src ? `src="${props.src}" ` : `src="" ` // required attribute
  const srcSet = props.srcSet ? `srcset="${props.srcSet}" ` : ``
  const sizes = props.sizes ? `sizes="${props.sizes}" ` : ``
  const title = props.title ? `title="${props.title}" ` : ``
  const alt = props.alt ? `alt="${props.alt}" ` : `alt="" ` // required attribute
  const width = props.width ? `width="${props.width}" ` : ``
  const height = props.height ? `height="${props.height}" ` : ``
  const opacity = props.opacity ? props.opacity : `1`
  const transitionDelay = props.transitionDelay ? props.transitionDelay : `0.5s`

  return `<img ${width}${height}${src}${srcSet}${alt}${title}${sizes}style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:${transitionDelay};opacity:${opacity};width:100%;height:100%;object-fit:cover;object-position:center"/>`
}

class Img extends React.Component {

  state = {}

  onRef = ref => {
    this.imgRef = ref
  }

  onLoad = () => {
    const { onLoad } = this.props
    let src = typeof this.imgRef.currentSrc !== 'undefined' ? this.imgRef.currentSrc : this.imgRef.src
    this.setState({currentSrc: src})
    onLoad()
  }

  render () {
    const { style, onLoad, ...otherProps } = this.props
    const { currentSrc } = this.state
    const imgStyle = {
      display: 'block',
      position: `absolute`,
      top: 0,
      left: 0,
      transition: `opacity 0.5s`,
      width: `100%`,
      height: `100%`
    }
    const imgSpan = <span style={{ backgroundImage: currentSrc && `url(${currentSrc})` || 'none', backgroundPosition: 'center', backgroundSize: 'cover', ...imgStyle, ...style }} />
    const img = (
    <img
      ref={this.onRef}
      {...otherProps}
      onLoad={this.onLoad}
      style={{ objectFit: `cover`, objectPosition: `center`, visbility: 'hidden', ...imgStyle, ...style }} />
    )
    return (
      <span>{img}{imgSpan}</span>
    )
  }
}

Img.propTypes = {
  style: PropTypes.object,
  onLoad: PropTypes.func
}

class Image extends React.Component {
  constructor (props) {
    super(props)

    // If this browser doesn't support the IntersectionObserver API
    // we default to start downloading the image right away.
    let isVisible = true
    let imgLoaded = true
    let IOSupported = false

    // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.
    const seenBefore = inImageCache(props)

    if (
      !seenBefore &&
      typeof window !== `undefined` &&
      window.IntersectionObserver
    ) {
      isVisible = false
      imgLoaded = false
      IOSupported = true
    }

    // Always don't render image while server rendering
    if (typeof window === `undefined`) {
      isVisible = false
      imgLoaded = false
    }

    this.state = {
      isVisible,
      imgLoaded,
    IOSupported}

    this.handleRef = this.handleRef.bind(this)
  }

  handleRef (ref) {
    if (this.state.IOSupported && ref) {
      listenToIntersections(ref, () => {
        this.setState({ isVisible: true, imgLoaded: false })
      })
    }
  }

  onLoad = () => {
    this.state.IOSupported && this.setState({ imgLoaded: true })
    this.props.onLoad && this.props.onLoad()
  }

  render () {
    const {title, alt, className, outerWrapperClassName, style = {}, imgStyle = {}, sizes, resolutions, backgroundColor, Tag} = this.props

    let bgColor
    if (typeof backgroundColor === `boolean`) {
      bgColor = `lightgray`
    } else {
      bgColor = backgroundColor
    }

    const imagePlaceholderStyle = {
      opacity: this.state.imgLoaded ? 0 : 1,
      transitionDelay: `0.25s`,
      ...imgStyle
    }

    const imageStyle = {
      opacity: this.state.imgLoaded || this.props.fadeIn === false ? 1 : 0,
      ...imgStyle
    }

    if (sizes || resolutions) {
      const image = sizes || resolutions

      let divStyle = {
        display: 'block',
        position: `relative`,
        overflow: `hidden`,
        ...style
      }
      let bgStyle = {
        backgroundColor: bgColor,
        position: `absolute`,
        top: 0,
        bottom: 0,
        opacity: !this.state.imgLoaded ? 1 : 0,
        transitionDelay: `0.35s`,
        right: 0,
        left: 0
      }
      let noScriptProps = { alt, title, ...image }

      if (!sizes) {
        divStyle = {
          position: `relative`,
          overflow: `hidden`,
          display: `inline-block`,
          width: image.width,
          height: image.height,
          ...style
        }
        bgStyle = {
          backgroundColor: bgColor,
          width: image.width,
          opacity: !this.state.imgLoaded ? 1 : 0,
          transitionDelay: `0.25s`,
          height: image.height
        }
        noScriptProps = { alt, title, width: image.width, height: image.height, ...image }

        if (style.display === `inherit`) {
          delete divStyle.display
        }
      }

      // Use webp by default if browser supports it
      if (image.srcWebp && image.srcSetWebp && isWebpSupported()) {
        image.src = image.srcWebp
        image.srcSet = image.srcSetWebp
      }

      // The outer div is necessary to reset the z-index to 0.
      return (
        <Tag className={`${
            outerWrapperClassName ? outerWrapperClassName : ``
          } gatsby-image-outer-wrapper`} style={{ display: 'block', position: style.position === `absolute` ? `initial` : `relative` }}>
          <Tag className={`${className ? className : ``} gatsby-image-wrapper`} style={divStyle} ref={this.handleRef}>
            {/* Preserve the aspect ratio. */}
            {sizes && <Tag style={{ display: 'block', width: `100%`, paddingBottom: `${100 / image.aspectRatio}%` }} />}
            {/* Show the blury base64 image. */}
            {image.base64 && (
             <Img
               alt={alt}
               title={title}
               src={image.base64}
               style={imagePlaceholderStyle} />
             )}
            {/* Show the traced SVG image. */}
            {image.tracedSVG && (
             <Img
               alt={alt}
               title={title}
               src={image.tracedSVG}
               style={imagePlaceholderStyle} />
             )}
            {/* Show a solid background color. */}
            {bgColor && (
             <Tag title={title} style={bgStyle} />
             )}
            {/* Once the image is visible (or the browser doesn't support IntersectionObserver), start downloading the image */}
            {this.state.isVisible && (
             <Img
               alt={alt}
               title={title}
               srcSet={image.srcSet}
               src={image.src}
               sizes={sizes && image.sizes || undefined}
               style={imageStyle}
               onLoad={this.onLoad}
               width={!sizes && image.width || undefined}
               height={!sizes && image.height || undefined} />
             )}
            {/* Show the original image during server-side rendering if JavaScript is disabled */}
            <noscript dangerouslySetInnerHTML={{ __html: noscriptImg(noScriptProps) }} />
          </Tag>
        </Tag>
      )
    }

    return null
  }
}

Image.defaultProps = {
  fadeIn: true,
  alt: ``,
  Tag: `div`
}

Image.propTypes = {
  responsiveResolution: PropTypes.object,
  responsiveSizes: PropTypes.object,
  resolutions: PropTypes.object,
  sizes: PropTypes.object,
  fadeIn: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Support Glamor's css prop.
  outerWrapperClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  position: PropTypes.string,
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLoad: PropTypes.func,
  Tag: PropTypes.string
}

export default Image

export const imageFragment = graphql`
  fragment Image_base on ImageSharp {
    colours {
      dominant
    }
  }
`

export const imageFragmentSizeBlog = graphql`
  fragment Image_sizeBlog on ImageSharp {
    ...Image_base
    sizes(maxWidth: 800) {
      ...GatsbyImageSharpSizes_noBase64
    }
  }
`
