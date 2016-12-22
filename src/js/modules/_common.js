var commonModule = (function() {

		var scrollSpeed = 700;

		var base = new BaseModule;


		var animateSkills = function(){
			var skillValues = [];
			var circle = $('.skill__circle');

			$.each(circle,function(){
				skillValues.push($(this).attr('style'));
			});

			
			$(window).on('load',function(){
				if($('section').offset().top >= $(document).scrollTop()){
					circle.css({
						'stroke-dasharray': '0 100'
					})
				}
			})

			$(document).on('scroll',function(){
				if($('section').offset().top <= $(document).scrollTop()){
					$.each(circle,function(index){
						$(this).attr('style',skillValues[index]);
					})
				}
			})

		}

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
    		animateSkills();
    		_setUpListener();
    	}
    }
})();