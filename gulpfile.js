'use strict';

var gulp = require('gulp');

gulp.task('default', ['sumTingWong'], function() {
  console.log('it works m8');
});

gulp.task('sumTingWong', [], function() {
  console.log('This should appear first');
})

var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./lib/*.js', { ignoreInitial: false }, ['scripts']);
});