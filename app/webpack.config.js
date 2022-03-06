const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
module.exports = {
  mode: "development",
  entry: [path.resolve(__dirname, "./main.js")],
  output: {
    path: path.resolve(__dirname, "../web"),
    publicPath: "/",
    filename: "js/[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    extensions: ["*", ".vue", ".js", ".json"],
    alias: {
      //The @ allows for simplified referencing in-code when doing imports
      "@": path.resolve(__dirname, ".."),
      //Vue apparently won't load properly without this
      vue$: "vue/dist/vue.esm.js",
    },
  },
};
