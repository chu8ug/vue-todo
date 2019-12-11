module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCss: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
    // hotReload: true //根据环境变量生成
  }
}
