const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      scss = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
      cssbeautify = require("gulp-cssbeautify");

gulp.task('compileCSS', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(cssbeautify())
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css'))
});

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    gulp.watch('app/scss/**/*.scss').on("all", gulp.series('compileCSS', browserSync.reload));
    gulp.watch('app/*.html').on("all", browserSync.reload);
});
