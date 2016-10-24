/* eslint-env node */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const rootPath = process.cwd();
const path = require('path');
require('dotenv').config({
  silent: true,
});


const webpackConfig = {
  entry: [
    'whatwg-fetch',
    './app/src/index.jsx',
  ],
  devtool: 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'app/template.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
      VERSION: JSON.stringify(require('./package.json').version),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  // this section allows imports with absolute paths (as if usiong node_modules)
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      include: [
        path.resolve(__dirname, 'app'),
        path.resolve(__dirname, 'node_modules/flash-notification-react-redux'),
      ],
      loaders: ['babel-loader'],
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/i,
      loaders: ['file?name=[path][name].[ext]'],
    }, {
      test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/i,
      loaders: ['url-loader?mimetype=application/font-woff'],
    }],
  },
  postcss: function () {
    return [autoprefixer];
  },
};


// Environment configuration
if (process.env.NODE_ENV === 'production') {
  // Loaders
  webpackConfig.module.loaders.push({
    test: /(\.scss|\.css)$/,
    loader: ExtractTextPlugin.extract('css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
  });
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?{progressive:true, optimizationLevel: 7,' +
      ' interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
    ],
  });
  // Plugins
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true,
    },
    comments: false,
  }));
  webpackConfig.plugins.push(new ExtractTextPlugin('styles-[hash].css'));
} else {
  // Activating source map
  webpackConfig.devtool = 'source-map';
  // Loaders
  webpackConfig.module.loaders.push({
    test: /(\.scss|\.css)$/,
    loader: ExtractTextPlugin.extract('css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
  });
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: ['file?name=[path][name].[ext]'],
  });
}

module.exports = webpackConfig;
