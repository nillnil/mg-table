'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const webpackDeployConfig = require('./webpack.deploy.conf')

const spinner = ora(
  'building for ' + process.env.env_config + ' environment...'
)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(process.env.env_config === 'prod' ? webpackConfig : webpackDeployConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' Build complete.\n'))
    if (process.env.env_config === 'prod') {
      console.log(
        chalk.yellow(
          ' Tip: built files are meant to be served over an HTTP server.\n' +
          " Opening index.html over file:// won't work.\n"
        )
      )
    } else if (process.env.env_config === 'deploy') {
      console.log(
        chalk.yellow(
          ' Now you can run npm publish. upload to npm.\n'
        )
      )
    }
  })
})
