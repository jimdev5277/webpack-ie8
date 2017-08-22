const path = require('path');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        // polyfill: [
        //     'es5-shim',
        //     'es5-shim/es5-sham',
        //     'babel-polyfill'
        // ],
        wl: [
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].min.js'
    },
    plugins: [
        new es3ifyPlugin(),
        new UglifyJSPlugin({
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                beautify: true,
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: false
        })
    ],
    resolve: {
        extensions: [
            ".js"
        ],
        modules: [path.join(__dirname, 'src'), "node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {
                        loader: 'postcss-loader', options: {
                        plugins: (loader) => [
                            require('autoprefixer')({
                                browsers: ['last 5 versions']
                            })
                        ]
                    }
                    },
                    {
                        loader: "sass-loader", options: {
                        sourceMap: false
                    }
                    }
                ]
            },
            {
                test: /\.js$/,
                // use: ['export-from-ie8/loader', 'babel-loader?cacheDirectory'],
                use: ['babel-loader?cacheDirectory'],
                include: path.join(__dirname, 'src')
            }]
    }
};