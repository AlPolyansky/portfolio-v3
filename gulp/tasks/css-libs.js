'use strict'


module.exports = function() {
	$.gulp.task('css-libs', function (callback) {
		return $.gulp.src($.path.files.cssLibs)
    .pipe($.gp.concat($.path.build.cssLibsFile))
    .pipe($.gp.if($.options.minAppCss,$.gp.csso($.path.build.cssLibsFile)))
    .pipe($.gulp.dest(`${$.path.build.folder}/${$.path.build.css}/`))
	});
};