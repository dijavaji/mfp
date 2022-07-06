const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode:'development',
  output:{publicPath: 'http://127.0.0.1:8080/'},
  devServer: {
    port: 8080,
    historyApiFallback:{
      index:'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({name :'container',
                            remotes : { marketing:'marketingRemote@http://127.0.0.1:8081/remoteEntry.js',
                                        auth:'authRemote@http://127.0.0.1:8082/remoteEntry.js',
                                        dashboard:'dashboardRemote@http://127.0.0.1:8083/remoteEntry.js',
                                },
                            shared : packageJson.dependencies,
                            }),
    new HtmlWebpackPlugin({template: './public/index.html'})
  ],
};

module.exports = merge(commonConfig,devConfig);
