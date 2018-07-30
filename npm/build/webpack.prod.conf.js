const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')


const webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
    ]
})

module.exports = webpackConfig;