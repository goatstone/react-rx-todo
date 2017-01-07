var gulp = require('gulp')
var webpack = require('webpack-stream')
const eslint = require('gulp-eslint')
var mocha = require('gulp-mocha')
var exec = require('child_process').exec
const path = require('path')
var editFiles = [
    'goatstone/**/*.js',
    'goatstone/**/*.jsx',
    'gulpfile.js',
    'test/**/*.js',
    'webpack.config.js'
]
gulp.task('default', ['browser-sync', 'lint', 'watchfiles', 'test', 'webpack', 'node-serve'])
gulp.task('watchfiles', function () {
    console.log(path.join(__dirname, 'xxx'))
    console.log('www')
    gulp.watch(editFiles, ['lint', 'test', 'webpack'])
})
gulp.task('travis', ['lint', 'test', 'webpack', 'appengine'], function () {
    console.log('travis task')
})
gulp.task('node-serve', function () {
    const repositoryBasePath = path.join(__dirname)
    var Server = require('goatstone/server/one.js')
    var s = new Server(repositoryBasePath)
    s.start()
})
gulp.task('webpack', function () {
    return gulp.src('dist/note.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'))
})
gulp.task('htmlpack', function () {
    return gulp.src('goatstone/server/index.html')
        .pipe(gulp.dest('dist/'))
})
gulp.task('browser-sync', function () {
    // TODO import library
    const cmd = path.join(__dirname, '/node_modules/browser-sync/bin/browser-sync.js') +
    ' start -f ' + path.join(__dirname, 'dist/js')
    exec(cmd,
        (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`)
            console.log(`stderr: ${stderr}`)
            if (error !== null) {
                console.log(`exec error: ${error}`)
            }
        })
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
