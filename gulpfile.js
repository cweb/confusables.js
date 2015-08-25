var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine-phantom');

// Lint the code
gulp.task('lint', function() {
    return gulp.src('js/confusables.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// Run unit tests in a headless browser
gulp.task('jasmine', function() {
  return gulp.src('spec/confusables_spec.js')
          .pipe(jasmine({
            integration: true,
            abortOnFail: true,
            vendor: 'js/*.js'
          }));
});

// Watch for file changes
gulp.task('watch', function() {
    gulp.watch('js/*.js',['lint']);
});

// Set the default task
gulp.task('default',['lint', 'jasmine']);

