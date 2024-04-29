const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/ap': {                              //   /api是习惯性的写法，可以随意改
        // 更换为后端对应ip地址及端口
        target: 'http://10.151.8.217:8080/',
        changeOrigin: true,              //是否跨域
        ws: false,                       //是否代理 websockets
        // secure: true,                 //是否https接口
        pathRewrite: {                   //路径重置
          '^/ap': ''
        }
      }
    },
    historyApiFallback: true,
    allowedHosts: "all"
  }
};
