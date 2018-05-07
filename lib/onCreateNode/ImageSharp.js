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
    const parentNode = getNode(node.parent)
    const { relativePath } = parentNode
    Jimp.read(parentNode.absolutePath, (err, image) => {
      if (err) return reject(err)
      const imageId = relativePath.split('.').slice(0, -1).join('.')
      node.colours = {
        dominant: rgbToHex(ColorThief.getColor(image)),
        palette: ColorThief.getPalette(image).map(rgbToHex)
      }
      createNodeField({
        node,
        name: 'id',
        value: imageId
      })
      resolve()
    })
  })
}
