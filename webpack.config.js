const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./main.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPlugin({
          template: './src/index.html',
          filename: './index.html'
        })
    ],
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true,
        publicPath: '/',
        historyApiFallback: true,
        proxy: {
            '/oauth': {
                target: 'http://192.168.1.64:8080',
                
            },
            '/api': {
                target: 'http://192.168.1.64:8080',
                pathRewrite: {
                    '/api' : ''
                  }
            }
        }
    },
    devtool: 'source-map'
}