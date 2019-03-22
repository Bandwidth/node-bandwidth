var gulp = require("gulp");
var clean = require("gulp-clean");
var mocha = require("gulp-mocha");
var jshint = require("gulp-jshint");
var istanbul = require("gulp-istanbul");
var rename = require("gulp-rename");
var concat = require("gulp-concat")

gulp.task("jshint", gulp.series(function () {
	return gulp.src([ "./lib/*.js", "./test/*.js" ])
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
}));

gulp.task("styles", gulp.series("jshint"));

gulp.task("test", gulp.series(function () {
	return gulp.src("coverage", { read : false, allowEmpty : true })
	.pipe(clean())
		.on("end", function () {
			gulp.src([ "lib/*.js" ])
				.pipe(istanbul())
				.pipe(istanbul.hookRequire())
				.on("finish", function () {
					gulp.src([ "test/*.js" ], { read : false })
						.pipe(mocha({
							reporter : "spec",
							globals  : {
								should : require("should")
							}
						}))
						.pipe(istanbul.writeReports())
						.pipe(istanbul.enforceThresholds({ thresholds : { global : 100 } }));
				});
		});
}));

gulp.task("doc", gulp.series(function () {
	return gulp.src([ "lib/*.js" ])
 		.pipe(concat("api.md"))
		.pipe(rename(function (path) {
			path.extname = ".md";
		}))
		.pipe(gulp.dest("docs"));
}));

gulp.task("default", gulp.series("jshint", "test", "doc"));
