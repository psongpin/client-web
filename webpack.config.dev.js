// @flow
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const common = require('./webpack.config.common.js');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'eval',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/index',
  ],
  output: common.output,
  // resolve: common.resolve,
  plugins: common.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_CONNECTION: JSON.stringify(process.env.API_CONNECTION),
        CLIENT_URL: JSON.stringify(process.env.CLIENT_URL),
      },
    }),
    new CaseSensitivePathsPlugin(),
  ]),
  module: common.module,
  // postcss: common.postcss
};
