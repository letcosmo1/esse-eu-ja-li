const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/main.js',
        login: './src/js/login.js',
        index: './src/js/index.js',
        livro: './src/js/livro.js',
        pontuacao: './src/js/pontuacao.js',
        ranking: './src/js/ranking.js',
    },
    output: {
//        path: path.resolve(__dirname, 'dist'),
        path: 'dist',
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
            filename: 'index.html',
            chunks: ['main', 'index']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/livro.html',
            filename: 'livro.html',
            chunks: ['main', 'livro']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/login.html',
            filename: 'login.html',
            chunks: ['main', 'login']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/pontuacao.html',
            filename: 'pontuacao.html',
            chunks: ['main', 'pontuacao']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/ranking.html',
            filename: 'ranking.html',
            chunks: ['main', 'ranking']
        })
    ],
    watch: true,
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
        ] 
    }
}