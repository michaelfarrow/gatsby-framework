const createPages = require('./lib/createPages')
const onCreateNode = require('./lib/onCreateNode')

exports.onCreateNode = _ => {
  const { node } = _
  const type = node.internal.type
  if (onCreateNode[type]) return onCreateNode[type](_)
}

exports.createPages = _ => Promise.all(createPages.map(f => f(_)))
