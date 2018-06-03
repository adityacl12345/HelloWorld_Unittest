const gulp = require('gulp');
const mocha = require('gulp-mocha');
const util = require('gulp-util');
 
gulp.task('test', function () {
    return gulp.src(['tasks/testcf.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', util.log);
});