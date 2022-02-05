var Encore = require('@symfony/webpack-encore');
const { VueLoaderPlugin } = require('vue-loader');

Encore
	.setOutputPath('web/build/')

	.setPublicPath('/build')

	.addEntry('app', './assets/js/app.js')

	.enableVueLoader(() => {}, {
		useJsx: true,
		runtimeCompilerBuild: false
	})

	.addPlugin(new VueLoaderPlugin())

	.enableSassLoader()

	.autoProvidejQuery()

	.enableSourceMaps(!Encore.isProduction())

	.cleanupOutputBeforeBuild()

	.enableSingleRuntimeChunk()

	.enableBuildNotifications();

module.exports = Encore.getWebpackConfig();
