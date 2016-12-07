'use strict'


module.exports = function() {
	 $.gulp.task('js-libs', function () {
	  return $.gulp.src($.path.files.jsLibs)
	    .pipe($.gp.concat(`${$.path.build.jsLibsFile}`))
	    .pipe($.gp.if($.options.minJsLibs,$.gp.uglify(`${$.path.build.jsLibsFile}`)))
	    .pipe($.gulp.dest(`${$.path.build.folder}/${$.path.build.js}/`))
	});
};