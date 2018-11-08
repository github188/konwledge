const config = require('../config')
const utils = require('./utils')


module.exports = {
    entry:  utils.resolve('src/main.js'), // 等价格path.resolve(__dirname, "../src/main.js")
    output: {
        path: utils.resolve('dist'),          //打包后的文件存放的地方
        filename: '[name].[hash:8].js'    //打包后输出文件的文件名,因为要npm上传包时要指定对应的文件名
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

    ]
}