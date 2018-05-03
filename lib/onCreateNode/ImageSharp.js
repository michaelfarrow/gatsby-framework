const { createFilePath } = require('gatsby-source-filesystem')
const ColorThief = require('color-thief-jimp')
const Jimp = require('jimp')

const componentToHex = c => {
  var hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

const rgbToHex = rgb => {
  return '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2])
}

module.exports = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  return new Promise((resolve, reject) => {
    Jimp.read(getNode(node.parent).absolutePath, (err, image) => {
      if (err) return reject(err)
      createNodeField({
        node,
        name: 'colours',
        value: {
          dominant: rgbToHex(ColorThief.getColor(image)),
          palette: ColorThief.getPalette(image).map(rgbToHex)
        }
      })
      resolve()
    })
  })
}
