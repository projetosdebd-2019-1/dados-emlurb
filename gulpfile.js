const gulp = require('gulp');
const concat = require('gulp-concat');

const dest = './src/app/assets';

const styles = [
  './node_modules/bootstrap/dist/css/bootstrap.min.css',
  './node_modules/leaflet/dist/leaflet.css',
  './src/app/style.css'
];

const scripts = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/axios/dist/axios.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  './node_modules/leaflet/dist/leaflet.js',
  './src/app/libs/leaflet-heat.js',
  './src/app/src/app.js',
];

gulp.task('build-styles', () => {
  return gulp
    .src(styles)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(`${dest}/css`));
});

gulp.task('build-scripts', () => {
  return gulp
    .src(scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(`${dest}/js`));
});

gulp.task('build', gulp.parallel('build-styles', 'build-scripts'));
