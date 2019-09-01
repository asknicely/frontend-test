var Encore = require('@symfony/webpack-encore');
const path = require('path');

Encore.configureFilenames({
    js: '[name].js',
    css: '[name].css',
    images: '[name].[hash:8].[ext]',
    fonts: '[name].[hash:8].[ext]'
}, 
{
    js: '[name].[chunkhash].js',
    css: '[name].[contenthash].css',
});
Encore
  .setOutputPath('web/build/')
  .setPublicPath('/build')
  .addEntry('app', './web/js/index.js')
  .disableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .enableVueLoader()
  .enableSassLoader()
  .enablePostCssLoader();
const config = Encore.getWebpackConfig();
    config.resolve = {
    extensions: ['.js', '.ts', '.vue', '.tsx'],
    alias: {
        '@src': path.resolve(__dirname, './src/')
    }
};


module.exports = config;