const webpack = require('webpack')
// 引入等比适配插件
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16
})
module.exports = {
    configureWebpack: {
        externals: {
            'vue-router': 'VueRouter',
            axios: 'axios',
            $: 'jquery'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ]
    },
    publicPath: './',
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            }
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions: {
            // postcss: {
            //   plugins: [
            //     postcss
            //   ]
            // }
            // postcss: {
            //     plugins: [
            //       require('postcss-px2rem')({
            //         remUnit: 136.6
            //       })
            //     ]
            // }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    productionSourceMap: false,
}
