var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
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
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/ng-focus-if/focusIf.js'
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
      'node_modules/ggrid/dist/ggrid.min.css',
      'node_modules/ionicons/css/ionicons.min.css'
    ])
    .pipe(concat('lib.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
    .pipe(gulp.dest('www'))
});

// Builds stylus to css
gulp.task('css:app', function(){
  return gulp.src('src/styles/**/*.styl')
    .pipe(stylus())
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 0}))
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

// Copy images to www/images
gulp.task('images', function() {
  return gulp.src('src/images/*.*')
    .pipe(gulp.dest('www/images/'));
});

// Copy fonticons to www/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/ionicons/fonts/**.*')
    .pipe(gulp.dest('www/fonts/'));
});

// Copy source index to www
gulp.task('index', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('www/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/styles/**/*.styl', ['css:app']);
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
gulp.task('build', ['js', 'css', 'templates', 'images', 'fonts', 'index']);

gulp.task('default', ['build', 'serve', 'watch']);
