'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['sumTingWong'], function() {
  console.log('it works m8');
});

gulp.task('sumTingWong', [], function() {
  console.log('This should appear first');
})
 
gulp.task('scripts', function() {
  return gulp.src(['./lib/main.js','./lib/*.js']) // source
    .pipe(concat('main.js')) // file name
    .pipe(gulp.dest('./dist/')); // destination
});

gulp.task('serve', [
	'scripts',
	'watch'
]);

gulp.task('watch', function () {
    gulp.watch('./lib/*.js', { ignoreInitial: false }, ['scripts']);
});