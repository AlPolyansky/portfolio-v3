var commonModule = (function() {

		var scrollSpeed = 700;

		var base = new BaseModule;
		var _setUpListener = function(){

			// svg polifill
			svg4everybody({});

			// scroll to section
			$('.header__button-ico').on('click',function(e){
				e.preventDefault();
				base.scrollTo('section',scrollSpeed);
			})

			//scroll to start page

			$('.section__button-up .arrow__link').on('click',function(e){
				e.preventDefault();
				base.scrollTo('body',scrollSpeed);
			})
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();