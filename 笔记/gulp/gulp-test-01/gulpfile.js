/**
 * Created by Administrator on 2017/4/28.
 */
var gulp = require("gulp");
var concat = require("gulp-concat");  //合并
var uglify = require("gulp-uglify");  //压缩
var rename = require("gulp-rename");
var minfyCss = require("gulp-minify-css"); //压缩css
var cleanCss = require("gulp-clean-css");

gulp.task("css",function () {
    gulp.src("src/css/*.css")
        .pipe(gulp.dest("dist/css"))
});

gulp.task("cssMin",function () {
    gulp.src("src/css/*.css")
        .pipe(minfyCss())
        .pipe(gulp.dest("dist/cssMin"))
});

gulp.task("cssMinClean",function () {
    gulp.src("src/css/*.css")
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/cssMinClean"))
});