'use strict'


module.exports = function() {

	$.gulp.task('js-app', function (callback) {

	  // main-page.js
	  $.gulp.src($.path.files.jsAppFiles)
	    .pipe($.gp.if($.options.sourcemaps,$.gp.sourcemaps.init()))
	    .pipe($.gp.if($.options.babel,$.gp.babel({presets: ['es2015']})))
	    .pipe($.gp.concat($.path.build.jsAppFile))
	    .pipe($.gp.if($.options.sourcemaps,$.gp.sourcemaps.write()))
	    .pipe($.gp.if($.options.minAppJs,$.gp.uglify(`${$.path.build.jsAppFile}`)))
	    .pipe($.gulp.dest(`${$.path.build.folder}/${$.path.build.js}/`))

	  // Тут можно продолжить таск, если нужно чтобы было несколько склееных файлов js

	  callback();


	});

};