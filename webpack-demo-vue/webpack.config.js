const  path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');


module.exports={
    // externals: {
    //     vue: 'Vue' // '包名':'全局变量'
    // },
    entry: {
        index:'./src/page/index/index.js',
        index2:'./src/page/index2/index2.js',
        index3:'./src/page/index3/index3.js'
    },
    output: {
        filename: "static/js/[name].[chunkhash].js",  //chunkhash只有被修改了的文件的文件名，hash值修改   hash每次修改任何一个文件，所有文件名的hash至都将改变
        // chunkFilename: '[name].[chunkhash].js',//chunkFilename路由蓝加载时用到
        path: path.join(__dirname,"dist")
        //path.join()方法可以连接任意多个路径字符串
        //path.resolve()方法可以将多个路径解析为一个规范化的绝对路径 这些路径逐一进行cd操作
        //  path.resolve('/foo/bar', './baz')
        // // 输出结果为
        //     '/foo/bar/baz'
        //  path.resolve('/foo/bar', '/tmp/file/')
        // // 输出结果为
        //     '/tmp/file'
        //例子   const path = require('path');
        // let myPath = path.join(__dirname,'/img/so');
        // let myPath2 = path.join(__dirname,'./img/so');
        // let myPath3 = path.resolve(__dirname,'/img/so');
        // let myPath4 = path.resolve(__dirname,'./img/so');
        // console.log(__dirname);           //D:\myProgram\test
        // console.log(myPath);     //D:\myProgram\test\img\so
        // console.log(myPath2);   //D:\myProgram\test\img\so
        // console.log(myPath3);   //D:\img\so<br>
        // console.log(myPath4);   //D:\myProgram\test\img\so
    },
    devServer: {
        host:'localhost',
        port:'8989',
        open:true,
        overlay:true
    },
    module: {
        rules: [
            {
                test:/.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
           template:'./src/page/index/index.html', //指定你生成的文件所依赖哪一个html文件模板
           inject: true,   //script标签位于html文件的 body 底部
           chunks: ['manifest','vendor','index']//允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
        }),                 //如果entry是一个object，就可能出现多个chunk，这时chunk的名称是object键值对里键的名称
        new HtmlWebpackPlugin({
            template:'./src/page/index2/index2.html', //指定你生成的文件所依赖哪一个html文件模板
            filename:'index2.html',//filename可以指定生成html文件的名字  默认index
            inject: true,   //script标签位于html文件的 body 底部
            chunks: ['manifest','vendor','index2']
        }),
        new HtmlWebpackPlugin({
            template:'./src/page/index3/index3.html', //指定你生成的文件所依赖哪一个html文件模板
            filename:'index3.html',//filename可以指定生成html文件的名字
            inject: true,   //script标签位于html文件的 body 底部
            chunks: ['manifest','vendor','index3']
            //vendor则是通过提取公共模块插件来提取的代码块（webpack本身带的模块化代码部分），
            //
            // 而manifest则是在vendor的基础上，再抽取出要经常变动的部分，比如关于异步加载js模块部分的内容。
        }),

        //new webpack.HotModuleReplacementPlugin(),//热更新    开发环境需要   生产环境需关闭不然chunkhash会报错
        new VueLoaderPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({   webpack4删除了这个插件
        //     name: "vendor" ,
        //     filename:"[name].[chunkhash].js"
        // }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),

       // 将多个css chunk合并成一个css文件
            // const MiniCssExtractPlugin = require("mini-css-extract-plugin");  之前的的已废弃
            // module.exports = {
            //     optimization: {
            //         splitChunks: {
            //             cacheGroups: {
            //                 styles: {
            //                     name: 'styles',
            //                     test: /\.scss|css$/,
            //                     chunks: 'all',    // merge all the css chunk to one file
            //                     enforce: true
            //                 }
            //             }
            //         }
            //     }
            // }
    ],
    optimization: {     //提取公共的js
        splitChunks: {
            cacheGroups: {   // 这里开始设置缓存的 chunks
                vendor: {    // key 为entry中定义的 入口名称
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    chunks: 'all',// 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    priority: 10   //priority按顺序先被打包提取
                },
                manifest:{
                    name: 'manifest', // 要缓存的 分隔出来的 chunk 名称
                    chunks: 'all',// 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    priority: 0,
                    minSize: 1,
                    minChunks: 2,// 最小共用次数
                }
            },
        }
    },
}