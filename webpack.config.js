var path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    optimization: {
        minimizer: [ new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            loader: [
                MiniCSSExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [

                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        useRelativePath: true
                    }
                }
            ]
        }],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Desafio Latam',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            filename: 'index.html',
            template: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: "./styles.css",
        })
    ]
}