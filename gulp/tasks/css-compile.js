'use strict'

let task;

if($.options.cssCompile == 'sass'){
	require('./css-preprocessors/sass.js')();
	task = 'sass';
}else if($.options.cssCompile == 'postcss'){

	require('./css-preprocessors/postcss.js')();
	task = 'postcss';

}else{
	$.options.cssCompile == 'middleware';
	task = 'middleware';
}

$.gulp.task('middleware', function(callback){
	return callback();
})


module.exports = function() {
	$.gulp.task('css-compile',$.gulp.series(
		task
	))


};