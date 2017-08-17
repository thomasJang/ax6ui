const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let entry = {
  index: './index.js',
};

let plugins = [
  //new CleanWebpackPlugin(['dist'])
];

let menu = [
  'AX6Util',
  'AX6UIMask',
  'AX6UIFormatter',
  'AX6UICalendar',
  'AX6UIPicker',
  'AX6UIPalette',
  'AX6UIDialog',
  'AX6UIToast',
  'AX6UISelect',
  'AX6UIAutocomplete',
  'AX6UIMenu',
  'AX6UIGrid',
  'AX6UIModal',
  'AX6UIUploader',
  'AX6UITooltip',
  'AX6UIDocker',
];

for (let k in entry) {
  let obj = {
    inject: false,
    commonChunks: [],
    chunks: [k],
    menu: menu,
    title: "AX6UI SAMPLE (" + k + ")",
    filename: k + '.html',
    favicon: './assets/favicon.ico',
    template: './assets/sample.ejs'
  };
  plugins.push(new HtmlWebpackPlugin(obj));
}

webpack.logLevel = 'NONE';

// module.exports
module.exports = {
  entry: entry,
  plugins: plugins,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 4000
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {test: /\.css$/, use: 'css-loader'},
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ]
  }
};