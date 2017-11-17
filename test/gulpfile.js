// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

//pc端打包
gulp.task('pc', function() {
    gulp.src('./jubaov3-frontend/dist/**')
        .pipe(gulp.dest('./jubaoprod/pc'));
});

//移动端打包
gulp.task('m', function() {
    gulp.src('./jubaov3-mobile/dist/**')
        .pipe(gulp.dest('./jubaoprod/m'));
});

gulp.task('default',['pc','m']);
