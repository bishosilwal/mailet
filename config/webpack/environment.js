const { environment } = require('@rails/webpacker')
var webpack = require('webpack');

environment.config.resolve.alias = {
  "react": "preact/compat",
  "react-dom/test-utils": "preact/test-utils",
  "react-dom": "preact/compat",
}

environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
  }),
)
environment.splitChunks();
// Enable the default config
module.exports = environment
