var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),

    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

    var source       = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer')
    var browserify = require('browserify')
    var watchify = require('watchify')
    var babelify = require('babelify')
    var sourcemaps = require('gulp-sourcemaps')

var package = require('./package.json'),
    config = require('./config.json');

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

function mapError(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }
  this.end();
}

gulp.task('css', function () {
    return gulp.src('src/sass/style.scss')
    .pipe(sass({errLogToConsole: false}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(config.styleDest))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest(config.styleDest))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('js',function(){
  var b = browserify('./src/js/app.js', {debug: true} )
    return b.bundle()
    .on('error', mapError)
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest(config.jsDest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.jsDest))
    .pipe(browserSync.reload({stream:true, once: true}))
});

gulp.task('browser-sync',function() {
    browserSync.init({
      proxy: "http://localhost:3000",
      files: ["public/**/*.*", "app/**/*.*"],
      port: 7000
  });
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch(["src/sass/**/*.scss", "src/js/**/*.js","src/js/*.js","src/js/**/*.jsx"], ['css', "js"]);
});