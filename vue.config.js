/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-08 21:46:34
 * @LastEditTime: 2021-08-30 10:43:11
 * @Description:
 */
// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

 const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  // options...
  pages: {
    index: {
      entry: "src/app/index.js",
      template: "public/index.html",
      filename: "index.html",
      title: "MCSManager"
    }
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:23333/"
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  },
  pwa: {
    name: 'MCSM 9',
    short_name: 'MCSM 9',
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
};
