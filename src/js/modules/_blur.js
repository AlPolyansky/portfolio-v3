var blurModule = (function() {

		//var base = new BaseModule;

		var section = $('.section__bg');
		var blur = $('.cover__blur');


		var setBlur = function(){
			var imgWidth = section.width();
			var posLeft = section.offset().left - blur.offset().left;
			var posTop = section.offset().top - blur.offset().top;

			blur.css({
				'background-size' : imgWidth + 'px',
				'background-position' : posLeft + 'px '+ posTop +'px'
			})
		}

		var _setUpListener = function(){
			
			$(window).on('resize',function(){
				setBlur();
			})
			$(window).on('load',function(){
				setBlur();
			})
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();