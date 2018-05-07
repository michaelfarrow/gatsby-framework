const path = require('path')

module.exports = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return graphql(`
    {
      work: allMarkdownRemark(
        filter: { fields: { type: { eq: "work" } } }
        sort: { order: DESC, fields: [fields___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const work = res.data.work.edges || []
    if (!work.length) return

    work.forEach(({ node }) => {
      const { slug } = node.fields
      createPage({
        path: `/work/${slug}`,
        component: path.resolve('src/templates/work.js'),
        context: {
          slug: slug
        }
      })
    })
  })
}
