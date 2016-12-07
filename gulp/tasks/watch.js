'use strict'

module.exports = function() {

	// Перезагрузка страницы
	$.gulp.task('reload', function (callback) {
  	$.browserSync.reload();
  	callback();
	});

	// Отслеживание файлов
  $.gulp.task('watch', function() {
  	if($.options.cssCompile == 'sass'){
  		$.gulp.watch(`./${$.path.source.folder}/${$.path.source.css}/**/*.scss`, $.gulp.series('sass'));
  	}
  	if($.options.cssCompile == 'postcss'){
  		$.gulp.watch(`./${$.path.source.folder}/${$.path.source.css}/**/*.css`, $.gulp.series('postcss'));
  	}
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
