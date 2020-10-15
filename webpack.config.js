const path = require('path')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = (env) => {
    console.log('env', env)
    const isProduction = env === 'production';
    const MiniCssExtract = new MiniCssExtractPlugin({filename: 'styles.css'});

    return {
        entry: './src/app.js',
        // entry: './src/playground/hoc.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),           // must be absolute path
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
                // use: [      
                //     'style-loader',   //handle inline styles (which is not recommended)
                //     'css-loader',
                //     'sass-loader'
                // ] 
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            MiniCssExtract
        ],
        /**
         * source-map takes more time to build and creates an external large file bundle.js.map, 
         * but this file only gets loaded when we open React dev tool. So the regular users will get 
         * just the bundle.js file, which is now way more lightweight
         */
        devtool: isProduction ? 
            'source-map' : 
            'inline-source-map',
        /* 
            devServer is also responsible for generating the bundle.js but not as a physical file 
            but serving that up directly from memory to keep the devServer snappy and fast (serve up virtually)
            To generate a physical bundle.js file, use script `webpack`
        */
        devServer: { 
            // the dev server will look for the assets in the root of the virtual `public` folder 
            contentBase: path.join(__dirname, 'public'),
            
            //tell the dev-server to always serve up the index.html file for all unknown 404 (files that don't match the URL path) -> client-side routing
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};
