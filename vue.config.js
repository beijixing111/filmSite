const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
// const timestamp = Date.now(); //给打包后的资源添加时间戳

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
		host: '0.0.0.0',
		port: '8080',
    proxy: {
      "/api": {  
        target: 'https://mimyz.com',
        // target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //     "^/api": ""
        // }
      },
      "/uploads": {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true
      }
    }
	},
})
