"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require("gulp-sass");
const pug = require('gulp-pug');

const build = "./build";

gulp.task('build-pug', () => {
  return gulp.src('./src/pug/index.pug')
    .pipe(pug({
      doctype: 'html'
    }))
    .pipe(gulp.dest(build))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  return gulp.src("./src/assets/**/*.*")
    .pipe(gulp.dest(build))
    .on("end", browsersync.reload);
});

gulp.task("build-sass", () => {
  return gulp.src("./src/sass/style.sass")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(build))
    .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'script.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]
              ]
            }
          }
        }]
      }
    }))
    .pipe(gulp.dest(build))
    .on("end", browsersync.reload);
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./build/",
    port: 4000,
    notify: true
  });

  gulp.watch('./src/pug/**/*.pug', gulp.parallel('build-pug'));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
  gulp.watch("./src/sass/**/*.sass", gulp.parallel("build-sass"));
});

gulp.task("build", gulp.parallel("build-pug", "build-js", "build-sass", "copy-assets"));

gulp.task("default", gulp.parallel("watch", "build"));