process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')
const merge = require('merge')

const path = require('path');

const aliasConfig = {
    mode: 'production',
    entry: {
      application: './app/javascript/packs/application.js',
      index: './app/javascript/packs/index.jsx',
      emailContainer: './app/javascript/packs/components/emailContainer.jsx',
      messageContainer: './app/javascript/packs/components/messageContainer.jsx',
      customMailAddress: './app/javascript/packs/components/customMailAddress.jsx',
      customIframe: './app/javascript/packs/components/customIframe.jsx',
      emailMessageCreator: './app/javascript/packs/components/emailMessageCreator.jsx',
      message: './app/javascript/packs/components/message.jsx',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve('public', 'packs'),
    },
     optimization: {
       splitChunks: {
           chunks: 'all',
           },
     },
};

module.exports = merge(environment.toWebpackConfig(), aliasConfig);