"use strict";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    // 多入口文件的话，把固定导出文件名改成 [name].js 用[]占位符去分别生成输出文件
    filename: "[name]_[chunkhash:8].js",
    // 自动清除output文件
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        // loader是链式调用，执行顺序是从右到左
        // style-loader 是把css直接插入到head中的，MiniCssExtractPlugin 是提取出css文件，所以会相互冲突
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
          {
            loader: "px2rem-loader",
            options: {
              // px转换rem的比例，一个rem相当于多少px
              remUnit: 75,
              // 转换小数点位数
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // 图片和字体设置是一样的
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 指纹策略不能应用在开发环境
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   // css处理器
    //   cssProcessor: require("cssnano"),
    // }),
    new htmlWebpackPlugin({
      template: path.join(__dirname, "src/search.html"),
      filename: "search.html",
      chunks: ["search"],
      inject: true,
      minify: {
        html5: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
};
