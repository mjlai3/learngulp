'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import browserify from "browserify";
import uglify from "gulp-uglify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
 
gulp.task('scripts', () => {

	// Generate non minified
	browserify({
		entries: './lib/main.js',
		debug: true
	})
	.bundle()
	.pipe(source('main.js')) // **
	.pipe(gulp.dest('./dist'));

	// Generate minified
	browserify({
		entries: './lib/main.js',
		debug: true
	})
	.bundle()
	.pipe(source('main.min.js')) // **
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));

	// ** A basic implementation can be done as above. But this won’t work when you need to pipe with other gulp plugins like uglify or gulp.dist. This is because browserify.bundle() return a text stream where as gulp works using vinyl stream. In order to browserify to work with other plugins you need to use vinyl-source-stream.
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