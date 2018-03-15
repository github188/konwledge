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

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件

var jsGulp={name:"js",entry:"src/js/*.js",output:"dist/js"};
var cssGulp={name:"css",entry:"src/css/*.scss",output:"dist/css"};
var htmlGulp={name:"html",entry:"src/*.html",output:"dist"};
var imgGulp={name:"img",entry:"src/img/*",output:"dist/img"};

var es6Gulp={name:"es6-es5",entry:jsGulp.entry,output:"dist/es5_js"};
var jshintGulp ={name:"hshint",entry:jsGulp.entry};
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
        .pipe(gulp.dest(cssGulp.output))
});

gulp.task(htmlGulp.name, function () {
    gulp.src(htmlGulp.entry)
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

gulp.task(imgminGulp.name, function () {
    return gulp.src(imgminGulp.entry)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest(imgminGulp.output));
});

gulp.task(allGulp.name, allGulp.task, allGulp.callback);

gulp.task(gulpWatch.name,gulpWatch.callback);