var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var sourcemaps = require("gulp-sourcemaps");
var sync = require("browser-sync");
var extend = require("gulp-html-extend");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("css:app", function () {
        return gulp.src("src/styles/app.less")
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(cssnano())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("dist/css"))
            .pipe(sync.stream())
});


gulp.task("css:bootstrap",["css:app"], function () {
    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "dist/css/app.css"
    ])
        .pipe(concat("app.css"))
        .pipe(gulp.dest("dist/css"))
});


gulp.task("compress:js" , function () {
    return gulp.src("src/scripts/*.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/scripts"));
});


gulp.task("bootstrap:js" ,["compress:js"], function () {
    return  gulp.src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
    ])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/scripts"));
});




gulp.task("html", function () {
    return gulp.src("src/pages/*.html")
        .pipe(extend())
    .pipe(gulp.dest("dist"));
});


gulp.task("build", ["html","css:app","css:bootstrap"]);

gulp.task("watch",["build"], function () {
 sync.init({
     server: "dist"
 });

    gulp.watch("src/styles/**/*.css" ["css:app"]);
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("dist/*.html").on("change", sync.reload);

});


gulp.task("media",function () {
    return gulp.src("src/media/**")
        .pipe(gulp.dest("dist/media"))
});

gulp.task("bg", function () {
    return gulp.src("src/bg_plagin/*.js")
        .pipe(gulp.dest("dist/scripts"))
});

gulp.task("photo",function () {
    return gulp.src("src/foto/**")
        .pipe(gulp.dest("dist/photo"))
});


gulp.task("default",["watch","media","bg","bootstrap:js","photo"]);
