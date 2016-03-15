/**
 * Webpack config for builds
 */
module.exports = require('./webpack.make')({
  BUILD: true,
  TEST: false,
  SERVER : false,
  LANG: 'indo'
})
