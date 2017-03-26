var fs = require('fs'),
  argv = require('yargs').argv,
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  stylus = require('gulp-stylus'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  webserver = require('gulp-webserver'),
  templateCache = require('gulp-angular-templatecache'),
  htmlmin = require('gulp-htmlmin'),
  rename = require('gulp-rename'),
  project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));

gulp.task('js:env', function() {
  var env = argv.env || 'dev';
  var file = project.environments.source.root + '/' + env + '.js';
  return gulp.src(file)
    .pipe(uglify({mangle: false}).on('error', gutil.log))
    .pipe(rename(project.environments.dist.filename))
    .pipe(gulp.dest(project.environments.dist.root));
});

gulp.task('js:lib', function() {
  return gulp.src(project.scripts.vendor.files)
    .pipe(concat(project.scripts.dist.vendor.filename))
    .pipe(gulp.dest(project.scripts.dist.root));
});

gulp.task('js:app', ['js:hint'], function() {
  return gulp.src(project.scripts.source.files)
    .pipe(sourcemaps.init())
    .pipe(concat(project.scripts.dist.source.filename))
    .pipe(uglify({mangle: false}).on('error', gutil.log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(project.scripts.dist.root));
});

gulp.task('js:hint', function(){
  return gulp.src(project.scripts.source.files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('css:lib', function(){
  return gulp.src(project.styles.vendor.files)
    .pipe(concat(project.styles.dist.vendor.filename))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(project.styles.dist.root))
});

gulp.task('css:app', function(){
  return gulp.src(project.styles.source.files)
    .pipe(stylus())
    .pipe(concat(project.styles.dist.source.filename))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(project.styles.dist.root))
});

gulp.task('templates', function () {
  return gulp.src(project.templates.source.files)
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
    .pipe(templateCache(project.templates.dist.filename, {
          standalone: true,
          root: '/',
          transformUrl: function(url){
            return url.replace('/scripts', '');
          }
        }))
    .pipe(uglify())
    .pipe(gulp.dest(project.templates.dist.root));
});

gulp.task('images', function() {
  return gulp.src(project.images.source.files)
    .pipe(gulp.dest(project.images.dist.root));
});

gulp.task('fonts', function() {
  return gulp.src(project.fonts.source.files)
    .pipe(gulp.dest(project.fonts.dist.root));
});

gulp.task('index', function() {
  return gulp.src(project.index.source.file)
    .pipe(gulp.dest(project.index.dist.root));
});

gulp.task('watch', function() {
    gulp.watch(project.scripts.source.files, ['js']);
    gulp.watch(project.styles.source.files, ['css:app']);
    gulp.watch(project.templates.source.files, ['templates']);
    gulp.watch(project.images.source.files, ['images']);
    gulp.watch(project.index.source.file, ['index']);
});

gulp.task('serve', function(){
  gulp.src(project.index.dist.root)
    .pipe(webserver({
      livereload: false,
      port: 3000,
      host: '0.0.0.0'
    }));
});

gulp.task('spring', function() {
  return gulp.src(project.spring.source.files)
    .pipe(gulp.dest(project.spring.dist.root));
});

gulp.task('js', ['js:env', 'js:lib', 'js:app']);
gulp.task('css', ['css:lib', 'css:app']);
gulp.task('build', ['js', 'css', 'templates', 'images', 'fonts', 'index']);
gulp.task('default', ['build', 'serve', 'watch']);
gulp.task('prod', ['build', 'spring'])
