require('app-module-path').addPath(__dirname)

module.exports = {
  siteMetadata: {
    title: 'Gatsby',
    meta: [
      { name: 'description', content: 'Sample' },
      { name: 'keywords', content: 'sample, something' },
      { name: 'theme-color', content: 'rebeccapurple' }
    ],
    version: require('package.json').dependencies.gatsby
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'img'
      }
    },
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [
          require('precss'),
          require('autoprefixer')({
            browsers: ['last 2 versions', '> 5%', 'ie >= 8', 'Firefox > 2', 'Opera > 5']
          }),
          require('postcss-responsive-type'),
          require('postcss-font-magician')({
            formats: 'woff2 woff eot ttf svg otf'
          })
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'post'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/work`,
        name: 'work'
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark'
  ]
}
