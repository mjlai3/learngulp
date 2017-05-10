'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import browserify from "browserify";
import uglify from "gulp-uglify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import pug from "gulp-pug";
import sass from "gulp-sass";

gulp.task('scripts', () => {

	// Generate non minified
	browserify({
		entries: './lib/_scripts/main.js',
		debug: true
	})
	.transform("babelify", { presets: ["es2015"] })
	.bundle()
	.pipe(source('main.js')) // **
	.pipe(gulp.dest('./dist/scripts'));

	// Generate minified
	browserify({
		entries: './lib/_scripts/main.js',
		debug: true
	})
	.transform("babelify", { presets: ["es2015"] })
	.bundle()
	.pipe(source('main.min.js')) // **
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./dist/scripts'));

	// ** bundle() directly to gulp.dest won’t work when you need to pipe with other gulp plugins like uglify or gulp.dist. This is because browserify.bundle() return a text stream where as gulp works using vinyl stream. In order to browserify to work with other plugins you need to use vinyl-source-stream. (http://blog.revathskumar.com/2016/02/browserify-with-gulp.html)
});
 
gulp.task('sass', () => {
  gulp.src('./lib/_styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});
 
gulp.task('pug', () => {
  gulp.src('./lib/*.pug')
  	.pipe(pug())
  	.pipe(gulp.dest('./dist'))
});

gulp.task('serve', [
	'sass',
	'pug',
	'scripts',
	'watch'
]);

gulp.task('watch', function () {
    gulp.watch([
		'./lib/**/*.scss',
		'./lib/*.pug',
		'./lib/**/*.js'
	],
	[
		'sass',
		'pug',
		'scripts'
	]);
});