'use strict'

module.exports = function() {

	// Перезагрузка страницы
	$.gulp.task('reload', function (callback) {
  	$.browserSync.reload();
  	callback();
	});

	// Отслеживание файлов
  $.gulp.task('watch', function() {
  	$.gulp.watch(`./${$.path.source.folder}/${$.path.source.css}/**/*.scss`, $.gulp.series('style'));
    if($.options.start == 'front'){
      if($.options.htmlCompile == 'pug'){
       $.gulp.watch(`./${$.path.source.folder}/${$.path.source.templates}/**/*.pug`, $.gulp.series('pug', 'reload'));
      }
    }else if($.options.start == 'server'){
      $.gulp.watch(`./${$.path.source.views}/**/*`, $.gulp.series('reload'));
    }
    $.gulp.watch(`./${$.path.source.folder}/${$.path.source.js}/**/*.js`, $.gulp.series('js-app', 'reload'));
  });
};
