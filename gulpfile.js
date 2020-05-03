const gulp = require("gulp"),
  terser = require("gulp-terser"),
  concat = require("gulp-concat"),
  postcss = require("gulp-postcss"), // not working?
  cleancss = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  browserSync = require("browser-sync").create();

function layouts() {
  return gulp.src("./*.html").pipe(gulp.dest("build/"));
}

function scripts() {
  return gulp
    .src("js/*.js")
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(gulp.dest("build/js"));
}

function styles() {
  return (
    gulp
      .src("css/*.css")
      .pipe(concat("style.css"))
      // .pipe(postcss())
      .pipe(cleancss())
      .pipe(gulp.dest("build/css"))
  );
}

function images() {
  return gulp.src("img/*").pipe(imagemin()).pipe(gulp.dest("build/img"));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./build/",
    },
  });

  images();

  gulp.watch("./*.html", layouts);
  gulp.watch("js/*.js", scripts);
  gulp.watch("css/*.css", styles);
}

exports.watch = watch;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.default = gulp.parallel(layouts, scripts, styles);
