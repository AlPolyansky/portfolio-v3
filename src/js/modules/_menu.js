var menuModule = (function() {


		var base = new BaseModule;
		var $button = $('.menu-button');

		var buttonAnimation = function(e){
			e.preventDefault();
			$(this).toggleClass('menu-button--active');
			$('.menu--popup').toggleClass('menu--popup-active');
		}

		var _setUpListener = function(){
			$button.on('click',buttonAnimation)
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();