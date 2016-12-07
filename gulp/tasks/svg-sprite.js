'use strict'


module.exports = function() {

	$.gulp.task('svg-sprite', function () {
  return $.gulp.src(`${$.path.source.folder}/${$.path.source.svgSprite}/**/*.svg`)
    .pipe($.gp.svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe($.gp.cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe($.gp.replace('&gt;', '>'))
    .pipe($.gp.svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe($.gulp.dest(`${$.path.build.folder}/${$.path.build.svgSprite}`))
	});

};