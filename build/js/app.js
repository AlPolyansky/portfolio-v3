// =========== Base module ===========

var BaseModule = function(){
    this.log = function(elem){
        return console.log(elem)
    };

    this.getPosition = function(elem,position){
        if(position == "left"){
            return $(elem).offset().left;
        }
        else if(position == "top"){
            return $(elem).offset().top;
        }

    };

    this.scrollTo = function(elem, speed){
        return $('body,html').animate({scrollTop: this.getPosition(elem,"top")}, speed);
    };

    this.cloneInsert = function(parent,element){
        return element.clone(true).prependTo(parent);
    };

    this.getUrl = function(){
        return document.location.href;
    };
    this.getPage = function(){
        if(document.location.pathname == "/"){
            return false;
        };
        return document.location.pathname.match(/([a-zA-Z]+)/)[0];
    };
    this.scrollPos = function(){
        return window.pageYOffset;
    };
    this.debagWindow = function(text,bgColor,textColor){
      if(!bgColor){
        bgColor = "rgba(255,180,255,.8)"
      }
      if(!textColor){
        textColor = "#333";
      }
      if($("div").is($(".debag__window"))){
        $('.debag__window').html(text);
      }else{
        $("<div class='debag__window'><div>").prependTo("body").css({
          "width" : "40vw",
          "max-height" : "auto",
          "background" : bgColor,
          "color" : textColor,
          "font-size" : "100%",
          "padding" : "10vh 0",
          "position" : "fixed",
          "z-index" : "99999999",
          "text-align" : "center",
          "top" : "50%",
          "left" : "50%",
          "transform" : "translate(-50%,-50%)",
          "margin" : "auto"
        }).html(text);
      }
    };



     this.getPositionTotal = function(elem){

        var $this = $(elem);
        //console.log($this.offset());
        /*return true;*/

        switch(elem){
           case "window":
                return {
                    "elem" : "window",
                    "height" : $(window).height(),
                    "width" : $(window).width(),
                    "bottom" : $(window).height(),
                    "top" : 0,
                    "left" : 0,
                    "right" : $(window).width(),
                    "centerTop" : $(window).height() / 2,
                    "centerleft" : $(window).width() / 2
                }
                break
            case "document":
                return {
                    "elem" : "document",
                    "height" : $(document).height(),
                    "width" : $(document).width(),
                    "bottom" : $(document).height(),
                    "top" : 0,
                    "left" : 0,
                    "right" : $(document).width(),
                    "centerTop" : $(document).height() / 2,
                }
                break
            case "scroll":
                return {
                    "elem" : "scroll",
                    "top" : $(document).scrollTop(),
                    "bottom" : $(document).scrollTop() + $(window).height(),
                    "left" : $(document).scrollLeft(),
                    "right" : $(document).scrollLeft() + $(document).width(),
                    "centerTop" : ($(document).scrollTop() + $(window).height()) / 2,
                    "centerLeft" : ($(document).scrollLeft() + $(window).width()) / 2,

                }
                break
            default:
                var obj = [];
                $.each($this,function(i){
                    var $this = elem.eq(i);
                    obj.push( 
                    {
                        "elem" : $this,
                        "width" : $this.outerWidth(),
                        "height" : $this.outerHeight(),
                        "top" : $this.offset().top,
                        "left" : $this.offset().left,
                        "right" : $this.outerWidth() + $this.offset().left,
                        "bottom" : $this.outerHeight() + $this.offset().top,
                        "centerTop" : ($this.outerHeight() + $this.offset().top) / 2,
                        "centerLeft" : ($this.outerWidth() + $this.offset().left) / 2,
                    })

                })
                return obj;    
            break
        };
    };







    this.inWindow = function(elem,topElem,position){
        if(!topElem){
            topElem = 0;
        }
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        var currentEls = elem;
        var result = [];
        currentEls.each(function(){
            var el = $(this);
            var offset = el.offset();

              switch(position){
                case "top":
                    offset = $(this).offset().top;
                    break
                case "bottom":
                    var offsetTop = $(this).offset().top;
                    offset = offsetTop + $(this).height();
                    break
                case "center":
                    var offsetTop = $(this).offset().top;
                    offset = offsetTop + ($(this).height() / 2);
                    break
                default:
                    offset = $(this).offset().top;
                    break
            }


            //console.log(scrollTop);
            if(scrollTop >= offset.top && scrollTop <= offset.top +(topElem) + el.height())
                //scrollTop >= offset && scrollTop <= offset + $(this).height()
            result.push(this);
        });
    return $(result);
    };

    this.getImgPath = function(){
    	return "./img/";
    }
    this.getTransition = function(){
        return 'transitionend webkitTransitionEnd oTransitionEnd';
    }

};



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
var parallaxModule = (function() {


		//var base = new BaseModule;

		var layer = $('.parallax').find('.parallax__layer');

			layer.map(function(key,value){
					$(value).css({
						'transform' : 'translate3d(0px,0px,0px)'
					});
				})

		function setParallax(){
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

		var _setUpListener = function(){
			if((window).innerWidth >= 1200){
				setParallax();
			}
		}

    return {
    	init: function(){
    		_setUpListener();
    	}
    }
})();
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
var base = new BaseModule();

if(base.getPage() == "about"){
function initMap() {
        var position = {lat: 60.00863023, lng: 30.24842441};
        var markerPosition =  {lat: 60.017391, lng: 30.273618};
        var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        scrollwheel: false,
        zoom: 14,
        disableDefaultUI: true
        });
        var image = {
              url: base.getImgPath() + "map-marker.png",
              size: new google.maps.Size(71, 71),
              anchor: new google.maps.Point(17, 40),
              scaledSize: new google.maps.Size(40, 56)
            };
        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map,
            title: 'Hello World!',
            icon: image,
            });
        var styles = [
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#00bfa5"
            }
        ]
    }
]
map.setOptions({styles: styles});
}
}
// =========== Preloader module ===========

