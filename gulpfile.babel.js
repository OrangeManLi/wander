import gulp from 'gulp';
import webpack from 'gulp-webpack';
import named from 'vinyl-named';
import nodemon from 'gulp-nodemon';
import less from 'gulp-less';
import gulpSequence from 'gulp-sequence';
import path from 'path';
import changed from 'gulp-changed';
import del from 'del';
import glob from 'glob'; 
import babel from 'gulp-babel'; 
import es2015 from 'babel-preset-es2015'
// clean
gulp.task('clean',()=>{
  return del(['dist/**']).then(() => {
    console.log('The directories target and dist were cleaned');
  });
});


// less 
gulp.task('css', () => {
  const DEST = './dist/css';
  return gulp.src('./src/less/*.less')
  .pipe(changed(DEST))
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest(DEST));
});
// watch-less
gulp.task('watch-less',()=>{
  gulp.watch('./src/less/*.less',['css']);
});


// js 
gulp.task('js',()=>{
  const DEST = './dist/js';
  const SRC = './src/js';
  let filenames = {};
    return glob('./src/js/*.js', (err, files) => {
      let fileObj = {};
      files.forEach(file=>{
        let name = file.replace(/(.*\/)*([^.]+).*/ig,"$2");
        fileObj[name] = file;
    })
    return gulp.src('./src/js/*.js')
    .pipe(changed(DEST))
    .pipe(babel({presets:[es2015]}))
    .pipe(gulp.dest(DEST))
    .pipe(webpack({
      entry: fileObj,
      output: {
        filename: '[name].js',
      }
    }))
    .pipe(gulp.dest(DEST));
  })
});

gulp.task('watch-js',()=>{
  gulp.watch('./src/js/*.js',['js']);
});



gulp.task('start', function () {
  nodemon({
    script: 'boot.js'
  , ext: 'js pug'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('dev',(cb)=>{
    gulpSequence('clean',['css','js'],'start',['watch-less','watch-js'],cb)
})