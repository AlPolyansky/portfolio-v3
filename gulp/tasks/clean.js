'use strict'
let del = require('del');


module.exports = function() {
  $.gulp.task('clean', function (callback) {
  	if($.options.clearBuiild){
  		return del($.path.build.folder);
  	}else{
  		callback();
  	}
	});
};