"use strict";

const path = require("path");

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
};
