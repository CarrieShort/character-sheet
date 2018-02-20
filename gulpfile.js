const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const testFiles = ['./test/userModel.js', './test/characterModel.js', './test/characterRouter.js'];

gulp.task('test:mocha', () => {
  return gulp.src(testFiles)
  .pipe(mocha());
});

gulp.task('test', ['test:mocha']);
gulp.task('default', ['test']);
