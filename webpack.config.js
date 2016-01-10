'use strict';
var _=require('lodash');
var ExtractTextPlugin=require("extract-text-webpack-plugin"),
    path=require("path"),
    webpack=require('webpack'),
    HtmlPlugin=require('html-webpack-plugin'),
    ngAnnotatePlugin=require('ng-annotate-webpack-plugin'),
    rimraf=require('rimraf'),
    browserSync=require('browser-sync'),
    BrowserSyncPlugin=require('browser-sync-webpack-plugin'),
    modRewrite=require('connect-modrewrite');
var config=require('./config.json');
var NODE_ENV=process.env.NODE_ENV||'development';
//var NODE_ENV='production';
var addPath=function(str){
    return '../'+str;
};
var addHash=function(template,hash){
    return NODE_ENV=='production'?template.replace(/\.[^.]+$/,`.[${hash}]$&`):`${template}?hash=[${hash}]`;
};
module.exports={
    context:path.join(__dirname,'app'),
    entry:{
        app:[ // --inline --hot
            'webpack-dev-server/client?https://localhost:8080',
            'webpack/hot/dev-server',
            './index.ts',
            './index.html'
        ],
        vendorsApp:_.map(_.values(config.app.vendors),addPath)
        //styles:[
        //    "./assets/styles/application.styl"
        //]
    },
    /* output:{
     path:__dirname+'/dist',
     publicPath:'/dist/',
     filename:addHash('[name].js','hash'),
     chunkFilename:addHash('[id].js','hash'),
     library:'[name]'
     },*/
    output:{
        path:path.join(__dirname,'/dist/'),
        publicPath:'/',
        filename:'[name].js'
    },
    watch:NODE_ENV=='development',// webpack пересобирает с учетом кеша только те файлы которые изменились
    watchOptions:{
        aggregateTimeout:300,
        poll:1000
    },
    historyApiFallback:true,
    //devtool:NODE_ENV=='production'?null:'cheap-inline-module-sourse-map',
    devtool:'source-map',
    resolve:{
        extensions:['','.ts','.js','.styl','.jade','.ts']
    },
    module:{
        loaders:[{
            test:/\.ts(x?)$/,
            exclude:/(node_modules|bower_components)/,
            loader:'ng-annotate!nginject!babel?optional=runtime!ts-loader'
        },{
            test:/\.js$/,
            exclude:/(node_modules|bower_components)/,
            loader:'ng-annotate!babel?optional=runtime'//?optional=runtime - уменьшение размера кода после babel
        },{
            test:/\.jade$/,
            exclude:/(node_modules|bower_components)/,
            loader:"jade"
        },{
            test:/\.css$/,
            exclude:/(node_modules|bower_components)/,
            loader:'style!css-loader?sourceMap!autoprefixer-loader?browsers=last 5 version'
            //loader:'style!css-loader?sourceMap!autoprefixer-loader?browsers=last 5 version!stylus?resolve url'
        },{
            test:/\.styl$/,
            exclude:/(node_modules|bower_components)/,
            loader:'style!css-loader?sourceMap!autoprefixer-loader?browsers=last 5 version!stylus?resolve url'
            //loader:'style!css-loader?sourceMap!autoprefixer-loader?browsers=last 5 version!stylus?resolve url'
        },{
            test:/\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            exclude:/(node_modules|bower_components)/,
            loader:'file?name=[path][name].[ext]?[hash]'
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
        //{
        //    apply:(compiler) =>{
        //        rimraf.sync(compiler.options.output.path);
        //    }
        //},
        //new webpack.NoErrorsPlugin(),//не создавать файлы если есть ошибки сборки
        //new ExtractTextPlugin('[name].css',{allChunks:true,disable:process.env.NODE_ENV=='development'}),
        new webpack.HotModuleReplacementPlugin(),
        /*new BrowserSyncPlugin(
         // BrowserSync options
         {
         proxy:'https://localhost:8080',
         /!*server:{
         //baseDir:path.join(__dirname,"dist"),
         middleware:[
         modRewrite([
         '^/$ /index.html [L]',
         '^/admin$ /admin/index.html',
         '^/admin[/\\w+]+$ /admin/index.html [L]',
         '(^/\\w+\.html\\?.*)$ /$1 [L]',
         '!\\.\\w+ /app.html [L]'
         ])
         ]
         },*!/
         /!*https: 'https',
         port: 8000,
         host: 'localhost',*!/
         port: 8000,
         open:false,
         notify:false
         },
         // plugin options
         {
         // prevent BrowserSync from reloading the page
         // and let Webpack Dev Server take care of this
         reload:false
         }
         )*/
        //new ngAnnotatePlugin({add:true}),
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
    ],
    stats:{
        colors:true
    },
    /*devServer:{
     host:'localhost',
     port:8080,
     contentBase:path.join(__dirname,"dist"),
     hot:true,
     historyApiFallback:true
     //contentBase: path.join(__dirname, "frontend"),
     //proxy: [{
     //    path: /.*!/,
     //    target: 'http://localhost:3000'
     //    //host: 'proxy.host'
     //}],
     }*/
};
//if(NODE_ENV=='production'){
//    module.exports.plugins.push(
//        new webpack.optimize.UglifyJsPlugin({
//            compress:{
//                warnings:false,
//                drop_console:true,
//                unsafe:true
//            }
//        })
//    )
//}