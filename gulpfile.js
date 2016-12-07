'use strict';
let fs = require('fs');

// Описываем глобальный объект gulp.
// Важно!
// Плагины для gulp(которые начинаються со слова gulp-) подключать не нужно,
// они автоматически подтягиваются и будут доступны вот так $.gp.'название плагина'
// Плагины не для gulp, такие как browserSync, нужно подключать в конфиг ниже самостоятельно.
// Они будут доступны в тасках вот так $.'имя свойства с подключенным плагином'. Смотри ниже browserSync.


global.$ = {
  gulp: require('gulp'),
  path: {
  	tasks 	: './gulp/tasks/',
  	config	: './gulp/config.js',
  },
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')(),
  command : require('shelljs'),
};

// Подключаем конфиг
require($.path.config);

// Подключаем таски
fs.readdirSync($.path.tasks).forEach(function(item){
	if(fs.statSync($.path.tasks + item).isFile()){
		require($.path.tasks + item)();
	}
});


// ========== Порядок выполнения задач ==========

$.gulp.task('default',$.gulp.series(
		'clean',
		'clearDep',
	$.gulp.parallel(
		'css-compile',
		'html-compile',
		'css-libs',
		'js-libs',
		'js-app',
		'svg-sprite',
		'copy'
	),
	$.gulp.parallel(
		'watch',
		'server'
	)
))


// Список доступных тасков:
// clean 				- Очистка папки с компилированными файлами
// clearDep 		- Удаляет лишние зависимости(к примеру файлы postcss, если используется sass)
// сss-compile 	- Компилирует файлы css выбранным в конфиге прероцессором
// html-compile - Компилирует файлы html выбранным в конфиге шаблонизатором
// watch 				- Запускает слежку за файлами
// server 			- Запускает локальный сервер

// Дополнительные таски
// sass 		- Компилируем scss файлы
// postcss	-	Компилирует css файлы
// pug 			- Компилируем pug файлы