// 使用严格模式
'use strict';

// gulp模块
const gulp = require('gulp');

// 压缩js
const uglify = require('gulp-uglify');

// 压缩css
const minifyCss = require('gulp-minify-css');

// 压缩html
// const minifyHtml = require('gulp-minify-html');

// 压缩图片
const imagemin = require('gulp-imagemin');

// ES6转ES5
const babel = require('gulp-babel');

// 错误处理提示
const plumber = require('gulp-plumber');

//压缩文件
const zip = require('gulp-zip');

// 创建任务
gulp.task('js', function(){
    // 取得scripts下的所有为.js的文件（**/的意思是包含所有子文件夹)
    gulp.src('app/static/scripts/**/*.js')
    //错误管理模块（有错误时会自动输出提示到终端上）
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/preset-env']}))
    //合并同一目录下的所有文件,并指定文件名
    // .pipe(concat('.js'))
    //js压缩
    .pipe(uglify())
    //将合并压缩后的文件输出到dist/static/scripts下（如没有dist目录则自动生成dist）
    .pipe(gulp.dest('dist/static/scripts'))
});

gulp.task('css', function(){
    // 取得sass下的所有为.scss的文件（**/的意思是包含所有子文件夹)
    gulp.src('app/static/css/**/*.css')
    //错误管理模块（有错误时会自动输出提示到终端上）
    .pipe(plumber())
    //合并同一目录下的所有文件,并指定文件名
    // .pipe(concat('main.css'))
    //css压缩
    .pipe(minifyCss())
    //将合并压缩后的文件输出到dist/static/css下（假如没有dist目录则自动生成dist目录）
    .pipe(gulp.dest('dist/static/css'))
});

gulp.task('html', function(){
    // 首先取得app/views下的所有为.html的文件（**/的意思是包含所有子文件夹)
    gulp.src('app/views/**/*.html')
    //错误管理模块（有错误时会自动输出提示到终端上）
    .pipe(plumber())
    //html压缩
    // .pipe(minifyHtml())
    //将压缩后的文件输出到dist/views下（假如没有dist目录则自动生成dist目录）
    .pipe(gulp.dest('dist/views'))
});

gulp.task('images', function(){
    // 首先取得app/static/images下的所有为.{png,jpg,jpeg,ico,gif,svg}后缀的图片文件（**/的意思是包含所有子文件夹)
    gulp.src('app/static/images/**/*.{png,jpg,jpeg,ico,gif,svg}')
    //错误管理模块（有错误时会自动输出提示到终端上）
    .pipe(plumber())
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 6}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    //将压缩后的图片输出到dist/static/images下（假如没有dist目录则自动生成dist目录）
    .pipe(gulp.dest('dist/static/images'))
});

gulp.task('build', function(){
    // 首先取得dist/*下的所有文件
    gulp.src('dist/*')
    //错误管理模块（有错误时会自动输出提示到终端上）
    .pipe(plumber())
    //将dist/*下的所有文件进行压缩打包生成为build.zip文件
    .pipe(zip('build.zip'))
    //将生成的build.zip文件输出到build下（假如没有build目录则自动生成build目录）
    .pipe(gulp.dest('build'))
})

//在终端上输入gulp命令，会默认执行default任务，并执行redist任务
gulp.task('default', ['js','css','html','images']);


