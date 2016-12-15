'use strict'
/*var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var lost = require('lost');
var flexbugs = require('postcss-flexbugs-fixes');

var proccessors = [
	cssnext,
	lost,
	flexbugs,
]*/

module.exports = function() {
	$.gulp.task('style', function() {
		return $.gulp.src(`./${$.path.source.folder}/${$.path.source.css}/${$.path.files.sass}`)
			.pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.options.autoprefixer }))
      //.pipe(postcss(proccessors))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest(`./${$.path.build.folder}/${$.path.build.css}/`))
      .pipe($.browserSync.stream());
	});
}


  	
      
