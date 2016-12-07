'use strict'
let fs = require('fs');
let plugin = 'gulp-postcss';
let async = require('async');
let autoprefixer = require('autoprefixer');

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

		let postcss = require('gulp-postcss');
		let proccessors = [
			autoprefixer({ browsers: $.options.autoprefixer })
		];


		$.gulp.task('postcss', function() {
  	return $.gulp.src(`./${$.path.source.folder}/${$.path.source.css}/${$.path.files.postcss}`)
      .pipe(postcss(proccessors))
      .pipe($.gulp.dest(`./${$.path.build.folder}/${$.path.build.css}/`))
  	})
	});

 
};