const path = require('path')
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


const webpackConfig = merge(baseWebpackConfig, {
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CleanWebpackPlugin(resolve('dist/*.*'), {
            root: resolve("/"),
            verbose: true,
            dry: false
        })
    ]
})

module.exports = webpackConfig;