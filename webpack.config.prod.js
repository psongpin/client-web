const webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const common = require('./webpack.config.common.js');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'source-map',
  entry: {
    app: './src/index',
    vendor: [
      'qs',
      'react',
      'react-dom',
      'react-flexbox-grid',
      'react-markdown',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-select',
      'react-simplemde-editor',
      'react-toolbox',
      'redux',
      'redux-actions',
      'redux-batched-actions',
      'redux-compose-hors',
      'redux-retype-actions',
      'redux-thunk',
      'reselect',
      'validate.js',
      'history',
      'humps',
      'immutable',
      'jquery',
      'jwt-decode',
      'khange',
      'material-design-icons',
      'classnames',
      'deepmerge',
      'empty',
    ],
  },
  output: Object.assign(common.output, { filename: '[name].[chunkhash].js' }),
  plugins: common.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        USERS_SERVICE: JSON.stringify(process.env.USERS_SERVICE),
        CLIENT_URL: JSON.stringify(process.env.CLIENT_URL),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new StatsWriterPlugin(),
  ]),
  module: common.module,
};
