const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config')


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry:  resolve('src/main.js'), // 等价格path.resolve(__dirname, "../src/main.js")
    output: {
        path: resolve('dist'),          //打包后的文件存放的地方
        filename: '[name].[hash:8].js'    //打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:resolve('index.html'),       // 模板html未知
            filename: "index.html",               //在目标文件中，生成的html文件名
            hash: true,
        })
    ]
}