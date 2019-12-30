const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'production',
    entry: './src/vue/index.js',
    output: {
        path: path.resolve(__dirname, 'web', 'js'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    watchOptions: {
        ignored: /node_modules/
    }
};