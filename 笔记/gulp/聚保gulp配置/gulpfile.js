/**
 * Created by Administrator on 2017/4/28.
 */
var gulp = require("gulp");
var concat = require("gulp-concat");  //合并
var uglify = require("gulp-uglify");  //压缩
var rename = require("gulp-rename");
var minfyCss = require("gulp-minify-css"); //压缩css
var cleanCss = require("gulp-clean-css");

gulp.task("pc",function () {
    gulp.src("jubaov3-frontend/dist/**")
        .pipe(gulp.dest("jubaoprod/pc"))
});

gulp.task("m",function () {
    gulp.src("jubaov3-mobile/dist/**")
        .pipe(gulp.dest("jubaoprod/m"))
});

gulp.task("all",["pc","m"],function () {
    
});