var gulp = require("gulp");
var clean = require("gulp-clean");
var mocha = require("gulp-mocha");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var istanbul = require("gulp-istanbul");
var rename = require("gulp-rename");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var concat = require("gulp-concat")
gulp.task("jshint", function () {
	return gulp.src([ "./lib/*.js", "./test/*.js" ])
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"))
		.pipe(jshint.reporter("fail"));
});

gulp.task("jscs", function () {
	return gulp.src([ "./lib/*.js", "./test/*.js" ])
		.pipe(jscs());
});

gulp.task("styles", ["jshint", "jscs"])
	.on("finish", function(){
		console.log("Styles are super clean");
	})
	.on("error", function(){
		console.log("Styles are most certainly not clean");
	});

gulp.task("test", function () {
	return gulp.src("coverage", { read : false })
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
});

gulp.task("doc", function () {
	return gulp.src([ "lib/*.js" ])
 		.pipe(concat("api.md"))
		.pipe(gulpJsdoc2md())
		.pipe(rename(function (path) {
			path.extname = ".md";
		}))
		.pipe(gulp.dest("docs"));
});

gulp.task("default", [ "jshint", "jscs", "test", "doc" ])
	.on("finish", function () {
		console.log("All done");
	}).on("error", function () {
		console.log("error error error");
	});
