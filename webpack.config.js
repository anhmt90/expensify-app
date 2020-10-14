const path = require('path')

module.exports = {
    entry: './src/app.js',
    // entry: './src/playground/hoc.js',
    output: {
        path: path.join(__dirname, 'public'),                   // must be absolute path
        filename: 'bundle.js'                                   // can be any name
    },

    // set up babel loader that will teach webpack how to convert jsx to javaScript 
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,           // ? helps support both scss and css
            // `use` allows to specify an array of loaders
            use: [      
                'style-loader',
                'css-loader',
                'sass-loader'
            ] 
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    /* 
        devServer is also responsible for generating the bundle.js but not as a physical file 
        but serving that up directly from memory to keep the devServer snappy and fast.
        To generate a physical bundle.js file, use script `webpack`
    */
    devServer: {  
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true //tell the dev-server to always serve up the index.html file for all unknown 404 -> client-side routing
    }
};