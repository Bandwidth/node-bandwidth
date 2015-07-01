"use strict";

var gulp = require("gulp");
var clean = require("gulp-clean");
var mocha = require("gulp-mocha");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var istanbul = require("gulp-istanbul");

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

gulp.task("default", [ "jshint", "jscs", "test" ])
	.on("finish", function () {
		console.log("All done");
	}).on("error", function () {
		console.log("error error error");
	});
