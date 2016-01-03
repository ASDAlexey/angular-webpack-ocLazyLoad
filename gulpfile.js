var gulp=require("gulp");
var webpack=require("webpack");
var WebpackDevServer=require("webpack-dev-server");
var webpackConfig=require("./webpack.config.js");
var path=require("path");
var gutil = require("gulp-util");

gulp.task("webpack-dev-server",function(callback){
    new WebpackDevServer(webpack(Object.create(webpackConfig)),{
        stats:{
            colors:true
        },
        contentBase:path.join(__dirname,"dist"),
        hot:true,
        historyApiFallback:true
    }).listen(8080,"localhost",function(err){
        if(err) throw new gutil.PluginError("webpack-dev-server",err);
        gutil.log("[webpack-dev-server]","http://localhost:8080/webpack-dev-server/index.html");
    });
});