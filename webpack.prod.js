const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    minChunks: 1,
                    maxInitialRequests: 5,
                    priority: 100
                },
                common: {
                    test: /[\\/]src[\\/]js[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    priority: 1
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});