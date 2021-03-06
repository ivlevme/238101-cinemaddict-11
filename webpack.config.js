const path = require('path');

const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);


module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    overlay: true
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['es-us'],
    })
  ],
};
