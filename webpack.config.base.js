'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  externals: {
    // require('tartan') is external and available on the global var `tartan`
    'tartan': 'tartan'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.json/, loader: 'json' },

      // Evaluate module.js and bundle pre-calculated exports as a value.
      // This allows to omit package.json from bundle.
      { test: function(path) {
        return path == __dirname + '/src/package.js';
      }, loaders: ['raw', 'val'] }
    ]
  },
  output: { library: 'identartan', libraryTarget: 'umd' },
  plugins:  [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
