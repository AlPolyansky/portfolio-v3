'use strict';
let fs = require('fs');
let plugin = 'gulp-pug';
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

    let pug = require('gulp-pug');


    $.gulp.task('pug', function() {
    return $.gulp.src(`./${$.path.source.folder}/${$.path.source.templates}/${$.options.pug.source}**/*.pug`)
      .pipe(pug({ pretty: $.options.pug.pretty }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))
      .pipe($.gulp.dest(`./${$.path.build.folder}/${$.options.pug.build}`));
  });


  });

};
