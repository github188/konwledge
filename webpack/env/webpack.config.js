const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '', dir)
}

module.exports = {
    entry: resolve('main.js'),
    output: {
        path: resolve('dist')
    },
    module: {
        rules: []
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:"3333",    //端口号
        hot:true
    },
    devtool:"eval-source-map",
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: resolve('index.html'),//new 一个这个插件的实例，并传入相关的参数.
            filename: "index.html",
            hash: true,
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
}