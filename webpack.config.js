import path from { path };
// const path = require('path');

module.exports = {

    entry: "./app.js", // Input file(s)

    output: {

        filename: "./bundle.js", // Output file
        path: path.resolve(__dirname, "public") // XXX should be replace

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
                test: /\.(js|jsx)?$/,

                use: [

                    'cache-loader',
                    'babel-loader'

                ],

                include: path.resolve('/src/script/'),

                query: {

                    presets: ['react', 'es2015']

                },

                exclude: [

                    path.resolve(__dirname, "/node_modules/")

                ]

            },

            {
                test: /\.exec\.js$/,

                loader: 'script-loader'

            },

            {
                test: /\.(ts|tsx)?$/,

                loader: 'ts-loader',

                query: {

                    presets: ['react', 'es2015']

                },

                exclude: [

                    path.resolve(__dirname, "/node_modules/")

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

        contentBase: path.join(__dirname, "public"),
        compress: false,
        https: false,
        noInfo: true

    }

}