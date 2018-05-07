const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

module.exports = ({ node, getNode, getNodes, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  const parentNode = getNode(node.parent)
  const relativeFilePath = createFilePath({
    node,
    getNode,
    basePath: parentNode.dir,
    trailingSlash: false
  })

  if (parentNode.sourceInstanceName === 'post') {
    const match = relativeFilePath.match(/^\/(\d{4}-\d{2}-\d{2})-(.*?)$/)
    if (!match) throw new Error(`post filename must be in the format "/YYYY-MM-DD-title.md", got "${relativeFilePath}"`)
    const date = match[1]
    const slug = match[2]
    createNodeField({
      node,
      name: 'date',
      value: date
    })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  } else {
    createNodeField({
      node,
      name: 'date',
      value: '1970-01-01'
    })
    createNodeField({
      node,
      name: 'slug',
      value: relativeFilePath.replace(/^\//, '')
    })
  }

  createNodeField({
    node,
    name: 'type',
    value: parentNode.sourceInstanceName
  })

  const regex = /(?:!\[(.*?)\]\((.*?)(\s*"(.*?)")?\))/g
  let imageMatch
  let images = []
  while (imageMatch = regex.exec(node.internal.content)) {
    images.push(imageMatch[2])
  }
  images = _.uniq(images)
  const fileNodes = getNodes()
    .filter(n => n.internal.type === 'File')
    .filter(n => n.sourceInstanceName === 'img')
    .filter(n => images.includes(n.relativePath))
  node.images___NODE = fileNodes.map(n => n.id)
}
