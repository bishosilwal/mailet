process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const { merge } = require('webpack-merge')
// Enable the default config
environment.splitChunks()

module.exports = merge(
  environment.toWebpackConfig(),
  {
    mode: 'production',
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    },
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.jsx$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|jsx|css|html|svg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  }
)