var preloaderModule = (function() {

    var base = new BaseModule();

var _addLoader = function () {

    var imgs = [];

    $.each($('*'), function () {
        var
            $this = $(this),
            background = $this.css('background-image'),
            img = $this.is('img');

        if (background != 'none') {
            var path = background.replace('url("', '').replace('")', '');
            imgs.push(path);
        }

        if (img) {
            var path = $this.attr('src');

            if (path) {
                imgs.push(path);
            }
        }
    });
    
    var percentsTotal = 1;

    for (var i = 0; i < imgs.length; i++) {
        var image = $('<img>', {
            attr: {
                src: imgs[i]
            }
        });

        image.on({
            load : function () {
                setPercents(imgs.length, percentsTotal);
                percentsTotal++;
            },

            error : function () {
                percentsTotal++;
            }
        });
    }

    function setPercents(total, current) {
        var percent = Math.ceil(current / total * 100);
        $("body").addClass("no-scroll");
        if (percent >= 100) {
            $('.preloader').addClass("preloader--showOut");
            $("body").removeClass("no-scroll");
        }

        $('.preloader__percents').text(percent + '%');
    }
};
    


    return {
        init: function () {
            _addLoader();
        }
    }
})();
// =========== Slider module ===========

var sliderModule = (function() {

    var base = new BaseModule();

    function slider(elem){
        // Slider

        var $slider = elem;
        var $sliderContent = $slider.find(".slider__content");
        var $sliderDesk = $slider.find(".slider__desk");
        var $deskContent = $sliderDesk.find(".desk__content");



        var $sliderControls = $sliderContent.find(".slider__controll");
        var $sliderButtons = $slider.find(".slider__button");
        var $sliderView = $sliderContent.find(".slider__view");
        var $sliderItems = $sliderView.find(".slider__item");
        var $sliderList = $sliderView.find(".slider__list");
        
        var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd';
        var flag = true;

        // Buttons

        var $buttonUp = $sliderButtons.find(".slider__up").siblings(".slider__ico");
        var $buttonDown = $sliderButtons.find(".slider__down").siblings(".slider__ico");



        // Classes
        var active = "slider__active";
        var down = "slide--down";
        var up = "slide--up";
        var slideShow = "slide--show";





        var cloneSlides = function(container,activeIndex){
            $container = container.siblings(".slider__list-container");
            
            $sliderList.clone().appendTo($container);
            var curentItems = $container.find(".slider__item");
            curentItems.removeClass(active);
            curentItems.eq(activeIndex).addClass(active);
            curentItems.eq(activeIndex).prev().addClass(up);
            curentItems.eq(activeIndex).next().addClass(down);
            if(!curentItems.eq(activeIndex).next().length){
                curentItems.first().addClass(down);
            }
        }

        cloneSlides($buttonUp,-1);
        cloneSlides($buttonDown,1);


        var addClass = function(slide,className){
            slide.addClass(className).siblings().removeClass(className);
        }
        var addClassPrev = function(slide,className){
            slide.addClass(className).siblings().removeClass(className);
            if(!slide.next().length){
                slide.removeClass(className);
            }      
        }

        var addClassSibling = function(slide,className,direction){
            var slideFirst = slide.parent().find(".slider__item").first().addClass(className);
            var slideLast = slide.parent().find(".slider__item").last().addClass(className);


            if(direction == "next"){
                slide.next().addClass(className).siblings().removeClass(className);
                if(!slide.next().length){
                    slide.removeClass(className);
                    slideFirst.addClass(className);
                }
            }
            else{
                slide.prev().addClass(className).siblings().removeClass(className);
                if(!slide.prev().length){
                    slide.removeClass(className);
                    slide.siblings().removeClass(className);
                    slideLast.addClass(className);
                }
            }
            
        }

        var addContent = function(slide){
            var index = slide.index();
            var className = "active__desk__content";
            $deskContent.eq(index).addClass(className).siblings().removeClass(className);
                
            
        }



        var activeSlideInit = function(elem,reverse){

            var $curentElement = elem;
            var $curentList = $curentElement.find(".slider__list");
            var $curentItems = $curentList.find(".slider__item");
            var $curentActiveItem = $curentItems.filter(".slider__active");


            var $nextSlide = $curentActiveItem.next();
            var $prevSlide = $curentActiveItem.prev();

            var $firstSlide = $curentItems.first();
            var $lastSlide = $curentItems.last();


        if(!$curentElement.parent().parent().hasClass("slider__controll")){
            if(!reverse){     
                if($nextSlide.length){
                    addClass($nextSlide,active);
                }else{
                    addClass($firstSlide,active);
                }
            }else{
                if($prevSlide.length){
                    addClass($prevSlide,active);
                }else{
                    addClass($lastSlide,active);
                }
            }
            var $newActive = $curentItems.filter(".slider__active");

            addContent($newActive);
            
            
                
            
        }

        if($curentElement.parent().parent().hasClass("slider__controll")){
            if(!reverse){    
                if($nextSlide.length){
                    addClass($nextSlide,active);

                }else{
                    addClass($firstSlide,active);
                }
            }else{
                if($prevSlide.length){
                    addClass($prevSlide,active);
                }else{
                    addClass($lastSlide,active);
                }
            }
            var $newActive = $curentItems.filter(".slider__active");
            addClassSibling($newActive,down,"next");
            addClassSibling($newActive,up,"last");      
        }



       
    }

           

       

        $buttonUp.on("click",function(e){
            e.preventDefault();
            var $this = $(this).siblings(".slider__list-container");
            if(flag){
                activeSlideInit($sliderView,true);
                activeSlideInit($this,true);
                activeSlideInit($buttonDown.siblings(".slider__list-container"),true);
                flag = false;

            }
            $this.find(".slider__item").on(transitionEnd, function () {
                flag = true;
            })

        })


        $buttonDown.on("click",function(e){
            e.preventDefault();
            var $this = $(this).siblings(".slider__list-container");
            if(flag){
                activeSlideInit($sliderView);
                activeSlideInit($this);
                activeSlideInit($buttonUp.siblings(".slider__list-container"));
                flag = false;

            }
            
            $this.find(".slider__item").on(transitionEnd, function () {
                flag = true;
                
            })
        })
    }






    function sliderInit(){
        if(base.getPage() == "works"){
            slider($("#slider"));
            
        }
    }

    return {
        init: function () {
            sliderInit();
        }
    }
})();
$(document).ready(function () {

	var base = new BaseModule;
	commonModule.init();
	menuModule.init();
	parallaxModule.init();
	preloaderModule.init();
	if(base.getPage() == 'works'){
		blurModule.init();
		sliderModule.init();
	}
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9iYXNlLmpzIiwiX2NvbW1vbi5qcyIsIl9tZW51LmpzIiwiX3BhcmFsbGF4LmpzIiwiX2JsdXIuanMiLCJfbWFwLmpzIiwiX3ByZWxvYWRlci5qcyIsIl9zbGlkZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vID09PT09PT09PT09IEJhc2UgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgQmFzZU1vZHVsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uKGVsZW0pe1xyXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhlbGVtKVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oZWxlbSxwb3NpdGlvbil7XHJcbiAgICAgICAgaWYocG9zaXRpb24gPT0gXCJsZWZ0XCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gJChlbGVtKS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHBvc2l0aW9uID09IFwidG9wXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gJChlbGVtKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zY3JvbGxUbyA9IGZ1bmN0aW9uKGVsZW0sIHNwZWVkKXtcclxuICAgICAgICByZXR1cm4gJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0aGlzLmdldFBvc2l0aW9uKGVsZW0sXCJ0b3BcIil9LCBzcGVlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2xvbmVJbnNlcnQgPSBmdW5jdGlvbihwYXJlbnQsZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xvbmUodHJ1ZSkucHJlcGVuZFRvKHBhcmVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0VXJsID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuICAgIH07XHJcbiAgICB0aGlzLmdldFBhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lID09IFwiL1wiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKC8oW2EtekEtWl0rKS8pWzBdO1xyXG4gICAgfTtcclxuICAgIHRoaXMuc2Nyb2xsUG9zID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgfTtcclxuICAgIHRoaXMuZGViYWdXaW5kb3cgPSBmdW5jdGlvbih0ZXh0LGJnQ29sb3IsdGV4dENvbG9yKXtcclxuICAgICAgaWYoIWJnQ29sb3Ipe1xyXG4gICAgICAgIGJnQ29sb3IgPSBcInJnYmEoMjU1LDE4MCwyNTUsLjgpXCJcclxuICAgICAgfVxyXG4gICAgICBpZighdGV4dENvbG9yKXtcclxuICAgICAgICB0ZXh0Q29sb3IgPSBcIiMzMzNcIjtcclxuICAgICAgfVxyXG4gICAgICBpZigkKFwiZGl2XCIpLmlzKCQoXCIuZGViYWdfX3dpbmRvd1wiKSkpe1xyXG4gICAgICAgICQoJy5kZWJhZ19fd2luZG93JykuaHRtbCh0ZXh0KTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJChcIjxkaXYgY2xhc3M9J2RlYmFnX193aW5kb3cnPjxkaXY+XCIpLnByZXBlbmRUbyhcImJvZHlcIikuY3NzKHtcclxuICAgICAgICAgIFwid2lkdGhcIiA6IFwiNDB2d1wiLFxyXG4gICAgICAgICAgXCJtYXgtaGVpZ2h0XCIgOiBcImF1dG9cIixcclxuICAgICAgICAgIFwiYmFja2dyb3VuZFwiIDogYmdDb2xvcixcclxuICAgICAgICAgIFwiY29sb3JcIiA6IHRleHRDb2xvcixcclxuICAgICAgICAgIFwiZm9udC1zaXplXCIgOiBcIjEwMCVcIixcclxuICAgICAgICAgIFwicGFkZGluZ1wiIDogXCIxMHZoIDBcIixcclxuICAgICAgICAgIFwicG9zaXRpb25cIiA6IFwiZml4ZWRcIixcclxuICAgICAgICAgIFwiei1pbmRleFwiIDogXCI5OTk5OTk5OVwiLFxyXG4gICAgICAgICAgXCJ0ZXh0LWFsaWduXCIgOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgXCJ0b3BcIiA6IFwiNTAlXCIsXHJcbiAgICAgICAgICBcImxlZnRcIiA6IFwiNTAlXCIsXHJcbiAgICAgICAgICBcInRyYW5zZm9ybVwiIDogXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKVwiLFxyXG4gICAgICAgICAgXCJtYXJnaW5cIiA6IFwiYXV0b1wiXHJcbiAgICAgICAgfSkuaHRtbCh0ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgICB0aGlzLmdldFBvc2l0aW9uVG90YWwgPSBmdW5jdGlvbihlbGVtKXtcclxuXHJcbiAgICAgICAgdmFyICR0aGlzID0gJChlbGVtKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCR0aGlzLm9mZnNldCgpKTtcclxuICAgICAgICAvKnJldHVybiB0cnVlOyovXHJcblxyXG4gICAgICAgIHN3aXRjaChlbGVtKXtcclxuICAgICAgICAgICBjYXNlIFwid2luZG93XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJ3aW5kb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiIDogJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICQod2luZG93KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVybGVmdFwiIDogJCh3aW5kb3cpLndpZHRoKCkgLyAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwiZG9jdW1lbnRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtXCIgOiBcImRvY3VtZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICQoZG9jdW1lbnQpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6ICQoZG9jdW1lbnQpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICQoZG9jdW1lbnQpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFwic2Nyb2xsXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJzY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogJChkb2N1bWVudCkuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogJChkb2N1bWVudCkuc2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSArICQoZG9jdW1lbnQpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJUb3BcIiA6ICgkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyTGVmdFwiIDogKCQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSArICQod2luZG93KS53aWR0aCgpKSAvIDIsXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBbXTtcclxuICAgICAgICAgICAgICAgICQuZWFjaCgkdGhpcyxmdW5jdGlvbihpKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSBlbGVtLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wdXNoKCBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogJHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkdGhcIiA6ICR0aGlzLm91dGVyV2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICR0aGlzLm91dGVySGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAkdGhpcy5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogJHRoaXMub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJHRoaXMub3V0ZXJXaWR0aCgpICsgJHRoaXMub2Zmc2V0KCkubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICR0aGlzLm91dGVySGVpZ2h0KCkgKyAkdGhpcy5vZmZzZXQoKS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAoJHRoaXMub3V0ZXJIZWlnaHQoKSArICR0aGlzLm9mZnNldCgpLnRvcCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNlbnRlckxlZnRcIiA6ICgkdGhpcy5vdXRlcldpZHRoKCkgKyAkdGhpcy5vZmZzZXQoKS5sZWZ0KSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajsgICAgXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgdGhpcy5pbldpbmRvdyA9IGZ1bmN0aW9uKGVsZW0sdG9wRWxlbSxwb3NpdGlvbil7XHJcbiAgICAgICAgaWYoIXRvcEVsZW0pe1xyXG4gICAgICAgICAgICB0b3BFbGVtID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICB2YXIgY3VycmVudEVscyA9IGVsZW07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGN1cnJlbnRFbHMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZWwub2Zmc2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgIHN3aXRjaChwb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidG9wXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJib3R0b21cIjpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0VG9wICsgJCh0aGlzKS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXRUb3AgKyAoJCh0aGlzKS5oZWlnaHQoKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNjcm9sbFRvcCk7XHJcbiAgICAgICAgICAgIGlmKHNjcm9sbFRvcCA+PSBvZmZzZXQudG9wICYmIHNjcm9sbFRvcCA8PSBvZmZzZXQudG9wICsodG9wRWxlbSkgKyBlbC5oZWlnaHQoKSlcclxuICAgICAgICAgICAgICAgIC8vc2Nyb2xsVG9wID49IG9mZnNldCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0ICsgJCh0aGlzKS5oZWlnaHQoKVxyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiAkKHJlc3VsdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0SW1nUGF0aCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBcdHJldHVybiBcIi4vaW1nL1wiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCc7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbiIsInZhciBjb21tb25Nb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIHNjcm9sbFNwZWVkID0gNzAwO1xyXG5cclxuXHRcdHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGU7XHJcblxyXG5cclxuXHRcdHZhciBhbmltYXRlU2tpbGxzID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHNraWxsVmFsdWVzID0gW107XHJcblx0XHRcdHZhciBjaXJjbGUgPSAkKCcuc2tpbGxfX2NpcmNsZScpO1xyXG5cclxuXHRcdFx0JC5lYWNoKGNpcmNsZSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNraWxsVmFsdWVzLnB1c2goJCh0aGlzKS5hdHRyKCdzdHlsZScpKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcclxuXHRcdFx0JCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCQoJ3NlY3Rpb24nKS5vZmZzZXQoKS50b3AgPj0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkpe1xyXG5cdFx0XHRcdFx0Y2lyY2xlLmNzcyh7XHJcblx0XHRcdFx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogJzAgMTAwJ1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHQkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmKCQoJ3NlY3Rpb24nKS5vZmZzZXQoKS50b3AgPD0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkpe1xyXG5cdFx0XHRcdFx0JC5lYWNoKGNpcmNsZSxmdW5jdGlvbihpbmRleCl7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYXR0cignc3R5bGUnLHNraWxsVmFsdWVzW2luZGV4XSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9zZXRVcExpc3RlbmVyID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHRcdC8vIHN2ZyBwb2xpZmlsbFxyXG5cdFx0XHRzdmc0ZXZlcnlib2R5KHt9KTtcclxuXHJcblx0XHRcdC8vIHNjcm9sbCB0byBzZWN0aW9uXHJcblx0XHRcdCQoJy5oZWFkZXJfX2J1dHRvbi1pY28nKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRiYXNlLnNjcm9sbFRvKCdzZWN0aW9uJyxzY3JvbGxTcGVlZCk7XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHQvL3Njcm9sbCB0byBzdGFydCBwYWdlXHJcblxyXG5cdFx0XHQkKCcuc2VjdGlvbl9fYnV0dG9uLXVwIC5hcnJvd19fbGluaycpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGJhc2Uuc2Nyb2xsVG8oJ2JvZHknLHNjcm9sbFNwZWVkKTtcclxuXHRcdFx0fSlcclxuXHJcblx0XHR9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDogZnVuY3Rpb24oKXtcclxuICAgIFx0XHRhbmltYXRlU2tpbGxzKCk7XHJcbiAgICBcdFx0X3NldFVwTGlzdGVuZXIoKTtcclxuICAgIFx0fVxyXG4gICAgfVxyXG59KSgpOyIsInZhciBtZW51TW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblx0XHR2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cdFx0dmFyICRidXR0b24gPSAkKCcubWVudS1idXR0b24nKTtcclxuXHJcblx0XHR2YXIgYnV0dG9uQW5pbWF0aW9uID0gZnVuY3Rpb24oZSl7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnbWVudS1idXR0b24tLWFjdGl2ZScpO1xyXG5cdFx0XHQkKCcubWVudS0tcG9wdXAnKS50b2dnbGVDbGFzcygnbWVudS0tcG9wdXAtYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9zZXRVcExpc3RlbmVyID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0JGJ1dHRvbi5vbignY2xpY2snLGJ1dHRvbkFuaW1hdGlvbilcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX2FkZE1lbnUgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcclxuXHRcdFx0XHR2YXIgJG1lbnUgPSAkKCcubWVudScpXHJcblx0XHRcdFx0LmNsb25lKClcclxuXHRcdFx0XHQucmVtb3ZlQXR0cignY2xhc3MnKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnbWVudSBtZW51LS1wb3B1cF9fbmF2JylcclxuXHRcdFx0XHQuYXBwZW5kVG8oJ2JvZHknKVxyXG5cdFx0XHRcdC53cmFwKCc8ZGl2IGNsYXNzPVwibWVudS0tcG9wdXBcIj48L2Rpdj4nKTtcclxuXHRcdH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgXHRpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgXHRcdGlmKGJhc2UuZ2V0UGFnZSgpKXtcclxuICAgIFx0XHRcdF9hZGRNZW51KCk7XHJcbiAgICBcdFx0fVxyXG4gICAgXHRcdF9zZXRVcExpc3RlbmVyKCk7XHJcbiAgICBcdH1cclxuICAgIH1cclxufSkoKTsiLCJ2YXIgcGFyYWxsYXhNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHRcdC8vdmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHJcblx0XHR2YXIgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcblxyXG5cdFx0XHRsYXllci5tYXAoZnVuY3Rpb24oa2V5LHZhbHVlKXtcclxuXHRcdFx0XHRcdCQodmFsdWUpLmNzcyh7XHJcblx0XHRcdFx0XHRcdCd0cmFuc2Zvcm0nIDogJ3RyYW5zbGF0ZTNkKDBweCwwcHgsMHB4KSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0UGFyYWxsYXgoKXtcclxuXHRcdFx0JCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR2YXIgbW91c2VfZHggPSBlLnBhZ2VYO1xyXG5cdFx0XHR2YXIgbW91c2VfZHkgPSBlLnBhZ2VZO1xyXG5cclxuXHRcdFx0dmFyIHcgPSAod2luZG93LmlubmVyV2lkdGgvMikgLSBtb3VzZV9keDtcclxuXHRcdFx0dmFyIGggPSAod2luZG93LmlubmVySGVpZ2h0LzIpIC0gbW91c2VfZHk7XHJcblxyXG5cdFx0XHRcdFxyXG5cclxuXHRcdFx0bGF5ZXIubWFwKGZ1bmN0aW9uKGtleSx2YWx1ZSl7XHJcblx0XHRcdFx0XHR2YXIgd2lkdGhQb3NpdGlvbiA9IHcgKiAoKGtleSArIDEpICAvIDEwMCkgLzIuNTtcclxuXHRcdFx0XHRcdHZhciBoZWlnaHRQb3NpdGlvbiA9IGggKiAoKGtleSArIDEpIC8gMTAwKSAvMi41O1xyXG5cdFx0XHRcdFx0JCh2YWx1ZSkuY3NzKHtcclxuXHRcdFx0XHRcdFx0J3RyYW5zZm9ybScgOiAndHJhbnNsYXRlM2QoJysgd2lkdGhQb3NpdGlvbiArJ3B4LCAnKyBoZWlnaHRQb3NpdGlvbiArJ3B4LCAwcHgpJ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX3NldFVwTGlzdGVuZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigod2luZG93KS5pbm5lcldpZHRoID49IDEyMDApe1xyXG5cdFx0XHRcdHNldFBhcmFsbGF4KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgXHRpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgXHRcdF9zZXRVcExpc3RlbmVyKCk7XHJcbiAgICBcdH1cclxuICAgIH1cclxufSkoKTsiLCJ2YXIgYmx1ck1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvL3ZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGU7XHJcblxyXG5cdFx0dmFyIHNlY3Rpb24gPSAkKCcuc2VjdGlvbl9fYmcnKTtcclxuXHRcdHZhciBibHVyID0gJCgnLmNvdmVyX19ibHVyJyk7XHJcblxyXG5cclxuXHRcdHZhciBzZXRCbHVyID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIGltZ1dpZHRoID0gc2VjdGlvbi53aWR0aCgpO1xyXG5cdFx0XHR2YXIgcG9zTGVmdCA9IHNlY3Rpb24ub2Zmc2V0KCkubGVmdCAtIGJsdXIub2Zmc2V0KCkubGVmdDtcclxuXHRcdFx0dmFyIHBvc1RvcCA9IHNlY3Rpb24ub2Zmc2V0KCkudG9wIC0gYmx1ci5vZmZzZXQoKS50b3A7XHJcblxyXG5cdFx0XHRibHVyLmNzcyh7XHJcblx0XHRcdFx0J2JhY2tncm91bmQtc2l6ZScgOiBpbWdXaWR0aCArICdweCcsXHJcblx0XHRcdFx0J2JhY2tncm91bmQtcG9zaXRpb24nIDogcG9zTGVmdCArICdweCAnKyBwb3NUb3AgKydweCdcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX3NldFVwTGlzdGVuZXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcclxuXHRcdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2V0Qmx1cigpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQkKHdpbmRvdykub24oJ2xvYWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2V0Qmx1cigpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICBcdGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0X3NldFVwTGlzdGVuZXIoKTtcclxuICAgIFx0fVxyXG4gICAgfVxyXG59KSgpOyIsInZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuXHJcbmlmKGJhc2UuZ2V0UGFnZSgpID09IFwiYWJvdXRcIil7XHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0ge2xhdDogNjAuMDA4NjMwMjMsIGxuZzogMzAuMjQ4NDI0NDF9O1xyXG4gICAgICAgIHZhciBtYXJrZXJQb3NpdGlvbiA9ICB7bGF0OiA2MC4wMTczOTEsIGxuZzogMzAuMjczNjE4fTtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICBjZW50ZXI6IHBvc2l0aW9uLFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICB6b29tOiAxNCxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIGltYWdlID0ge1xyXG4gICAgICAgICAgICAgIHVybDogYmFzZS5nZXRJbWdQYXRoKCkgKyBcIm1hcC1tYXJrZXIucG5nXCIsXHJcbiAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNzEsIDcxKSxcclxuICAgICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgxNywgNDApLFxyXG4gICAgICAgICAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDQwLCA1NilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBtYXJrZXJQb3NpdGlvbixcclxuICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgIHRpdGxlOiAnSGVsbG8gV29ybGQhJyxcclxuICAgICAgICAgICAgaWNvbjogaW1hZ2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBzdHlsZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZDZkNmQ2XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheS5jb250cm9sbGVkX2FjY2Vzc1wiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMDBiZmE1XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXVxyXG5tYXAuc2V0T3B0aW9ucyh7c3R5bGVzOiBzdHlsZXN9KTtcclxufVxyXG59IiwiLy8gPT09PT09PT09PT0gUHJlbG9hZGVyIG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIHByZWxvYWRlck1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG52YXIgX2FkZExvYWRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW1ncyA9IFtdO1xyXG5cclxuICAgICQuZWFjaCgkKCcqJyksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXHJcbiAgICAgICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKTtcclxuXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW1nKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBpbWdzW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW1hZ2Uub24oe1xyXG4gICAgICAgICAgICBsb2FkIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJjZW50cyh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJuby1zY3JvbGxcIik7XHJcbiAgICAgICAgaWYgKHBlcmNlbnQgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXInKS5hZGRDbGFzcyhcInByZWxvYWRlci0tc2hvd091dFwiKTtcclxuICAgICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJuby1zY3JvbGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyY2VudCArICclJyk7XHJcbiAgICB9XHJcbn07XHJcbiAgICBcclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9hZGRMb2FkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiLy8gPT09PT09PT09PT0gU2xpZGVyIG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIHNsaWRlck1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2xpZGVyKGVsZW0pe1xyXG4gICAgICAgIC8vIFNsaWRlclxyXG5cclxuICAgICAgICB2YXIgJHNsaWRlciA9IGVsZW07XHJcbiAgICAgICAgdmFyICRzbGlkZXJDb250ZW50ID0gJHNsaWRlci5maW5kKFwiLnNsaWRlcl9fY29udGVudFwiKTtcclxuICAgICAgICB2YXIgJHNsaWRlckRlc2sgPSAkc2xpZGVyLmZpbmQoXCIuc2xpZGVyX19kZXNrXCIpO1xyXG4gICAgICAgIHZhciAkZGVza0NvbnRlbnQgPSAkc2xpZGVyRGVzay5maW5kKFwiLmRlc2tfX2NvbnRlbnRcIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyICRzbGlkZXJDb250cm9scyA9ICRzbGlkZXJDb250ZW50LmZpbmQoXCIuc2xpZGVyX19jb250cm9sbFwiKTtcclxuICAgICAgICB2YXIgJHNsaWRlckJ1dHRvbnMgPSAkc2xpZGVyLmZpbmQoXCIuc2xpZGVyX19idXR0b25cIik7XHJcbiAgICAgICAgdmFyICRzbGlkZXJWaWV3ID0gJHNsaWRlckNvbnRlbnQuZmluZChcIi5zbGlkZXJfX3ZpZXdcIik7XHJcbiAgICAgICAgdmFyICRzbGlkZXJJdGVtcyA9ICRzbGlkZXJWaWV3LmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpO1xyXG4gICAgICAgIHZhciAkc2xpZGVyTGlzdCA9ICRzbGlkZXJWaWV3LmZpbmQoXCIuc2xpZGVyX19saXN0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB0cmFuc2l0aW9uRW5kID0gJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCc7XHJcbiAgICAgICAgdmFyIGZsYWcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBCdXR0b25zXHJcblxyXG4gICAgICAgIHZhciAkYnV0dG9uVXAgPSAkc2xpZGVyQnV0dG9ucy5maW5kKFwiLnNsaWRlcl9fdXBcIikuc2libGluZ3MoXCIuc2xpZGVyX19pY29cIik7XHJcbiAgICAgICAgdmFyICRidXR0b25Eb3duID0gJHNsaWRlckJ1dHRvbnMuZmluZChcIi5zbGlkZXJfX2Rvd25cIikuc2libGluZ3MoXCIuc2xpZGVyX19pY29cIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gQ2xhc3Nlc1xyXG4gICAgICAgIHZhciBhY3RpdmUgPSBcInNsaWRlcl9fYWN0aXZlXCI7XHJcbiAgICAgICAgdmFyIGRvd24gPSBcInNsaWRlLS1kb3duXCI7XHJcbiAgICAgICAgdmFyIHVwID0gXCJzbGlkZS0tdXBcIjtcclxuICAgICAgICB2YXIgc2xpZGVTaG93ID0gXCJzbGlkZS0tc2hvd1wiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGNsb25lU2xpZGVzID0gZnVuY3Rpb24oY29udGFpbmVyLGFjdGl2ZUluZGV4KXtcclxuICAgICAgICAgICAgJGNvbnRhaW5lciA9IGNvbnRhaW5lci5zaWJsaW5ncyhcIi5zbGlkZXJfX2xpc3QtY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNsaWRlckxpc3QuY2xvbmUoKS5hcHBlbmRUbygkY29udGFpbmVyKTtcclxuICAgICAgICAgICAgdmFyIGN1cmVudEl0ZW1zID0gJGNvbnRhaW5lci5maW5kKFwiLnNsaWRlcl9faXRlbVwiKTtcclxuICAgICAgICAgICAgY3VyZW50SXRlbXMucmVtb3ZlQ2xhc3MoYWN0aXZlKTtcclxuICAgICAgICAgICAgY3VyZW50SXRlbXMuZXEoYWN0aXZlSW5kZXgpLmFkZENsYXNzKGFjdGl2ZSk7XHJcbiAgICAgICAgICAgIGN1cmVudEl0ZW1zLmVxKGFjdGl2ZUluZGV4KS5wcmV2KCkuYWRkQ2xhc3ModXApO1xyXG4gICAgICAgICAgICBjdXJlbnRJdGVtcy5lcShhY3RpdmVJbmRleCkubmV4dCgpLmFkZENsYXNzKGRvd24pO1xyXG4gICAgICAgICAgICBpZighY3VyZW50SXRlbXMuZXEoYWN0aXZlSW5kZXgpLm5leHQoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY3VyZW50SXRlbXMuZmlyc3QoKS5hZGRDbGFzcyhkb3duKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvbmVTbGlkZXMoJGJ1dHRvblVwLC0xKTtcclxuICAgICAgICBjbG9uZVNsaWRlcygkYnV0dG9uRG93biwxKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uKHNsaWRlLGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICAgIHNsaWRlLmFkZENsYXNzKGNsYXNzTmFtZSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYWRkQ2xhc3NQcmV2ID0gZnVuY3Rpb24oc2xpZGUsY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgc2xpZGUuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGlmKCFzbGlkZS5uZXh0KCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH0gICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhZGRDbGFzc1NpYmxpbmcgPSBmdW5jdGlvbihzbGlkZSxjbGFzc05hbWUsZGlyZWN0aW9uKXtcclxuICAgICAgICAgICAgdmFyIHNsaWRlRmlyc3QgPSBzbGlkZS5wYXJlbnQoKS5maW5kKFwiLnNsaWRlcl9faXRlbVwiKS5maXJzdCgpLmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZUxhc3QgPSBzbGlkZS5wYXJlbnQoKS5maW5kKFwiLnNsaWRlcl9faXRlbVwiKS5sYXN0KCkuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT0gXCJuZXh0XCIpe1xyXG4gICAgICAgICAgICAgICAgc2xpZGUubmV4dCgpLmFkZENsYXNzKGNsYXNzTmFtZSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYoIXNsaWRlLm5leHQoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVGaXJzdC5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5wcmV2KCkuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZighc2xpZGUucHJldigpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVMYXN0LmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYWRkQ29udGVudCA9IGZ1bmN0aW9uKHNsaWRlKXtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IFwiYWN0aXZlX19kZXNrX19jb250ZW50XCI7XHJcbiAgICAgICAgICAgICRkZXNrQ29udGVudC5lcShpbmRleCkuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVTbGlkZUluaXQgPSBmdW5jdGlvbihlbGVtLHJldmVyc2Upe1xyXG5cclxuICAgICAgICAgICAgdmFyICRjdXJlbnRFbGVtZW50ID0gZWxlbTtcclxuICAgICAgICAgICAgdmFyICRjdXJlbnRMaXN0ID0gJGN1cmVudEVsZW1lbnQuZmluZChcIi5zbGlkZXJfX2xpc3RcIik7XHJcbiAgICAgICAgICAgIHZhciAkY3VyZW50SXRlbXMgPSAkY3VyZW50TGlzdC5maW5kKFwiLnNsaWRlcl9faXRlbVwiKTtcclxuICAgICAgICAgICAgdmFyICRjdXJlbnRBY3RpdmVJdGVtID0gJGN1cmVudEl0ZW1zLmZpbHRlcihcIi5zbGlkZXJfX2FjdGl2ZVwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgJG5leHRTbGlkZSA9ICRjdXJlbnRBY3RpdmVJdGVtLm5leHQoKTtcclxuICAgICAgICAgICAgdmFyICRwcmV2U2xpZGUgPSAkY3VyZW50QWN0aXZlSXRlbS5wcmV2KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGZpcnN0U2xpZGUgPSAkY3VyZW50SXRlbXMuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyICRsYXN0U2xpZGUgPSAkY3VyZW50SXRlbXMubGFzdCgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYoISRjdXJlbnRFbGVtZW50LnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKFwic2xpZGVyX19jb250cm9sbFwiKSl7XHJcbiAgICAgICAgICAgIGlmKCFyZXZlcnNlKXsgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoJG5leHRTbGlkZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRuZXh0U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRmaXJzdFNsaWRlLGFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoJHByZXZTbGlkZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRwcmV2U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRsYXN0U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJG5ld0FjdGl2ZSA9ICRjdXJlbnRJdGVtcy5maWx0ZXIoXCIuc2xpZGVyX19hY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICBhZGRDb250ZW50KCRuZXdBY3RpdmUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigkY3VyZW50RWxlbWVudC5wYXJlbnQoKS5wYXJlbnQoKS5oYXNDbGFzcyhcInNsaWRlcl9fY29udHJvbGxcIikpe1xyXG4gICAgICAgICAgICBpZighcmV2ZXJzZSl7ICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoJG5leHRTbGlkZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRuZXh0U2xpZGUsYWN0aXZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcygkZmlyc3RTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKCRwcmV2U2xpZGUubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcygkcHJldlNsaWRlLGFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcygkbGFzdFNsaWRlLGFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyICRuZXdBY3RpdmUgPSAkY3VyZW50SXRlbXMuZmlsdGVyKFwiLnNsaWRlcl9fYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBhZGRDbGFzc1NpYmxpbmcoJG5ld0FjdGl2ZSxkb3duLFwibmV4dFwiKTtcclxuICAgICAgICAgICAgYWRkQ2xhc3NTaWJsaW5nKCRuZXdBY3RpdmUsdXAsXCJsYXN0XCIpOyAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgJGJ1dHRvblVwLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLnNpYmxpbmdzKFwiLnNsaWRlcl9fbGlzdC1jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIGlmKGZsYWcpe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVJbml0KCRzbGlkZXJWaWV3LHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVJbml0KCR0aGlzLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVJbml0KCRidXR0b25Eb3duLnNpYmxpbmdzKFwiLnNsaWRlcl9fbGlzdC1jb250YWluZXJcIiksdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICR0aGlzLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLm9uKHRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgJGJ1dHRvbkRvd24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcykuc2libGluZ3MoXCIuc2xpZGVyX19saXN0LWNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgaWYoZmxhZyl7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHNsaWRlclZpZXcpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVJbml0KCR0aGlzKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlSW5pdCgkYnV0dG9uVXAuc2libGluZ3MoXCIuc2xpZGVyX19saXN0LWNvbnRhaW5lclwiKSk7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkdGhpcy5maW5kKFwiLnNsaWRlcl9faXRlbVwiKS5vbih0cmFuc2l0aW9uRW5kLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzbGlkZXJJbml0KCl7XHJcbiAgICAgICAgaWYoYmFzZS5nZXRQYWdlKCkgPT0gXCJ3b3Jrc1wiKXtcclxuICAgICAgICAgICAgc2xpZGVyKCQoXCIjc2xpZGVyXCIpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzbGlkZXJJbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcblx0dmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHRjb21tb25Nb2R1bGUuaW5pdCgpO1xyXG5cdG1lbnVNb2R1bGUuaW5pdCgpO1xyXG5cdHBhcmFsbGF4TW9kdWxlLmluaXQoKTtcclxuXHRwcmVsb2FkZXJNb2R1bGUuaW5pdCgpO1xyXG5cdGlmKGJhc2UuZ2V0UGFnZSgpID09ICd3b3Jrcycpe1xyXG5cdFx0Ymx1ck1vZHVsZS5pbml0KCk7XHJcblx0XHRzbGlkZXJNb2R1bGUuaW5pdCgpO1xyXG5cdH1cclxufSk7Il19
