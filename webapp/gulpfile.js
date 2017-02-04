var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var templateCache = require('gulp-angular-templatecache');
var htmlmin = require('gulp-htmlmin');

// Concants and minify all required js libs
gulp.task('js:lib', function() {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'node_modules/angular-cookies/angular-cookies.min.js',
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
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www'));
});

//  Concants and minify all required css libs
gulp.task('css:lib', function(){
  return gulp.src([
      'node_modules/angular-material/angular-material.min.css',
      'node_modules/ggrid/dist/ggrid.min.css'
    ])
    .pipe(concat('lib.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(gulp.dest('www'))
});

// Builds sass to css
gulp.task('css:app', function(){
  return gulp.src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www'))
});

// Builds templates.min.js
gulp.task('templates', function () {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
    .pipe(templateCache('templates.min.js', {
          standalone: true,
          root: '/',
          transformUrl: function(url){
            return url.replace('/scripts', '');
          }
        }))
    .pipe(uglify())
    .pipe(gulp.dest('www'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*.*')
    .pipe(gulp.dest('www/images/'));
});

gulp.task('index', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('www/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/styles/**/*.scss', ['css']);
    gulp.watch('src/**/*.html', ['templates']);
    gulp.watch('src/images/**/*.*', ['images']);
    gulp.watch('src/index.html', ['index']);
});

gulp.task('serve', function(){
  gulp.src('www')
    .pipe(webserver({
      livereload: false,
      port: 3000,
      host: '0.0.0.0'
    }));
});
gulp.task('js', ['js:lib', 'js:app']);
gulp.task('css', ['css:lib', 'css:app']);
gulp.task('build', ['js', 'css', 'templates', 'images', 'index']);

gulp.task('default', ['build', 'serve', 'watch']);
