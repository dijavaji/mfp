const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode:'development',
  output:{publicPath: 'http://127.0.0.1:8081/'},
  devServer: {
    port: 8081,
    historyApiFallback:{
      index:'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({name:'marketingRemote', filename: 'remoteEntry.js',
                                  exposes: {'./MarketingApp':'./src/bootstrap'},
                                  //shared: ['react', 'react-dom'],
                                  shared: packageJson.dependencies,
                                  }),
    new HtmlWebpackPlugin({template: './public/index.html'})
  ],
};

module.exports = merge(commonConfig,devConfig);
