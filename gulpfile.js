// Select Dependencies
const { src, dest, watch, series } = require("gulp");
const scss = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const jsMin = require("gulp-terser");
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();

// Compile scss
function complieScss() {
  return src("src/scss/*.scss")
    .pipe(scss().on("error", scss.logError))
    .pipe(
      postcss([
        autoprefixer("last 2 versions", { grid: "autoplace" }),
        cssnano(),
      ])
    )
    .pipe(dest("dist/css"));
}

// JavaScript Minify
function minifyJs() {
  return src("src/js/*.js").pipe(jsMin()).pipe(dest("dist/js"));
}

// Broser sync task
function browserServ(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function brosersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch all tasks
function watchTasks() {
  watch("*.html", brosersyncReload);
  watch(
    ["src/scss/**/*.scss", "src/js/*.js"],
    series(complieScss, minifyJs, brosersyncReload)
  );
}

// Deafault gulp run
exports.default = series(complieScss, minifyJs, browserServ, watchTasks);
