const {src, dest, watch, series} = require('gulp')
const include = require('gulp-include')
const rename = require('gulp-rename')

/* Bundle the html in one big file, including the js file compilated earlier */
function bundle_html(done){
    src('html/main.html')
        .pipe(include())
        .on('error',console.log)
        .pipe(rename('Naruto5e.html'))
        .pipe(dest('../dist'));
    done();
}

/* Bundle the css in one big file */
function bundle_css(done){
    src('css/main.css')
        .pipe(include())
        .on('error',console.log)
        .pipe(rename('Naruto5e.css'))
        .pipe(dest('../dist'));
    done();
}

function copy_to_root_dir(done){
    src('../dist/Naruto5e.html')
        .pipe(dest('..'));
    src('../dist/Naruto5e.css')
        .pipe(dest('..'));
    done();
}

exports.default = series(
    bundle_css,
    bundle_html
);

exports.build = series (
    bundle_css,
    bundle_html,
    copy_to_root_dir
)

exports.watch = () => {
    watch("css/*",{ ignoreInitial: false },exports.default);
    watch("css/*/*",{ ignoreInitial: false },exports.default);
    watch("js/*",{ ignoreInitial: false },exports.default);
    watch("js/*/*",{ ignoreInitial: false },exports.default);
    watch("html/*",{ ignoreInitial: false },exports.default);
    watch("html/*/*",{ ignoreInitial: false },exports.default);
}