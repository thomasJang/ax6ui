'use strict';

// 필요한 모듈선언
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// 전역 오브젝트 모음
const fnObj = {
    paths: {
        src: 'src/',
        dist_es6: 'dist/ES6/',
        dist_es5: 'dist/ES5/',
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
gulp.task('default', ['js-ES5', 'js-ES6', 'scss-ES5', 'scss-ES6'], function () {
    return true;
});

// task for ES6
gulp.task('js-ES6', function () {
    gulp.src([fnObj.paths.src + '*.js'])
        //.pipe(plumber({errorHandler: fnObj.errorAlert}))
        //.pipe(sourcemaps.init())
        .pipe(babel({
            //presets: ['es2016'],
            //plugins: ['transform-runtime']
        }))
        .pipe(gulp.dest(fnObj.paths.dist_es6));
});

// task for ES5
gulp.task('js-ES5', function () {
    gulp.src([fnObj.paths.src + '*.js'])
    //.pipe(plumber({errorHandler: fnObj.errorAlert}))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["modern-browsers", "es2015"],
            //"plugins": ["transform-es2015-modules-amd"]
            //plugins: ['transform-runtime']
        }))
        .pipe(gulp.dest(fnObj.paths.dist_es5))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(fnObj.paths.dist_es5));
});

gulp.task('dist-scss-ES5', function () {
    gulp.src([
        fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
        .pipe(gulp.dest(fnObj.paths.dist_es5));
});

gulp.task('scss-ES5', ['dist-scss-ES5'], function () {
    gulp.src(fnObj.paths.src + '/**/index.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(fnObj.paths.dist_es5));
});

gulp.task('dist-scss-ES6', function () {
    gulp.src([
        fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
        .pipe(gulp.dest(fnObj.paths.dist_es6));
});

gulp.task('scss-ES6', ['dist-scss-ES6'], function () {
    gulp.src(fnObj.paths.src + '/**/index.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(fnObj.paths.dist_es6));
});

/**
 * npm publish
 */
gulp.task('ES5 publish patch', shell.task([
    'cd dist/ES5 && npm version patch -m "version patch" && npm publish',
]));
gulp.task('ES5 publish minor', shell.task([
    'cd dist/ES5 && npm version minor -m "version patch" && npm publish',
]));

gulp.task('ES6 publish patch', shell.task([
    'cd dist/ES6 && npm version patch -m "version patch" && npm publish',
]));
gulp.task('ES6 publish minor', shell.task([
    'cd dist/ES6 && npm version minor -m "version patch" && npm publish',
]));

gulp.task('samples npm start', shell.task([
    'cd samples && npm start',
]));