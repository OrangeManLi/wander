import gulp from 'gulp';
import webpack from 'gulp-webpack';
import named from 'vinyl-named';
import nodemon from 'gulp-nodemon';

gulp.task('default', function() {
  return gulp.src(['src/app.js', 'test/test.js'])
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});

gulp.task('start', function () {
  nodemon({
    script: 'boot.js'
  , ext: 'js pug'
  , env: { 'NODE_ENV': 'development' }
  })
})