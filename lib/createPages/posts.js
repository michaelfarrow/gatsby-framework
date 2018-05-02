const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

module.exports = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return graphql(`
    {
      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [fields___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
              path
              date
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    createPaginatedPages({
      edges: res.data.posts.edges,
      createPage: createPage,
      pageTemplate: 'src/templates/posts.js',
      // pageLength: 5,
      pathPrefix: 'blog', // This is optional and defaults to an empty string if not used
    // buildPath: (index, pathPrefix) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
    // context: {}
    })
    res.data.posts.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.path,
        component: path.resolve('src/templates/post.js'),
        context: {}
      })
    })
  })
}
