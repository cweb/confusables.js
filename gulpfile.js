var gulp = require('gulp');
var jshint = require('gulp-jshint');

// Lint the code
gulp.task('lint', function() {
    return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Watch for file changes
gulp.task('watch', function() {
    gulp.watch('js/*.js',['lint']);
});

// Set the default task
gulp.task('default',['lint']);