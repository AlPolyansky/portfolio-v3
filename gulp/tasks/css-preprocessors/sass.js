'use strict'
let fs = require('fs');
let plugin = 'gulp-sass';
let async = require('async');

module.exports = function() {
	async.series(
		[

			function(callback){
				if(!fs.existsSync('./node_modules/' + plugin)){
					$.command.exec(`npm i --save-dev ${plugin}`, {async:false,silent:true});
					callback();
				}else{
					callback();
				}
			}

		],
	function(err){
		if(err) throw err;

		let sass = require('gulp-sass');
		$.gulp.task('sass', function() {
  	return $.gulp.src(`./${$.path.source.folder}/${$.path.source.css}/${$.path.files.sass}`)
      .pipe($.gp.sourcemaps.init())
      .pipe(sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.options.autoprefixer }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest(`./${$.path.build.folder}/${$.path.build.css}/`))
      .pipe($.browserSync.stream());
  	})
	});

 
};