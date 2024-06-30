"use strict";
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
import { src, dest, watch, series, parallel } from "gulp";

import plumber from "gulp-plumber";
import notify from "gulp-notify";                 //通知
import rename from 'gulp-rename';                 //ファイル出力時にファイル名を変える

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

//const distPath = {
//   'dist': '../',
//   'css': '../assets/css',
//   'img': '../assets/images',
//   'js': '../assets/js/parts',
// };

// ========================================
// ** webpack連携
// ========================================
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackConfig from "./webpack.config.js";     // webpackの設定ファイルの読み込み
const webpackDevConfig = webpackConfig({ production: false }); // webpackの設定をdevelopmentモードで読み込む

const webpackTask = () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(webpackStream(webpackDevConfig, webpack))
    .pipe(dest(`${distPath.dist}assets/js/`));
}

// ========================================
// ** ejs
// ========================================
import ejs from 'gulp-ejs';                       //EJS
import htmlBeautify from "gulp-html-beautify";    //HTML生成後のコードを綺麗にする

const ejsTask = () => {
  return src([
    srcPath.ejs,
    srcPath.Ejs
  ])
    .pipe(ejs({}, {}, {ext: '.html'}))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
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
import terser from "gulp-terser";               //jsファイル圧縮用 ES6でも可

const jsTask = () => {
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
import sass from 'gulp-sass';
import dartSass from 'sass';
const gulpSass = sass(dartSass);
import sassGlob from "gulp-sass-glob-use-forward";
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCss from "gulp-clean-css";

const cssTask = () => {
  return src(srcPath.scss)
    .pipe( plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }) ) // watch中にエラーが発生してもwatchが止まらないようにする
    .pipe( sassGlob() )                                 // glob機能
    .pipe( gulpSass({
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
import imageMin from "gulp-imagemin";              // yarn add gulp-imagemin@7.1.0
import mozjpeg from "imagemin-mozjpeg";
import pngquant from "imagemin-pngquant";
import changed from "gulp-changed";

const imgTask = () => {
  return src(srcPath.img, {encoding: false})
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
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
import browserSync from "browser-sync";  //変更を即座にブラウザへ反映
browserSync.create();

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
const buildTask = series(ejsTask, cssTask, imgTask, webpackTask, jsTask);

// ========================================
// ** watch管理(変更時)
// ========================================
const watchTask = () => {
  watch(srcPath.img, parallel(imgTask));
  watch(srcPath.scss, series(cssTask));
  watch(srcPath.js, parallel(jsTask));
  watch(srcPath.js, series(webpackTask));
}

//ブラウザリロード
const watchReload = () => {
  watch(srcPath.ejs, parallel(ejsTask, browserReload));
  watch(srcPath.img, parallel(imgTask, browserReload));
  watch(srcPath.scss, series(cssTask, browserReload));
  watch(srcPath.js, parallel(jsTask, browserReload));
  watch(srcPath.js, series(webpackTask, browserReload));
}

// =========================
// ** parallel：並列処理
// =========================
export const def = parallel(buildTask, watchReload, buildServer);
export const wp = parallel(buildTask, watchTask);