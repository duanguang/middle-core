var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [],
    resolve: {
        modulesDirectories: ['', 'src', 'node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};
