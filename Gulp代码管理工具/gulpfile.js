var gulp = require("gulp");
var concat = require("gulp-concat");  //合并
var uglify = require("gulp-uglify");  //js文件压缩-(自动去注释)
var rename = require("gulp-rename");    //重命名--若匹配到多个文件，则任务只会对最后一个文件生效
var minfyCss = require("gulp-minify-css"); //css文件压缩
var cleanCss = require("gulp-clean-css");
var sass = require("gulp-sass")
var minifyHtml = require("gulp-minify-html");
var babel = require("gulp-babel");
var jshint = require("gulp-jshint");
var autoprefixer = require('gulp-autoprefixer');//自动添加浏览器前缀
var  rev = require('gulp-rev-append');//添加版本号
var connect = require('gulp-connect');//gulp启动本地服务
var webserver = require('gulp-webserver');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件


var jsGulp={name:"js",entry:"src/js/*.js",output:"dist/js"};
var cssGulp={name:"css",entry:"src/css/*.*css",output:"dist/css"};
var htmlGulp={name:"html",entry:"src/*.html",output:"dist"};
var imgGulp={name:"img",entry:"src/img/*",output:"dist/img"};

var es6Gulp={name:"es6-es5",entry:jsGulp.entry,output:"dist/es5_js"};
var jshintGulp ={name:"hshint",entry:jsGulp.entry};
var jsminGulp ={name:"jsmin",entry:jsGulp.entry,output:jsGulp.output};
var imgminGulp = {name:"imgmin",entry:"src/img/*",output:"dist/img"};

var allTask =[jsGulp,cssGulp,htmlGulp,imgGulp];

var allGulp = {name:"all",task: allTask.map(function (val, idx) {
    return val.name
}),callback:function () {

}};

var allWatch =allTask;
var gulpWatch = {name:"watch",callback:function () {
    allWatch.forEach(function (val, idx) {
        gulp.watch(val.entry,[val.name]);
    })
}};

gulp.task(jsGulp.name, function () {
    gulp.src(jsGulp.entry)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(jsGulp.output))
});

gulp.task(cssGulp.name, function () {
    gulp.src(cssGulp.entry)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        })) //自动加入前缀
        .pipe(cleanCss())
        .pipe(connect.reload()) //重新加载   浏览器中的css确实又加载了一份，但是样式并不一定会改变，而且单单监听css是没多大意义的，想看到html和js的变化依旧需要手动刷新
        .pipe(gulp.dest(cssGulp.output))
});

gulp.task(htmlGulp.name, function () {
    gulp.src(htmlGulp.entry)
        .pipe(rev())
        .pipe(minifyHtml())
        .pipe(gulp.dest(htmlGulp.output))
});

gulp.task(imgGulp.name, function () {
    gulp.src(imgGulp.entry)
        .pipe(gulp.dest(imgGulp.output))
});

gulp.task(es6Gulp.name, function () {
    return gulp.src(es6Gulp.entry)// ES6 源码存放的路径
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(es6Gulp.output)); //转换成 ES5 存放的路径
});

gulp.task(jshintGulp.name,function () {
    gulp.src(jshintGulp.entry)
        .pipe(jshint())
        .pipe(jshint.reporter()); // 输出检查结果
});

gulp.task(jsminGulp.name, function () {
    gulp.src(jsminGulp.entry)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.dirname += "/min";
            path.basename += ".min";
            path.extname = ".js"
        }))
        .pipe(gulp.dest(jsminGulp.output))
});

//创建服务任务
gulp.task('connect', function(){
    connect.server({
        //这里有配置端口和主机的选项，我这里就按默认的来了
        hostname:"localhost",
        port:"8888",
        livereload: true //即时刷新   LiveReload是一个WebSockets协议：
    });
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});
gulp.task('webserver2', function() {
    connect.server({
        root: 'dist',
        port: 8001,
        livereload: true
    });
});

gulp.task(allGulp.name, allGulp.task, allGulp.callback);//所有任务一件完成

gulp.task(gulpWatch.name,gulpWatch.callback);//自动监听所有改变

gulp.task("hot",['connect',gulpWatch.name]);
gulp.task("webhot",['webserver',gulpWatch.name]);