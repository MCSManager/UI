/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 21:46:34
 * @LastEditTime: 2021-07-23 17:58:07
 * @Description:
 */
// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // options...
  pages: {
    index: {
      entry: "src/app/index.js",
      template: "public/index.html",
      filename: "index.html",
      title: "控制面板 | MCSMANAGER"
    }
  },
  devServer: {
    port: 8088,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:23333/"
      }
    }
  }
};
