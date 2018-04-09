const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool:"eval-source-map",
    entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "[name].[hash].js"//打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css|scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }, {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        // contentBase: "./dist",//默认webpack-dev-server会为根文件夹提供本地服务器;如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port:8008,//设置默认监听端口，如果省略，默认为”8080“
        hot:true
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",// 模板html未知
            filename: "index.html", //在目标文件中，生成的html文件名
            hash: true,         //是否
        }),
        // new webpack.HotModuleReplacementPlugin(),//热加载插件    -----------即便不用这个插件，改变css，js，页面依旧会自动刷新？
        // new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        // new webpack.optimize.UglifyJsPlugin(),//webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
        //个人认为：随着webpack版本的提升，压缩代码功能早已经变成了默认设置

        // new ExtractTextPlugin("style.css"),//暂时无效,而且对于4.1版本的webpack而言会影响打包-------
        new CleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}