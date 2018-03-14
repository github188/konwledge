const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,//正则
                use:{
                    loader:"babel-loader",
                },
                exclude:/node_modules///屏蔽不需要处理的文件（文件夹）（可选）
            },
            {
                test:/\.css|scss$/,
                use:[
                    "style-loader",
                    {loader:"css-loader",options: {
                        modules: true, // 指定启用css modules
                        localIdentName: '[name]__[local]--[hash:base64:5]', // 指定css的类名格式
                    }},
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:"3333",    //端口号
        hot:true
    },
    devtool:"eval-source-map",
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数.
            filename: "index.html",
            hash: true,
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
}