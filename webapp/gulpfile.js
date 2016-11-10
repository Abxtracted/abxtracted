var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var serve = require('gulp-serve');
watch = require('gulp-watch');

// Concants and minify all required js libs
gulp.task('js:lib', function() {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-material/angular-material.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js'
    ])
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('www'));
});

// Concants and minify all app js
gulp.task('js:app', function() {
  return gulp.src([
      'src/**/*.js',
      '!src/**/*-test.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www'));
});

//  Concants and minify all required css libs
gulp.task('css:lib', function(){
  return gulp.src([
      'node_modules/angular-material/angular-material.min.css'
    ])
    .pipe(concat('lib.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(gulp.dest('www'))
});

// Builds sass to css
gulp.task('css:app', function(){
  return gulp.src('src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www'))
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.scss', ['css']);
});

gulp.task('serve', serve('www'));
gulp.task('js', ['js:lib', 'js:app']);
gulp.task('css', ['css:lib', 'css:app']);
gulp.task('build', ['js', 'css']);

gulp.task('default', ['build', 'serve', 'watch']);
