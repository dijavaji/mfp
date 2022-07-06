const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode:'production',
  output:{
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({name :'container',
                            remotes : {
                              marketing:`marketingRemote@${domain}/marketing/latest/remoteEntry.js`,
                              auth:`authRemote@${domain}/auth/latest/remoteEntry.js`,
                              auth:`dashboardRemote@${domain}/auth/latest/remoteEntry.js`,
                              },
                            shared : packageJson.dependencies,
                            }),

  ],
};

module.exports = merge(commonConfig,prodConfig);
