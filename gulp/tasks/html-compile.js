'use strict'

let task;
if($.options.start != 'server'){
	if($.options.htmlCompile == 'pug'){
		require('./html-templates/pug.js')();
		task = 'pug';
	}else{
		task = 'middleware';
	}
}else{
	task = 'middleware';
}
	

	$.gulp.task('middleware', function(callback){
		return callback();
	})


module.exports = function() {
	$.gulp.task('html-compile',$.gulp.series(
		task
	))


};