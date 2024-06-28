"use strict";
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const { src, dest, watch, series, parallel } = require("gulp");

const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require("gulp-clean-css");

const browserSync = require("browser-sync").create();  //変更を即座にブラウザへ反映
const terser = require("gulp-terser");               //jsファイル圧縮用 ES6でも可

const ejs = require('gulp-ejs');                       //EJS
const htmlBeautify = require("gulp-html-beautify");    //HTML生成後のコードを綺麗にする

const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");     // webpackの設定ファイルの読み込み
// webpackの設定をdevelopmentモードで読み込む
const webpackDevConfig = webpackConfig({ production: false });

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");                 //デスクトップ通知
const rename = require('gulp-rename');                 //ファイル出力時にファイル名を変える

// ========================================
// ** path
// ========================================
const srcPath = {
  'src': './src/',
  'scss': './src/scss/**/*.scss',
  'img': './src/images/**/*',
  'js': './src/js/**/*.js',
  'ejs': './src/ejs/**/*.ejs',
  'Ejs': '!./src/ejs/include/*.ejs',  //除外指定

};
const distPath = {
  'dist': './dist/',
  'css': './dist/assets/css',
  'img': './dist/assets/images',
  'js': './dist/assets/js/parts',
  'item': './dist/assets/',
};
const distPathWp = {
  'dist': '../assets/',
  'css': '../assets/css',
  'img': '../assets/images',
  'js': '../assets/js/parts',
};

// ========================================
// ** webpack連携
// ========================================
const webpackTask = () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(webpackStream(webpackDevConfig, webpack))
    .pipe(dest(`${distPath.dist}assets/js/`));
}

// ========================================
// ** ejs
// ========================================
const ejsTask = () => {
  return src([
    srcPath.ejs,
    srcPath.Ejs
  ])
    .pipe(ejs({}, {}, {ext: '.html'}))
    .pipe(htmlBeautify({
      "indent_size": 2,
      "indent_char": " ",
      "max_preserve_newlines": 0,
      "preserve_newlines": false,
      "extra_liners": [],
    }))
    // .pipe(ejsLint({}))
    .pipe(rename({
      // dirname: "", // ディレクトリ名
      basename: 'index', //ファイル名
      extname: '.html' //拡張子
    }))
    .pipe(dest('./dist/'))
}

// ========================================
// ** js copy
// ========================================
const jsMin = () => {
  return src(`${srcPath.src}js/parts/*.js`)
    .pipe(terser())
    .pipe(rename({
          extname: '-min.js'
    }))
    .pipe(dest(distPath.js))
}
// ========================================
// ** Sass
// ========================================
const cssSass = () => {
  return src(srcPath.scss)
  .pipe( plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }) ) // watch中にエラーが発生してもwatchが止まらないようにする
  .pipe( sassGlob() )                                 // glob機能
  .pipe( sass({
    includePaths: ['./scss/']                         // sassコンパイル
  }))
  .pipe(postcss([
    autoprefixer({}),                                 //package.jsonにブラウザリスト記載
  ]))
  .pipe(cleanCss())                                   //コード内の不要な改行やインデントを削除
  .pipe(rename({
    extname: '-min.css'
  }))
  .pipe(dest(distPath.css));
}
// ========================================
// img最適化
// ========================================
const imageMin = require("gulp-imagemin");              // npm i -D gulp-imagemin@7.1.0
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");

const imgMin = () => {
  return src(srcPath.img)
  .pipe(changed(distPath.img))
  .pipe(
    imageMin([
      pngquant({
          quality: [0.6, 0.7],
          speed: 1,
      }),
      mozjpeg({ quality: 65 }),
      imageMin.svgo(),
      imageMin.optipng(),
      imageMin.gifsicle({ optimizationLevel: 3 }),
    ])
  )
  .pipe(dest(distPath.img));
}

// ========================================
// **ローカルサーバー起動
// ========================================
const buildServer = () => {
  browserSync.init({
    server: distPath.dist,
    port: 8080,
    ui: false,
  });
}

/* リロード */
const browserReload = (done) => {
  browserSync.reload();
  done();
}

// ========================================
// ** buildTask管理(起動時)
// ========================================
const buildTask = series(ejsTask, cssSass, jsMin, webpackTask, imgMin);

// ========================================
// ** watch管理(変更時)
// ========================================
const watchTask = () => {
  watch(srcPath.img, parallel(imgMin));
  watch(srcPath.scss, series(cssSass));
  watch(srcPath.js, parallel(jsMin));
  watch(srcPath.js, series(webpackTask));
}

//ブラウザリロード
const watchReload = () => {
  watch(srcPath.ejs, parallel(ejsTask, browserReload));
  watch(srcPath.img, parallel(imgMin, browserReload));
  watch(srcPath.scss, series(cssSass, browserReload));
  watch(srcPath.js, parallel(jsMin, browserReload));
  watch(srcPath.js, series(webpackTask, browserReload));
}

// =========================
// ** parallel：並列処理
// =========================
exports.def = parallel(buildTask, watchReload, buildServer);
exports.wp = parallel(buildTask, watchTask);