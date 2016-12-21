var parallaxModule = (function() {


		//var base = new BaseModule;

		alert(50);
		var layer = $('.parallax').find('.parallax__layer');

		var _setUpListener = function(){
			$(window).on('mousemove',function(e){
				var mouse_dx = e.pageX;
				var mouse_dy = e.pageY;

				var w = (window.innerWidth/2) - mouse_dx;
				var h = (window.innerHeight/2) - mouse_dy;

				

				layer.map(function(key,value){
					var widthPosition = w * ((key + 1)  / 100) /2.5;
					var heightPosition = h * ((key + 1) / 100) /2.5;
					$(value).css({
						'transform' : 'translate3d('+ widthPosition +'px, '+ heightPosition +'px, 0px)'
					});
				})

				

			})
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();