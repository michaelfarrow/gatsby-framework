const klaw = require('klaw-sync')
const path = require('path')
const _ = require('lodash')

module.exports = base => dir => {
  const _dir = path.resolve(base, dir)
  const imported = {}
  klaw(_dir, {
    nodir: true,
    filter: ({path}) => path.match(/\.js$/)
  }).forEach(({path}) => {
    _.set(
      imported,
      path
        .substr(_dir.length + 1)
        .replace(/\//g, '.')
        .replace(/\.js$/, ''),
      require(path)
    )
  })
  return imported
}
