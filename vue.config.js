const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    host:"localhost",
    proxy:{
      '/api':{
        target:'https://admin.meiguo.life/admin/api',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
