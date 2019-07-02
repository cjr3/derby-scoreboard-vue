module.exports = {
    resolve:{
        alias: {
          //'vue$': 'vue/dist/vue.common.js',
          //'src': path.resolve(__dirname, '../src'),
          //'assets': path.resolve(__dirname, '../src/assets'),
          //'components': path.resolve(__dirname, '../src/components'),
          '^':path.resolve(__dirname, './src')
        }
    }
}