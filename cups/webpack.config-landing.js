const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/landing.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'landing.js'
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three')   // <----- Addition
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};