import gulp from "gulp";
import sass from "gulp-sass";
import svgSprite from "gulp-svg-sprite";
import dartSass from "sass";

const sassCompiler = sass(dartSass);

const paths = {
  sass: {
    src: "./app/scss/**/*.scss",
    dest: "./build/css",
  },
  pug: {
    src: "./app/pug/**/*.scss",
    dest: "./build",
  },
  svg: {
    src: "./app/icons/*.svg",
    dest: "./build/images",
  },
  js: {
    src: "./app/js/**/*.js",
    dest: "./build/js",
  },
};

const compileSass = () =>
  gulp
    .src(paths.sass.src)
    .pipe(sassCompiler().on("err", sassCompiler.logError))
    .pipe(gulp.dest(paths.sass.dest));

const compilePug = () =>
  gulp
    .src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.pug.dest));

const createSvgSprite = () =>
  gulp
    .src(paths.svg.src)
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest(paths.svg.dest));

const concatJs = () =>
  gulp.src(paths.js.src).pipe(concat("main.js")).pipe(gulp.dest(paths.js.dest));

const build = gulp.parallel(compileSass, compilePug, createSvgSprite, concatJs);

const watch = () => {
  gulp.watch(paths.sass.src, compileSass);
  gulp.watch(paths.pug.src, compilePug);
  gulp.watch(paths.svg.src, createSvgSprite);
  gulp.watch(paths.js.src, concatJs);
};

export { compileSass, compilePug, createSvgSprite, concatJs, build, watch };
export default build;
