var Encore = require('@symfony/webpack-encore');

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
module.exports = Encore.getWebpackConfig();