"use strict";

const path = require("path");
const webpack = require("webpack");
// const { cleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    // 多入口文件的话，把固定导出文件名改成 [name].js 用[]占位符去分别生成输出文件
    filename: "[name].js",
  },
  //  webpack dev server 只在开发环境下使用
  mode: "development",
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        // loader是链式调用，执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        // use: "file-loader",
        use: [
          {
            loader: "url-loader",
            options: {
              // 当图片大小小于10kb则进行base64转换
              limit: 10240,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // webpack自带的热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // new cleanWebpackPlugin(),
  ],
  devServer: {
    // 服务的文件目录
    // webpack5 之前的写法
    // contentBase: "./dist",
    // webpack5 之后的写法
    static: path.resolve(__dirname, "dist"),
    // 开启热更新
    hot: true,
  },
};
