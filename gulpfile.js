var gulp = require("gulp");
var concat = require ("gulp-concat");
var livereload = require ("gulp-livereload");
var minifyhtml = require ("gulp-minify-html");
var sass = require ("gulp-sass");
var uglify = require ("gulp-uglify");
var imagemin = require ("gulp-imagemin");
var cssmin = require ("gulp-uglifycss");
var htmlPath = require("gulp-rewrite-image-path");

var src = "src";
var dist = "dist";



var paths = {
	s_img : src + "/images/**/*.*",
	d_img : dist + "/images",
	s_sass : src + "/sass/*.scss",
	d_css : dist + "/css",
	s_js : src + "/js/*.js",
	d_js : dist + "/js",
	s_html : src + "/**/*.html",
	d_html : dist + "/"
};



gulp.task("img-min",function(){
	return gulp.src(paths.s_img)
		.pipe(imagemin()) 
		.pipe(gulp.dest(paths.d_img));
});

function errFnc(error){
	console.log(error.toString());
	this.emit('end');

}

gulp.task("compile-sass",function(){
	return gulp.src(paths.s_sass)
		.pipe(sass())
		.on("error",errFnc)
		.pipe(cssmin())
		.pipe(gulp.dest(paths.d_css));
});

gulp.task("js-min",function(){
	return gulp.src(paths.s_js)
		.pipe(uglify())
		.pipe(gulp.dest(paths.d_js));
});

gulp.task("html-min",function(){
	return gulp.src(paths.s_html)
		//.pipe(minifyhtml())
		.pipe(htmlPath({path:"images"}))
		.pipe(gulp.dest(paths.d_html));
});

gulp.task("watch",function() {
	livereload.listen();
	gulp.watch(paths.s_img, ["img-min"]);
	gulp.watch(paths.s_sass, ["compile-sass"]);
	gulp.watch(paths.s_js, ["js-min"]);
	// gulp.watch(paths.s_html, ["html-min"]);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});


gulp.task("default",["img-min","compile-sass","js-min","html-min","watch"],function(){
	return console.log("gulp task complete!!!!!!!")
});





/*11-14
var gulp = require("gulp");
gulp.task("hello", function() {
	return console.log("Hello world");
});


gulp.task("welcome", function() {
	return console.log("Welocome my world~!");
});

gulp.task("default",["hello","welcome"],function(){
	return console.log("===the end===");  
});

*/


