'use strict';

module.exports = function() {
	$.gulp.task('server', function() {
    	if($.options.start == 'server'){
		    $.browserSync.init({
		      open: $.options.browserSync.openTarget,
		      proxy: $.options.browserSync.proxy,
		      notify: $.options.browserSync.notify,
		    });
	 	 }
	 	 	if($.options.start == 'front'){
		 	 	$.browserSync.init({
		      open: $.options.browserSync.openTarget,
		      port: $.options.browserSync.port,
		      notify: $.options.browserSync.notify,
		      server: $.options.browserSync.folder,
		    });
		 	 }
  });
}