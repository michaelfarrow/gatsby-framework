const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

module.exports = ({ graphql, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators
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
      pageLength: 5,
      pathPrefix: 'blog'
    })
    res.data.posts.edges.forEach(({ node }) => {
      const { slug } = node.fields
      createPage({
        path: `/blog/${slug}`,
        component: path.resolve('src/templates/post.js'),
        context: {
          slug: slug
        }
      })
    })
  })
}
