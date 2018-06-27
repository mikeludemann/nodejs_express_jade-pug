const paths = require('path');
const webpack = require('webpack');

module.exports = {

    mode: 'development', // "production" | "development" | "none"

    entry: './index.js', // Input file(s)

    output: {

        path: paths.resolve(__dirname, "./dist"),

        filename: 'bundle.js', // Output file

    },

    module: {

        rules: [

            {
                test: /\.html$/,
                use: [
                    {

                        loader: 'html-loader',

                        options: {

                            minimize: true

                        }

                    }

                ],

            },

            {
                test: /\.css$/,

                use: [

                    {
                        loader: "style-loader"
                    },

                    {
                        loader: "css-loader"
                    }

                ]

            },

            {
                test: /\.less$/,

                loader: 'less-loader'

            },

            {
                test: /\.(scss|sass)$/,

                loader: 'sass-loader'

            },

            {
                test: /\.styl$/,

                loader: 'stylus-loader'

            },

            {
                test: /\.js?$/, // (js|jsx)

                use: [
                    {
                        loader: 'babel-loader', // 'cache-loader'
                        options: {

                            presets: ['react', 'es2015']
        
                        }
                    }

                ],

                include: paths.resolve('./src/script/'),

                exclude: [

                    paths.resolve(__dirname, "/node_modules/"),
                    paths.resolve(__dirname, "/bower_components/")

                ]

            },

            {
                test: /\.exec\.js$/,

                loader: 'script-loader'

            },

            {
                test: /\.(ts|tsx)?$/,

                loader: 'ts-loader',

                options: {

                    presets: ['react', 'es2015']

                },

                exclude: [

                    paths.resolve(__dirname, "/node_modules/")

                ]

            },

            {
                test: /\.coffee$/,

                use: ['coffee-loader']

            },

            {
                test: /\.json$/,

                use: ['json-loader']

            },

            {
                test: /\.(png|jpg|gif|svg|jpeg|woff|webp|webm|bmp|tiff)$/,

                use: [

                    {

                        loader: 'file-loader',
                        options: {

                            name: '[path][name].[ext]',
                            publicPath: './src/assets/'

                        }

                    }

                ]

            },

            {
                test: /\.(png|jpg|gif|svg|jpeg|woff|webp|webm|bmp|tiff)$/,

                use: [

                    {

                        loader: 'url-loader',
                        options: {

                            limits: 16384,
                            fallback: 'responsive-loader'
                            
                        }

                    }

                ]

            }

        ]

    },

    mode: "development",

    devtool: "source-map",

    target: "web",

    externals: {

        react: "react",
        jquery: "jQuery"

    },

    stats: {

        assets: true,
        errors: true,
        errorDetails: true

    },

    watch: true,

    devServer: {

        proxy: {

            "/api": "http://localhost:3000"

        },

        contentBase: paths.join(__dirname, "public"),
        compress: false,
        https: false,
        noInfo: true

    }

}