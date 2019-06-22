const gulp = require('gulp');
const concat = require('gulp-concat');

const dest = './src/app/assets';

const styles = [
  './node_modules/bootstrap/dist/css/bootstrap.min.css',
];

const scripts = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
];

gulp.task('build-styles', () => {
  return gulp
    .src(styles)
    .pipe(gulp.dest(`${dest}/css`));
});

gulp.task('build-scripts', () => {
  return gulp
    .src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(`${dest}/js`));
});

gulp.task('build', gulp.parallel('build-styles', 'build-scripts'));
