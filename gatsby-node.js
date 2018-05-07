const importer = require('lib/importer')(__dirname)

const createPages = importer('lib/createPages')
const onCreateNode = importer('lib/onCreateNode')
const modifyWebpackConfig = importer('lib/modifyWebpackConfig')

const handler = (handlers, key, noop) => {
  if (!noop) {
    noop = () => {
      return null
    }
  }
  return handlers[key] || noop
}

exports.createPages = _ => {
  return Promise.all(
    Object
      .values(createPages)
      .map(f => f(_))
  )
}

exports.onCreateNode = _ => {
  return handler(
    onCreateNode,
    _.node.internal.type
  )(_)
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  return handler(
    modifyWebpackConfig,
    stage,
    config => config
  )(config)
}
