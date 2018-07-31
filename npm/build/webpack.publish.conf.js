const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const utils = require('./utils')


const webpackConfig = merge(baseWebpackConfig, {
    entry: {
        'date-string-transform':utils.resolve('src/timeformat'),
        'date-string-transform.script':utils.resolve('src/timeformat/index.script.js')
    },
    output: {
        path: utils.resolve('publish/format'),          //打包后的文件存放的地方
        filename: '[name].js'    //打包后输出文件的文件名,因为要npm上传包时要指定对应的文件名所以没有选择带hash
    },
    plugins: [
        new webpack.BannerPlugin('个人所有，欢迎使用'),
        new CleanWebpackPlugin(utils.resolve('publish/**/*.*'), {
            root: utils.resolve("/"),
            verbose: true,
            dry: false
        })
    ]
});

module.exports = webpackConfig;