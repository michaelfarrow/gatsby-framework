const { createFilePath } = require('gatsby-source-filesystem')

module.exports = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  const relativeFilePath = createFilePath({
    node,
    getNode,
    basePath: 'src/posts/',
    trailingSlash: false
  })
  const match = relativeFilePath.match(/^\/(\d{4}-\d{2}-\d{2})-(.*?)$/)
  if (!match) throw new Error(`post filename must be in the format "/YYYY-MM-DD-title.md", got "${relativeFilePath}"`)
  createNodeField({
    node,
    name: 'date',
    value: match[1]
  })
  createNodeField({
    node,
    name: 'slug',
    value: match[2]
  })
  createNodeField({
    node,
    name: 'path',
    value: `/blog/${match[2]}`
  })
}
