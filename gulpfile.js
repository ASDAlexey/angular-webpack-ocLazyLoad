var gulp=require("gulp");
var WebpackDevServer=require("webpack-dev-server");
var webpack=require("webpack");
var webpackConfig=require("./webpack.config.js");
var path=require("path");
var gutil=require("gulp-util");
var modRewrite=require('connect-modrewrite');

gulp.task("webpack-dev-server",function(callback){
   /* var modRewriteRulesConfig=[
        '^/$ /index.html [L]',
        '^/admin$ /admin/index.html',
        '^/admin[/\\w+]+$ /admin/index.html [L]',
        '(^/\\w+\.html\\?.*)$ /$1 [L]',
        '!\\.\\w+ /app.html [L]'
    ];*/

    var compiler=webpack(Object.create(webpackConfig));
    var server=new WebpackDevServer(compiler,{
        // webpack-dev-server options
        contentBase:path.join(__dirname,"dist"),
        // or: contentBase: "http://localhost/",

        hot:true,
        // Enable special support for Hot Module Replacement
        // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
        // Use "webpack/hot/dev-server" as additional module in your entry point
        // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

        // webpack-dev-middleware options
        //quiet: false,
        //noInfo: false,
        //lazy: true,
        /*middleware:function(connect,options){
            var middlewares=[];
            middlewares.push(modRewrite(modRewriteRulesConfig));
            return middlewares;
        },*/
        //filename: "bundle.js",
        https:true,
        watch:true,
        watchOptions:{
            aggregateTimeout:300,
            poll:1000
        },
        //publicPath: "/assets/",
        headers:{"X-Custom-Header":"yes"},
        stats:{colors:true},

        // Set this as true if you want to access dev server from arbitrary url.
        // This is handy if you are using a html5 router.
        historyApiFallback:true,
        /*historyApiFallback: {
            rewrites: [
                {from: /.*\.html/, to: '/index.html'}
            ]
        },*/

        // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
        // Use "*" to proxy all paths to the specified server.
        // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
        // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
        //proxy: {
        //    "*": "http://localhost:9090"
        //}
    });
    server.listen(8080,"localhost",function(){});
});