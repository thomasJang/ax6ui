'use strict';

// 필요한 모듈선언
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require("gulp-notify");
const babel = require('gulp-babel');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const exec = require('gulp-exec');

// 전역 오브젝트 모음
const fnObj = {
  paths: {
    src: 'src/',
    dist_es: 'dist/ES/',
    dist_es5: 'dist/ES5/',
    dist_js: 'dist/JS/',
    scss: 'scss/',
    css: 'css/'
  },
  errorAlert(error) {
    notify.onError({title: "Gulp Error", message: "Check your terminal", sound: "Purr"})(error); //Error Notification
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
  }
};

// 걸프 기본 타스크
gulp.task('default', ['js-ES', 'js-ES5', 'js-JS', 'scss-ES', 'scss-ES5', 'scss-JS'], function () {
  return true;
});

// task of ES
gulp.task('js-ES', function () {
  return gulp.src([fnObj.paths.src + '/**/*.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(fnObj.paths.dist_es));
});

// task for ES5
gulp.task('js-ES5', function () {
  return gulp.src([fnObj.paths.src + '/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(fnObj.paths.dist_es5));
});

// task for JS
gulp.task('js-JS', function () {
  return gulp.src([fnObj.paths.src + '/**/*.js'])
    //.pipe(plumber({errorHandler: fnObj.errorAlert}))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["modern-browsers", "es2015"],
      //"plugins": ["transform-es2015-modules-amd"]
      //plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest(fnObj.paths.dist_js))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(fnObj.paths.dist_js));
});

gulp.task('scss-ES', function () {
  return gulp.src([
      fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
    .pipe(gulp.dest(fnObj.paths.dist_es));
});

gulp.task('dist-scss-ES5', function () {
  return gulp.src([
      fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
    .pipe(gulp.dest(fnObj.paths.dist_es5));
});

gulp.task('scss-ES5', ['dist-scss-ES5'], function () {
  return gulp.src(fnObj.paths.src + '/**/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(fnObj.paths.dist_es5));
});

gulp.task('dist-scss-JS', function () {
  return gulp.src([
      fnObj.paths.src + '/**/*.scss',
    ], {base: fnObj.paths.src})
    .pipe(gulp.dest(fnObj.paths.dist_js));
});

gulp.task('scss-JS', ['dist-scss-JS'], function () {
  gulp.src(fnObj.paths.src + '/**/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(fnObj.paths.dist_js));
});

/**
 * npm publish
 */
gulp.task('npm publish patch', ['js-ES', 'js-ES5', 'js-JS', 'scss-ES', 'scss-ES5', 'scss-JS'], shell.task([
  'cd dist/ES && npm version patch -m "version patch" && npm publish',
  'cd dist/ES5 && npm version patch -m "version patch" && npm publish'
]));
gulp.task('npm publish minor', ['js-ES', 'js-ES5', 'js-JS', 'scss-ES', 'scss-ES5', 'scss-JS'], shell.task([
  'cd dist/ES && npm version minor -m "version minor" && npm publish',
  'cd dist/ES5 && npm version minor -m "version minor" && npm publish'
]));

gulp.task('jsdoc build', function () {
  let options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to gutil.template()
  };
  let reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  };
  return gulp.src('./md.sh')
    .pipe(exec('./md.sh', options))
    .pipe(exec.reporter(reportOptions));
});