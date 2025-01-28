const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo App',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        allowedHosts: [
            'todo-app.markortleb.com',  // Allow requests from this hostname
            'localhost',                  // Allow localhost
            '127.0.0.1'                   // Allow requests from localhost IP
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
    },
};