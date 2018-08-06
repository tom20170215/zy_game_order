const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name][chunkhash:8].css',
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'app/js/main.js'),
        viewport: path.resolve(__dirname, 'app/js/viewport.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'px2rem-loader',
                            options: {
                                remUnit: 40,
                                remPrecision: 8
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(mp3)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'audio/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(jpg|svg|gif|png|ttf|svg|eot|woff|)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[ext]'
                    }
                }]
            },
            {
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/views/index.html',
            filename: 'index.html',
            inject: true,
            chunks: ['main', 'viewport'],
            minify: {
                removeAttributeQuotes: true, //移出属性的引号
                collapseWhitespace: true,
                removeComments: true
            },
            hash: true
        }),
        new CleanWebpackPlugin(['dist']),
        extractSass
    ]    
}