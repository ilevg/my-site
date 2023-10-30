const path = require("path"),
      mode = process.env.NODE_ENV || 'development',
      devMode = mode === 'development',
      target = devMode == devMode ? 'web' : 'browserlist',
      devtool = devMode ? 'source-map' : undefined,
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      webpack = require('webpack');
      
module.exports = {
    mode,
    target,
    devtool,
    optimization: {
        chunkIds: 'named',
    },
    devServer: {
        port: 4000,
        open: true,
        static: {
            directory: path.resolve(__dirname, 'dist'), // Указываем директорию, где находятся статические файлы
        },
    },
    entry: {
        main: [path.resolve(__dirname, 'src/asset/js', '3d-effects-main.js')],
        scroll: [path.resolve(__dirname, 'src/asset/js', '3d-scroll.js')],
        shop: [path.resolve(__dirname, 'src/asset/js', 'shop.js')],
        shop_cart: [path.resolve(__dirname, 'src/asset/js', 'shop_cart.js')],
        profile: [path.resolve(__dirname, 'src/asset/js', 'profile.js')],
        collection: [path.resolve(__dirname, 'src/asset/js', 'collection.js')],
        checkout: [path.resolve(__dirname, 'src/asset/js', 'checkout.js')],
        '404': [path.resolve(__dirname, 'src/asset/js', '404.js')],

        products: [path.resolve(__dirname, 'src/asset/js', 'add_products.js')],
        collection_prods: [path.resolve(__dirname, 'src/asset/js', 'collection-prods.js')],
        cart_products: [path.resolve(__dirname, 'src/asset/js', 'cart-products.js')],


    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'js/[name].js',
        assetModuleFilename: 'assets/[hash][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'main.html'),
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/modules-html', 'header.html'),
            filename: 'header.html',
            chunks: [],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'about.html'),
            filename: 'about.html',
            chunks: ['scroll']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'works.html'),
            filename: 'works.html',
            chunks: ['scroll']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'contact.html'),
            filename: 'contact.html',
            chunks: ['scroll']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'shop.html'),
            filename: 'shop.html',
            chunks: ['shop', 'scroll', 'products', 'cart_products'],
        }),


        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/modules-html', 'cart.html'),
            filename: 'cart.html',
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'collection.html'),
            filename: 'collection.html',
            chunks: ['shop_cart', 'collection', 'collection_prods']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/modules-html', 'footer.html'),
            filename: 'footer.html',
            chunks: []
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'pay.html'),
            filename: 'pay.html',
            chunks: ['shop_cart']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'checkout.html'),
            filename: 'checkout.html',
            chunks: ['shop_cart', 'checkout']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'login.html'),
            filename: 'login.html',
            chunks: ['shop_cart', 'login']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'passreset.html'),
            filename: 'passreset.html',
            chunks: ['shop_cart']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'payments.html'),
            filename: 'payments.html',
            chunks: ['shop_cart']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'privacy.html'),
            filename: 'privacy.html',
            chunks: ['shop_cart']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'profile.html'),
            filename: 'profile.html',
            chunks: ['profile', 'shop_cart']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'register.html'),
            filename: 'register.html',
            chunks: ['shop_cart', 'registration']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', 'return.html'),
            filename: 'return.html',
            chunks: ['shop_cart']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/html/pages-html', '404.html'),
            filename: '404.html',
            chunks: ['404']
        }),




        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')],
                            }
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.woff2?$/i, 
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                              progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                              enabled: false,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                              quality: 70,
                            }
                          },
                    }
                ],
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            },
            {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                  options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
        ]
    }
}