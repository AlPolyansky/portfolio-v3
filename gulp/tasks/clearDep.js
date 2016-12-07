'use strict'
let fs = require('fs');
let async = require('async');

// Доступные css препроцессоры
let cssPreproceses = [
	'sass',
	'postcss'
];

// Доступные html шаблонизаторы
let htmlTemplates = [
  'pug'
]

module.exports = function() {
	$.gulp.task('clearDep', function(callback) {
    if($.options.clearDep){
        async.series(
          [

            function(callback_2){
              cssPreproceses.forEach(function(item){
                if(item != $.options.cssCompile){
                  if(fs.existsSync(`./node_modules/gulp-${item}`)){
                    $.command.exec(`npm uninstall --save-dev gulp-${item}`, {async:false,silent:true});
                    callback_2();
                  }else{
                    callback_2();
                  }
                }
              })
            },
            function(callback_2){
              htmlTemplates.forEach(function(item){
                if(item != $.options.htmlCompile){
                  if(fs.existsSync(`./node_modules/gulp-${item}`)){
                    $.command.exec(`npm uninstall --save-dev gulp-${item}`, {async:false,silent:true});
                    callback_2();
                  }else{
                    callback_2();
                  }
                }
              })
            },
          ]
        ,(err) => {
          if(err) throw err;
          
        })
        callback();
    }else{
      callback();
    }
  })

 
};