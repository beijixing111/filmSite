const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
// const timestamp = Date.now(); //给打包后的资源添加时间戳

// const gitBaseUrl = 'https://beijixing111.github.io/showFilm/';

module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      fallback: { 
        "url": false,
        "https": false,
        "http": false 
      },

    }
  },
  devServer: {
		host: '0.0.0.0',
		port: '8080',
    proxy: {
      "/api": {  
        // target: 'https://mimyz.com',
        target: 'http://localhost:3000',
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
