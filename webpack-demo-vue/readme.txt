npm init
npm i --save-dev webpack webpack-cli


mkdir src && cd src && touch index.js



npm i --save-dev webpack-dev-server

�½� webpack.config.js

module.exports = {
  entry: './src/index.js',
  devServer: {
    host: 'localhost',
    port: '8883',
    open: true,
    overlay: true,
  }
}

open: true ----- ���������Զ��������
overlay: true ------ �ڱ�������ʱ���������ҳ������ʾ����Ĭ����false


Ȼ����package.json ��� dev����


"dev": "webpack-dev-server"


����npm run dev

��������html-webpack-plugin������htmlģ�壬����Ҫ�ܿ��õ���ҳЧ��

npm i --save-dev html-webpack-plugin


�����ȸ���

const webpack = require('webpack');

new webpack.HotModuleReplacementPlugin()


���vue

npm install vue vue-loader 

���� 
module: {
        rules: [
            {
                test:/.vue$/,
                loader: "vue-loader"
            }
        ]
    },

npm install vue-template-compiler  ��vue-loader ����Ҫ���������������


webpack vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin ����

 ���������Vue-loader��15.*֮��İ汾���� vue-loader��ʹ�ö�����Ҫ���� VueLoaderPlugin��,


const VueLoaderPlugin = require('vue-loader/lib/plugin');

 plugins: [
        new VueLoaderPlugin()
    ],

抽取公共的js css
new webpack.optimize.CommonsChunkPlugin({
            name: "vendor" ,
            filename:"[name].[chunkhash].js"
        }),
//css
 new ExtractTextPlugin("[name].[chunkhash].css")



