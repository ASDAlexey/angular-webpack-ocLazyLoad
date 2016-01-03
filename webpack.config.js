'use strict';
var _=require('lodash');
var ExtractTextPlugin=require("extract-text-webpack-plugin"),
    path=require("path"),
    webpack=require('webpack'),
    HtmlPlugin=require('html-webpack-plugin');
var config=require('./config.json');
var NODE_ENV=process.env.NODE_ENV||'development';
var addPath=function(str){
    return '../'+str;
};
var addHash=function(template,hash){
    return NODE_ENV=='production'?
        template.replace(/\.[^.]+$/,`.[${hash}]$&`):`${template}?hash=[${hash}]`;
};
module.exports={
    context:path.join(__dirname,'app'),
    entry:{
        app:[ // --inline --hot
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            './index.js',
            './index.html'
        ],
        vendorsApp:_.map(_.values(config.app.vendors),addPath)
    },
    /* output:{
     path:__dirname+'/dist',
     publicPath:'/dist/',
     filename:addHash('[name].js','hash'),
     chunkFilename:addHash('[id].js','hash'),
     library:'[name]'
     },*/
    output:{
        path:__dirname+'/dist',
        filename:'[name].js'
    },
    watch:NODE_ENV=='development',// webpack пересобирает с учетом кеша только те файлы которые изменились
    watchOptions:{
        aggregateTimeout:100
    },
    devtool:NODE_ENV=='development'?'cheap-inline-module-sourse-map':null,
    resolve:{
        extensions:['','.ts','.js','.styl','.jade','.ts']
    },
    module:{
        loaders:[{
            test:/\.ts(x?)$/,
            exclude:/(node_modules|bower_components)/,
            loader:'babel-loader!ts-loader'
        },{
            test:/\.js$/,
            exclude:/(node_modules|bower_components)/,
            loader:'babel?optional=runtime'//?optional=runtime - уменьшение размера кода после babel
        },{
            test:/\.jade$/,
            exclude:/(node_modules|bower_components)/,
            loader:"jade"
        },{
            test:/\.styl$/,
            exclude:/(node_modules|bower_components)/,
            loader:'style!css!stylus?resolve urls'
        },{
            test:/\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            exclude:/(node_modules|bower_components)/,
            loader:'file?name=[path][name].[ext]'
        },{
            test:/\.json$/,loader:'json',
            exclude:/(node_modules|bower_components)/
        },{
            test:/\.html$/,loader:'raw',
            exclude:/(node_modules|bower_components)/
        }
        ],
        noParse:[
            /[\/\\]bower_components[\/\\]angular[\/\\]angular\.js$/
        ]
    },
    plugins:[
        new webpack.NoErrorsPlugin(),//не создавать файлы если есть ошибки сборки
        new ExtractTextPlugin('[name].css',{allChunks:true,disable:true}),
        new webpack.HotModuleReplacementPlugin({
            hot:true
        }),
        // Этот файл будет являться "корневым" index.html
        new HtmlPlugin({
            title:'Test APP',
            chunks:['app'],
            filename:'index.html',
            template:path.join(__dirname,'app','index.html')
        })
        /*new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en-gb/),
         new webpack.ProvidePlugin({
         pluck: "lodash/collection/pluck"//переменная:путь до модуля
         })*/
    ]
};
if(NODE_ENV=='production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
                drop_console:true,
                unsafe:true
            }
        })
    )
}