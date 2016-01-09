/* eslint-env node */
const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const del = require('del');
const run = require('run-sequence');

gulp.task('clean', (done) => {
  del(['.tmp', 'dist'], done);
});

gulp.task('eslint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('webpack', (done) => {
  webpack(require(__dirname + '/webpack.config'), (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    done();
  });
});

gulp.task('webpack:dev', () => {
  const compiler = webpack(require(__dirname + '/webpack.config.dev'));

  compiler.watch(200, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
  });
});

gulp.task('uglify', () => {
  return gulp.src('.tmp/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['eslint'], (done) => {
  run('webpack', 'uglify', done);
});

gulp.task('default', ['webpack:dev']);
