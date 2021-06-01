// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') // 将 dll打包的文件注入到生成的 html 模板中
// const Webpack = require('webpack')
// const path = require('path')
// const fs = require('fs')
// const dllPath = path.resolve(__dirname, 'dll')
// const dllFiles = fs.readdirSync(dllPath)
module.exports = {
  configureWebpack: config => {
    config.optimization.splitChunks = {
      chunks: 'all', // 配置哪些模块需要进行分割 默认 async, all 表示同步或异步导入模块都将分割
      minSize: 30000, // 生成 chunk 的最小体积（以 bytes 为单位） 表示被分割模块体积至少达到目标kb
      maxSize: 0,
      minChunks: 1, // 表示node_modules里的模块至少被导入几次才进行分割 默认 1
      maxAsyncRequests: 5, // 按需加载时的最大并行请求数。
      maxInitialRequests: 3, // 入口点的最大并行请求数。
      automaticNameDelimiter: '~', // 默认情况下，webpack 将使用 chunk 的来源和名称生成名称（例如 vendors~main.js）。此选项使你可以指定用于生成名称的分隔符。
      name: true, // 在分割后的包里面是否使用来源和名称 例如 vendors~app.92651e20.js 与 chunk-c91ad9c6.21187aeb.js 默认 true
      /*
      * cacheGroups: 缓存组。将当前文件中导入的所有模块都缓存起来统一处理
      * */
      cacheGroups: {
        /*
        * vendors: 处理从node_modules导入的模块, 把从node_modules导入的模块打包到同一文件vendors中
        * */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 优先级 当同时满足vendors和default的条件时, 例：vendors优先级-10 > default优先级-20, 此时打包到vendors
        },
        /*
        * default: 处理非node_modules模块的导入, 把从任意地方导入的模块打包到同一文件default中
        * */
        default: {
          minChunks: 1, // 表示除了node_modules模块以外的模块至少被导入几次才进行分割 默认 1
          priority: -20, // 优先级
          reuseExistingChunk: true // 是否复用分割的代码
        }
      }
    }
    // dll
    /*dllFiles.forEach(file => {
      if (file.endsWith('.js')) {
        config.plugins.push(new AddAssetHtmlPlugin({
          // dll文件位置（需要把dll打包好的文件注入）
          filepath: path.resolve(__dirname, 'dll', file),
          // dll引用路径
          // publicPath: './vendors',
          // dll最终输出的目录
          outputPath: './vendors' // 表示打包后输出至（存放的目录）dist/vendors/   默认dist/
        }))
      } else if (file.endsWith('.json')) {
        config.plugins.push(new Webpack.DllReferencePlugin({
          // context: process.cwd(),
          manifest: path.resolve(__dirname, 'dll', file)
        }))
      }
    })*/
  },
  // chainWebpack: config => {
  //   config.optimization.splitChunks({
  //     chunks: 'async',
  //     minSize: 20000,
  //     minRemainingSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     enforceSizeThreshold: 50000,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     }
  //   })
  // }
}
