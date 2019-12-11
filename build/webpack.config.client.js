const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge') // 合并webpack.config
const baseConfig = require('./webpack.config.base')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin') // 非js代码的东西单独打包成静态资源文件（可单独用于浏览器缓存，或通过js将样式写入浏览器，提高效率）
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development' // 判断是否为开发环境

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"' // webpack环境区分打包，选择不同的源代码进行打包
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html') // 使用网页模板
  }),
  new VueClientPlugin(),
  new VueLoaderPlugin()
]

const devServer = {
  port: 8000, // 访问端口
  host: '0.0.0.0', // 可以localhost 127.0.0.1 或者本机内网IP进行访问
  overlay: {
    errors: true // 错误直接显示在页面上
  },
  headers: { 'Access-Control-Allow-Origin': '*' }, // 允许跨域
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true // 热加载
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            // {
            //   loader: 'css-loader',
            //   options: {
            //     modules: true,
            //     localIdentName: '[local]_[hash:base64:5]'
            //   }
            // },
            {
              loader: 'postcss-loader', // 能够编译生成sourceMap
              options: {
                sourceMap: true // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
              }
            },
            'stylus-loader' // 能够编译生成sourceMap
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin() // 热加载
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      // eslint-disable-next-line new-cap
      new miniCssExtractPlugin({
        filename: '[name].[chunkhash:8].css',
        chunkFilename: '[id].css'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
