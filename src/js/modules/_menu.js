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

		var _addMenu = function(){
			
				var $menu = $('.menu')
				.clone()
				.removeAttr('class')
				.addClass('menu menu--popup__nav')
				.appendTo('body')
				.wrap('<div class="menu--popup"></div>');
		}

    return {
    	init: function(){
    		if(base.getPage()){
    			_addMenu();
    		}
    		_setUpListener();
    	}
    }
})();