'use strict';

// 필요한 모듈선언
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const babel = require('gulp-babel');
const shell = require('gulp-shell');

// 전역 오브젝트 모음
const fnObj = {
    paths: {
        src: 'src/',
        dist_es6: 'dist/',
        dist_es5: 'dist-ES5/',
        scss: 'scss/',
        css: 'css/'
    },
    errorAlert(error){
        notify.onError({title: "Gulp Error", message: "Check your terminal", sound: "Purr"})(error); //Error Notification
        console.log(error.toString());//Prints Error to Console
        this.emit("end"); //End function
    }
};

// 걸프 기본 타스크
gulp.task('default', function () {
    gulp.watch([fnObj.paths.src + '/**/*.js'], ['dist-ES6']);
});

// task for ES6
gulp.task('dist-ES6', function () {
    gulp.src([fnObj.paths.src + '*.js'])
        .pipe(plumber({errorHandler: fnObj.errorAlert}))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(fnObj.paths.dist_es6));
});