import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import Dotenv from 'dotenv-webpack'

var nodeModules = {}

fs.readdirSync('node_modules')
  .filter(x => { return ['.bin'].indexOf(x) === -1 })
  .forEach(mod => { nodeModules[mod] = 'commonjs ' + mod })

export default {
  entry: path.join(__dirname, 'src/app.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'source-map',
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ]
}
