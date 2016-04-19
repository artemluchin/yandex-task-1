'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


gulp.task('onetime', function() {
    return gulp.src('main.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('out.css'))
    .pipe(gulp.dest(''))
})
gulp.task('dist.css', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
	.pipe(rename('styles.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('dist.js', function() {
    return gulp.src(['src/js/main.js',
                    'src/js/lib.js',
                    'src/js/render.js',
                    'src/js/events.js'])
        .pipe(concat('app.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/js'));
})

gulp.task('dist', ['dist.css', 'dist.js']);
