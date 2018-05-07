module.exports = config => {
  config.merge({
    resolve: {
      modulesDirectories: ['src']
    }
  })
  return config
}
