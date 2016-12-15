'use strict'
let fs = require('fs');
let plugin = 'gulp-postcss';
let async = require('async');
let autoprefixer = require('autoprefixer');
let precss = require('precss');
let scss = require('postcss-scss');
let cssnext = require('postcss-cssnext');
let colorFunction = require('postcss-color-function');
let lost = require('lost');
let hexrgba = require('postcss-hexrgba');
let flexbugs = require('postcss-flexbugs-fixes');
let font = require('postcss-font-magician');


module.exports = function() {


		let postcss = require('gulp-postcss');
		let proccessors = [
			//autoprefixer({ browsers: $.options.autoprefixer }),
			precss({
				mixins : {
					clearfix: {
            '&::after': {
                content: '""',
                display: 'table',
                clear: 'both'
            }
        	}
				}
			}),
			cssnext,
			colorFunction,
			lost,
			flexbugs,
			hexrgba,
			font({
				hosted: '../../../src/fonts/'
			})

		];


		$.gulp.task('postcss', function() {
  	return $.gulp.src(`./${$.path.source.folder}/${$.path.source.css}/${$.path.files.postcss}`)
      .pipe(postcss(proccessors)).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gulp.dest(`./${$.path.build.folder}/${$.path.build.css}/`))
      .pipe($.browserSync.stream());
  	})


 
};