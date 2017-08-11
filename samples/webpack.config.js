const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let entry = {
  //common: './src/assets/common.js',
  index: './src/index.js',
  //mask: './src/mask.js',
  //formatter: './src/formatter.js',
  //calendar: './src/calendar.js',
  //picker: './src/picker.js',
  //palette: './src/palette.js',
  //dialog: './src/dialog.js',
  //toast: './src/toast.js',
  //select: './src/select.js',
  //autocomplete: './src/autocomplete.js',
  //menu: './src/menu.js',
  //grid: './src/grid.js',
  //modal: './src/modal.js',
  //uploader: './src/uploader.js',
  //tooltip: './src/tooltip.js',
  //docker: './src/docker.js',
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
  if (k != 'common') {
    let obj = {
      inject: false,
      commonChunks: [],
      chunks: [k],
      menu: menu,
      title: "AX6UI SAMPLE (" + k + ")",
      filename: k + '.html',
      favicon: './src/assets/favicon.ico',
      template: './src/assets/sample.ejs'
    };
    plugins.push(new HtmlWebpackPlugin(obj));
  }
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
            presets: ['es2015']
          }
        }
      }
    ]
  }
};