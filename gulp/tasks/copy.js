'use strict'


module.exports = function() {
	$.gulp.task('copy', function (callback) {

  // Переносим шрифты

  $.gulp.src(`./${$.path.source.folder}/${$.path.source.fonts}/**/*`)
    .pipe($.gulp.dest(`./${$.path.build.folder}/${$.path.build.fonts}/`));

  // Переносим картинки

  $.gulp.src(`./${$.path.source.folder}/${$.path.source.img}/**/*`)
    .pipe($.gulp.dest(`./${$.path.build.folder}/${$.path.build.img}/`));

  callback();

	});

};