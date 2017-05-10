'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';

gulp.task('default', ['sumTingWong'], function() {
  console.log('it works m8');
});

gulp.task('sumTingWong', [], function() {
  console.log('This should appear first');
})
 
gulp.task('scripts', () => {
  gulp.src(['./lib/main.js','./lib/*.js']) // source
    .pipe(concat('main.js')) // file name
    .pipe(gulp.dest('./dist/')); // destination
});
 
gulp.task('html', () => {
  gulp.src(['./lib/index.html']) // source
    .pipe(gulp.dest('./dist/')); // destination
});

gulp.task('serve', [
	'html',
	'scripts',
	'watch'
]);

gulp.task('watch', function () {
    gulp.watch([
		'./lib/*.js',
		'./lib/*.html'
	],
	[
		'html',
		'scripts'
	]);
});