const path = require('path');

const config = {
    entry: './ts/index.ts',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'index.bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    devtool: "source-map"
};

module.exports = config;