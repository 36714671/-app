const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/wsq': {
        //需要访问的服务器地址
        target: 'http://localhost:3000',
        //后面空格替换前面，确保服务器有这个地址
        pathRewrite: { '^/wsq': '' },
        //false时，以原域名访问服务器；true时，原域名变成服务器域名访问
        changeOrigin: true
      },
    }
  }

})
