var gulp = require('gulp')
var webpack = require('webpack-stream')
const eslint = require('gulp-eslint')
var mocha = require('gulp-mocha')
var editFiles = [
    'goatstone/**/*.js',
    'goatstone/**/*.jsx',
    'gulpfile.js',
    'test/**/*.js',
    'webpack.config.js'
]
gulp.task('default', ['lint', 'watchfiles', 'test', 'htmlpack', 'webpack'])
gulp.task('watchfiles', function () {
    gulp.watch(editFiles, ['lint', 'test', 'webpack', 'htmlpack'])
})
gulp.task('travis', ['lint', 'test', 'htmlpack', 'webpack'])
gulp.task('webpack', function () {
    return gulp.src(['dist/note.js'])
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'))
})
gulp.task('htmlpack', function () {
    return gulp.src('goatstone/server/index.html')
        .pipe(gulp.dest('dist/'))
})
gulp.task('lint', function () {
    return gulp
    .src(editFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})
gulp.task('test', function () {
    const testFiles = [
        'test/setup.js',
        'test/toolbar.test.js',
        'test/control.test.js',
        'test/list-make.test.js',
        'test/main-component.test.js'
    ]
    return gulp
        .src(testFiles)
        .pipe(mocha())
})
