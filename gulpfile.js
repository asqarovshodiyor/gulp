const {src, dest, watch, series, parallel} = require("gulp")
const scss = require("gulp-sass")
const concat = require("gulp-concat")
const del = require("del")
const htmlmin = require("gulp-htmlmin")
const browserSync = require("browser-sync").create()


function browsersync(){
    browserSync.init({
        server: {
            baseDir: "dist"
        }}
        );
    }
    
    function styles(){
        return src('src/scss/**/*.scss')
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(concat('style.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
    }
    
    function html(){
        return src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'))
    }
    
    function watching(){
        watch('./src/scss/*.scss', styles)
        watch('./src/*.html', html).on("change", browserSync.reload)
    }
    
    function clean(){
        return del('./dist')
    }
    
    exports.styles = styles;
    exports.watching = watching;
    exports.clean = clean;
    exports.html = html;
    exports.browsersync = browsersync;
    
    
    exports.serve = series(clean, html, styles, browsersync, watching);