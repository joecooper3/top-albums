var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

var jsSources = 'components/js/*.js';

var sassSources = 'components/sass/*.scss';

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('sass',function() {
  return gulp.src(sassSources)
  .pipe(sass({style: 'expanded', lineNumbers: true}))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function () {
  gulp.watch(jsSources, ['js'])
  gulp.watch(sassSources, ['sass'])
});

gulp.task('default', ['sass','js','watch']);
