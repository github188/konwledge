const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool:"eval-source-map",
    entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "[name].js"//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",// 模板html未知
            filename: "index.html", //在目标文件中，生成的html文件名
            hash: true,         //是否
        })
    ],
}