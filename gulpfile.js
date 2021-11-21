const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");


gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });
//изменения файла
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() { //компиляция для преобразования сас кода в css а потом префикс мин добавить
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
//чтобы отслеживал изменения; если что то изменится запустить стайлс
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
})
//для обьединения функционала
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));