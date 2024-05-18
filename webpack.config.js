const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/main.js',
        login: './src/js/login.js',
        index: './src/js/index.js',
        livro: './src/js/livro.js',
        pontuacao: './src/js/pontuacao.js',
        ranking: './src/js/ranking.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ] 
    }
}